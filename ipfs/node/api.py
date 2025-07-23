import datetime
import json
import time
import os
from flask import Flask, Response, request, jsonify, send_file
from threading import Thread
from .storage import Storage
from .network import Network
from .utils import generate_cid

class API:
    def __init__(self, config, storage, network):
        self.config = config
        self.storage = storage
        self.network = network
        self.app = Flask(__name__)
        self._setup_routes()
        
    def _setup_routes(self):
        @self.app.route('/api/info', methods=['GET'])
        def node_info():
            return jsonify({
                'node_id': self.network.node_id,
                'node_name': self.network.node_name,
                'api_url': self.network.api_url
            })

        @self.app.route('/api/peers', methods=['GET'])
        def list_peers():
            peers = []
            for url, info in self.network.peers.items():
                peers.append({
                    'url': url,
                    'info': info,
                    'status': 'active' if time.time() - info.get('last_seen', 0) < 60 else 'inactive'
                })
            return jsonify(peers)

        @self.app.route('/api/peers/notify', methods=['POST'])
        def notify_peer():
            try:
                data = request.get_json()
                peer_url = data['url']
                peer_info = data['info']
                
                # Force update even if peer exists
                self.network.peers[peer_url] = {
                    **peer_info,
                    'last_seen': time.time(),
                    'force_active': True  # New flag
                }
                return jsonify({'status': 'ok'})
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        @self.app.route('/api/files', methods=['POST'])
        def upload_file():
            try:
                if 'file' not in request.files:
                    return jsonify({'error': 'No file provided'}), 400

                file = request.files['file']
                filename = file.filename
                temp_path = os.path.join(self.storage.storage_path, f"{filename}")
                file.save(temp_path)

                # Store file and get CID (this stores chunks and manifest)
                root_cid = self.storage.store_file(temp_path)

                # Propagate manifest to peers
                with open(os.path.join(self.storage.storage_path, root_cid), 'rb') as f:
                    manifest_data = f.read()
                self.network.propagate_manifest(root_cid, manifest_data)

                # Propagate chunks to peers
                chunk_cids = self.storage.chunker.chunk_file(temp_path)
                for cid in chunk_cids:
                    chunk_path = os.path.join(self.storage.storage_path, cid)
                    with open(chunk_path, 'rb') as f:
                        self.network.propagate_chunk(cid, f.read())

                return jsonify({
                    'cid': root_cid,
                    'filename': filename,
                    'message': 'File uploaded successfully'
                })
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            finally:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                
        @self.app.route('/api/files/<cid>', methods=['GET'])
        def download_file(cid):
            """Stream file directly from chunks with original filename"""
            try:
                # Get the generator and filename from storage
                chunk_generator, original_filename = self.storage.retrieve_file(cid)
                
                # Create a streaming response
                response = Response(
                    chunk_generator,
                    mimetype='application/octet-stream',
                    headers={
                        'Content-Disposition': f'attachment; filename="{original_filename}"',
                        'Content-Type': 'application/octet-stream'
                    }
                )
                
                return response
                
            except FileNotFoundError as e:
                return jsonify({'error': str(e)}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500

                
        @self.app.route('/api/chunks', methods=['POST'])
        def receive_chunk():
            try:
                data = request.json
                cid = data['cid']
                chunk_data = data['data'].encode('latin1') if isinstance(data['data'], str) else data['data']
                
                chunk_path = os.path.join(self.storage.storage_path, cid)
                if not os.path.exists(chunk_path):
                    with open(chunk_path, 'wb') as f:
                        f.write(chunk_data)
                    print(f"Saved new chunk: {cid[:8]}...")
                return jsonify({'status': 'ok'})
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            
        
        @self.app.route('/api/manifests', methods=['POST'])
        def receive_manifest():
            try:
                data = request.json
                cid = data['cid']
                manifest_data = data['data'].encode('latin1') if isinstance(data['data'], str) else data['data']
                
                manifest_path = os.path.join(self.storage.storage_path, cid)
                if not os.path.exists(manifest_path):
                    with open(manifest_path, 'wb') as f:
                        f.write(manifest_data)
                    print(f"Saved new manifest: {cid[:8]}...")
                return jsonify({'status': 'ok'})
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        @self.app.route('/api/manifests/<cid>', methods=['GET'])
        def get_manifest(cid):
            try:
                manifest_path = os.path.join(self.storage.storage_path, cid)
                if os.path.exists(manifest_path):
                    with open(manifest_path, 'rb') as f:
                        return f.read(), 200, {'Content-Type': 'application/octet-stream'}
                else:
                    manifest_data = self.network.get_manifest_from_peers(cid)
                    if manifest_data:
                        with open(manifest_path, 'wb') as f:
                            f.write(manifest_data)
                        return manifest_data, 200, {'Content-Type': 'application/octet-stream'}
                    return jsonify({'error': 'Manifest not found'}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            
            @self.app.route('/api/peers/detailed', methods=['GET'])
            def detailed_peers():
                peers = []
                for url, info in self.network.peers.items():
                    peers.append({
                        'url': url,
                        'node_id': info.get('id'),
                        'node_name': info.get('name'),
                        'first_seen': datetime.fromtimestamp(info.get('first_seen', 0)).isoformat(),
                        'last_seen': datetime.fromtimestamp(info.get('last_seen', 0)).isoformat(),
                        'status': 'active' if time.time() - info.get('last_seen', 0) < 60 else 'inactive',
                        'connection_duration': time.time() - info.get('first_seen', time.time()),
                        'chunks_shared': info.get('chunks_shared', 0),  # You'd need to track this
                        'manifests_shared': info.get('manifests_shared', 0)  # You'd need to track this
                    })
                return jsonify(sorted(peers, key=lambda x: x['last_seen'], reverse=True))
            
            
            
        @self.app.route('/dashboard')
        def dashboard():
            # Get peer information
            peers = []
            for url, info in self.network.peers.items():
                peers.append({
                    'url': url,
                    'name': info.get('name'),
                    'status': 'active' if time.time() - info.get('last_seen', 0) < 60 else 'inactive',
                    'last_seen': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(info.get('last_seen', 0)))
                })
            
            # Get local node info
            local_node = {
                'node_id': self.network.node_id,
                'node_name': self.network.node_name,
                'api_url': self.network.api_url,
                'storage_path': self.storage.storage_path,
                'peer_count': len(peers)
            }
            
            return f"""
            <html>
            <head>
                <title>Node Dashboard</title>
                <style>
                    body {{ font-family: Arial, sans-serif; margin: 20px; }}
                    .node-info {{ background: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px; }}
                    table {{ border-collapse: collapse; width: 100%; }}
                    th, td {{ padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }}
                    tr:hover {{ background-color: #f5f5f5; }}
                    .active {{ color: green; }}
                    .inactive {{ color: red; }}
                </style>
            </head>
            <body>
                <div class="node-info">
                    <h1>Node: {local_node['node_name']}</h1>
                    <p><strong>ID:</strong> {local_node['node_id']}</p>
                    <p><strong>API URL:</strong> {local_node['api_url']}</p>
                    <p><strong>Storage Path:</strong> {local_node['storage_path']}</p>
                    <p><strong>Connected Peers:</strong> {local_node['peer_count']}</p>
                </div>
                
                <h2>Connected Peers</h2>
                <table>
                    <tr>
                        <th>Peer URL</th>
                        <th>Node Name</th>
                        <th>Status</th>
                        <th>Last Seen</th>
                    </tr>
                    {"".join(
                        f"<tr><td>{p['url']}</td><td>{p['name']}</td>"
                        f"<td class='{p['status']}'>{p['status'].upper()}</td>"
                        f"<td>{p['last_seen']}</td></tr>"
                        for p in peers
                    )}
                </table>
            </body>
            </html>
            """
    def run(self):
        self.app.run(
            host='0.0.0.0',
            port=self.config['port'],
            threaded=True
        )