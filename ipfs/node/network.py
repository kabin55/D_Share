import threading
import time
import requests
import uuid
import platform
import json
import os
import socket
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

class Network:
    def __init__(self, config):
        self.config = config
        self.node_id = str(uuid.uuid4())
        self.node_name = self._generate_node_name()
        self.peers = {}
        self.bootstrap_nodes = config.get('bootstrap_nodes', [])
        self.host = config['host']
        self.port = config['port']
        self.api_url = f"http://{self.host}:{self.port}"
        self.peers_file = os.path.join(config['storage_path'], 'peers.json')
        self.scan_ports = config.get('scan_ports', [5000, 5001, 5002])
        self.scan_timeout = config.get('scan_timeout', 1.5)
        self._load_peers()
        
    def _generate_node_name(self):
        hostname = platform.node() or "unknown-host"
        return f"{hostname}-{self.node_id[:8]}"
        
    def _load_peers(self):
        try:
            if os.path.exists(self.peers_file):
                with open(self.peers_file, 'r') as f:
                    self.peers = json.load(f)

                # Clean up invalid entries
                self.peers = {
                    url: info for url, info in self.peers.items()
                    if url != self.api_url  # Remove self-reference
                    and not url.startswith('http://0.0.0.0')  # Remove 0.0.0.0
                    and not any(  # Remove duplicates with different URLs
                        u != url and u.split('//')[-1].split(':')[0] == url.split('//')[-1].split(':')[0]
                        for u in self.peers
                    )
                }
        except Exception as e:
            print(f"Error loading peers: {e}")
            self.peers = {}
            
    def _save_peers(self):
        try:
            with open(self.peers_file, 'w') as f:
                json.dump(self.peers, f)
        except Exception as e:
            print(f"Error saving peers: {e}")
        
    def start(self):
        # Wait for API server to start
        time.sleep(2)
        
        # Connect to bootstrap nodes first
        for node in self.bootstrap_nodes:
            if node:  # Only try if not empty
                if node.startswith('https://') and self.api_url.startswith('http://'):
                    node = node.replace('https://', 'http://')
                self.connect_to_peer(node)
            
        # Then try saved peers
        for peer_url in list(self.peers.keys()):
            self.connect_to_peer(peer_url)
            
        # Start background discovery
        threading.Thread(
            target=self._continuous_discovery,
            daemon=True
        ).start()
        
        # Start maintenance thread
        threading.Thread(
            target=self._peer_maintenance,
            daemon=True
        ).start()
        
    def _continuous_discovery(self):
        """Background thread for hybrid discovery"""
        while True:
            # Only scan if we need more peers
            if len([p for p in self.peers.values() 
                   if time.time() - p.get('last_seen', 0) < 60]) < 3:
                self._scan_local_network()
            
            time.sleep(self.config.get('discovery_interval', 30))
            
    def _scan_local_network(self):
        """Threaded local network scanner"""
        base_ip = self._get_local_ip()
        if not base_ip:
            return
            
        network_prefix = '.'.join(base_ip.split('.')[:3])
        
        def probe_peer(ip, port):
            peer_url = f"http://{ip}:{port}"
            if peer_url not in self.peers and peer_url != self.api_url:
                self.connect_to_peer(peer_url)

        with ThreadPoolExecutor(max_workers=20) as executor:
            for last_octet in range(1, 255):
                ip = f"{network_prefix}.{last_octet}"
                if ip == base_ip.split('.')[3]:
                    continue  # Skip our own IP
                
                for port in self.scan_ports:
                    executor.submit(probe_peer, ip, port)
        
    def connect_to_peer(self, peer_url):
        """Enhanced peer connection with duplicate prevention and better error handling"""

        # Normalize the peer URL first
        normalized_url = self._normalize_peer_url(peer_url)
        if not normalized_url or normalized_url == self.api_url:
            return

        # Check for existing connections to the same node
        existing_connection = self._find_existing_connection(normalized_url)
        if existing_connection:
            # Update existing entry instead of creating duplicate
            self.peers[existing_connection]['last_seen'] = time.time()
            self._save_peers()
            return

        try:
            print(f"Attempting connection to: {normalized_url}")
            response = requests.get(
                f"{normalized_url}/api/info",
                timeout=self.scan_timeout,
                headers={'Connection': 'keep-alive'}
            )

            if response.status_code == 200:
                info = response.json()

                # Ensure we're not connecting to ourselves
                if info['node_id'] == self.node_id:
                    return

                # Store the normalized URL
                self.peers[normalized_url] = {
                    'id': info['node_id'],
                    'name': info['node_name'],
                    'last_seen': time.time(),
                    'first_seen': self.peers.get(normalized_url, {}).get('first_seen', time.time()),
                    'source': 'manual' if peer_url in self.bootstrap_nodes else 'discovered',
                    'ip': self._extract_ip_from_url(normalized_url)
                }
                self._save_peers()

                # Notify peer about us
                self._notify_peer_of_our_existence(normalized_url)

                # Get peer's peer list (with recursion prevention)
                self._fetch_and_process_peer_list(normalized_url)

        except requests.exceptions.RequestException as e:
            print(f"Connection to {normalized_url} failed: {e}")
            if normalized_url in self.peers:
                del self.peers[normalized_url]
                self._save_peers()

    def _normalize_peer_url(self, url):
        """Convert 0.0.0.0 to actual IP and standardize format"""
        try:
            if not url or '://' not in url:
                return None

            # Replace 0.0.0.0 with local IP if possible
            if '0.0.0.0' in url:
                local_ip = self._get_local_ip()
                if not local_ip:
                    return None
                url = url.replace('0.0.0.0', local_ip)

            # Standardize URL format
            parsed = requests.utils.urlparse(url)
            if not parsed.netloc:
                return None

            # Ensure port is included
            if ':' not in parsed.netloc:
                netloc = f"{parsed.netloc}:{self.port}" 
            else:
                netloc = parsed.netloc

            return f"{parsed.scheme or 'http'}://{netloc}"
        except Exception as e:
            print(f"URL normalization failed: {e}")
            return None

    def _find_existing_connection(self, normalized_url):
        """Check if we're already connected to this node via different URL"""
        target_ip = self._extract_ip_from_url(normalized_url)
        if not target_ip:
            return None

        for existing_url in self.peers:
            existing_ip = self._extract_ip_from_url(existing_url)
            if existing_ip == target_ip:
                return existing_url
        return None

    def _extract_ip_from_url(self, url):
        """Extract just the IP/hostname from URL"""
        try:
            return url.split('://')[1].split(':')[0]
        except:
            return None

    def _notify_peer_of_our_existence(self, peer_url):
        """Handles peer notification with retries"""
        max_retries = 2
        for attempt in range(max_retries):
            try:
                requests.post(
                    f"{peer_url}/api/peers/notify",
                    json={
                        'url': self.api_url,
                        'info': {
                            'id': self.node_id,
                            'name': self.node_name,
                            'last_seen': time.time()
                        }
                    },
                    timeout=3
                )
                break
            except Exception as e:
                if attempt == max_retries - 1:
                    print(f"Peer notification to {peer_url} failed: {e}")

    def _fetch_and_process_peer_list(self, peer_url):
        """Fetch and process peer list with safeguards"""
        try:
            response = requests.get(f"{peer_url}/api/peers", timeout=5)
            if response.status_code == 200:
                for peer in response.json():
                    if peer['url'] != self.api_url:
                        # Prevent infinite recursion by limiting depth
                        if len(self.peers) < 20:  
                            self.connect_to_peer(peer['url'])
        except Exception as e:
            print(f"Failed to process peer list from {peer_url}: {e}")

    def _peer_maintenance(self):
        while True:
            current_time = time.time()
            for url, info in list(self.peers.items()):
                try:
                    # Force recheck inactive peers
                    if current_time - info.get('last_seen', 0) > 30:
                        response = requests.get(f"{url}/api/info", timeout=2)
                        if response.status_code == 200:
                            self.peers[url]['last_seen'] = current_time
                            print(f"Reconnected to {url}")
                            continue
                        
                    # Only mark inactive after 3 failed checks
                    if current_time - info.get('last_seen', 0) > 90:
                        print(f"Marking {url} as INACTIVE")
                        self.peers[url]['status'] = 'inactive'
                        
                except Exception as e:
                    print(f"Peer check failed: {str(e)}")
                    
            time.sleep(10)  
            
    def _get_local_ip(self):
        """Get primary local IP address"""
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            s.close()
            return ip
        except Exception as e:
            print(f"Error getting local IP: {e}")
            return None
            
    def propagate_chunk(self, cid, data):
        """Send chunk to all active peers"""
        for peer_url, peer_info in self.peers.items():
            if time.time() - peer_info.get('last_seen', 0) > 60:
                continue
                
            try:
                # Skip if peer already has it
                response = requests.head(f"{peer_url}/api/chunks/{cid}", timeout=2)
                if response.status_code == 200:
                    continue
                    
                encoded_data = data.decode('latin1') if isinstance(data, bytes) else data
                requests.post(
                    f"{peer_url}/api/chunks",
                    json={
                        'cid': cid,
                        'data': encoded_data
                    },
                    timeout=10
                )
                print(f"Propagated chunk {cid[:8]} to {peer_url}")
            except Exception as e:
                print(f"Chunk propagation failed: {str(e)}")
                
    def propagate_manifest(self, cid, data):
        """Send manifest to all active peers"""
        for peer_url, peer_info in self.peers.items():
            if time.time() - peer_info.get('last_seen', 0) > 60:
                continue
                
            try:
                # Skip if peer already has it
                response = requests.head(f"{peer_url}/api/manifests/{cid}", timeout=2)
                if response.status_code == 200:
                    continue
                    
                encoded_data = data.decode('latin1') if isinstance(data, bytes) else data
                requests.post(
                    f"{peer_url}/api/manifests",
                    json={
                        'cid': cid,
                        'data': encoded_data
                    },
                    timeout=10
                )
                print(f"Propagated manifest {cid[:8]} to {peer_url}")
            except Exception as e:
                print(f"Manifest propagation failed: {str(e)}")
                
    def get_chunk_from_peers(self, cid):
        """Fetch chunk from first available peer"""
        for peer_url, peer_info in self.peers.items():
            if time.time() - peer_info.get('last_seen', 0) > 60:
                continue
                
            try:
                response = requests.get(f"{peer_url}/api/chunks/{cid}", timeout=5)
                if response.status_code == 200:
                    return response.content
            except requests.exceptions.RequestException:
                continue
        return None
        
    def get_manifest_from_peers(self, cid):
        """Fetch manifest from first available peer"""
        for peer_url, peer_info in self.peers.items():
            if time.time() - peer_info.get('last_seen', 0) > 60:
                continue
                
            try:
                response = requests.get(f"{peer_url}/api/manifests/{cid}", timeout=5)
                if response.status_code == 200:
                    return response.content
            except requests.exceptions.RequestException:
                continue
        return None
    
    def get_peer_stats(self):
        """Return detailed peer statistics"""
        stats = {
            'node_id': self.node_id,
            'node_name': self.node_name,
            'api_url': self.api_url,
            'total_peers': len(self.peers),
            'active_peers': sum(1 for p in self.peers.values() 
                              if time.time() - p.get('last_seen', 0) < 60),
            'peer_list': []
        }
        
        for url, info in self.peers.items():
            stats['peer_list'].append({
                'url': url,
                'name': info.get('name'),
                'source': info.get('source', 'unknown'),
                'uptime': time.time() - info.get('first_seen', time.time()),
                'last_contact': time.time() - info.get('last_seen', 0),
                'status': 'active' if time.time() - info.get('last_seen', 0) < 60 else 'inactive'
            })
        
        return stats
    
    def print_peer_table(self):
        """Print formatted peer table to console"""
        print("\n=== Network Peer Table ===")
        print(f"{'URL':<30} {'Name':<20} {'Source':<10} {'Status':<10} {'Uptime':<12} {'Last Seen':<12}")
        print("-" * 80)
        
        for url, info in self.peers.items():
            status = 'ACTIVE' if time.time() - info.get('last_seen', 0) < 60 else 'INACTIVE'
            uptime = time.time() - info.get('first_seen', time.time())
            last_seen = time.time() - info.get('last_seen', 0)
            
            print(f"{url:<30} {info.get('name','unknown'):<20} "
                  f"{info.get('source','unknown'):<10} {status:<10} "
                  f"{uptime:.1f}s {'':<5} {last_seen:.1f}s ago")