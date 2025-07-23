import os
import json
from .utils import generate_cid, ensure_dir
from .chunker import Chunker

class Storage:
    def __init__(self, config):
        self.storage_path = os.path.abspath(config['storage_path'])
        ensure_dir(self.storage_path)
        self.chunk_size = config['chunk_size']
        self.chunker = Chunker(self.chunk_size)
        
        self.chunk_locations_path = os.path.join(self.storage_path, 'chunk_locations.json')
        if not os.path.exists(self.chunk_locations_path):
            with open(self.chunk_locations_path, 'w') as f:
                json.dump({}, f)

    def store_file(self, file_path):
        """Store a file and return its root CID"""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File {file_path} does not exist")
            
        chunk_cids = self.chunker.store_chunks(file_path, self.storage_path)
        
        manifest = {
            'chunks': chunk_cids,
            'filename': os.path.basename(file_path)
        }
        manifest_data = json.dumps(manifest).encode('utf-8')
        root_cid = generate_cid(manifest_data)
        
        manifest_path = os.path.join(self.storage_path, root_cid)
        with open(manifest_path, 'wb') as f:
            f.write(manifest_data)
            
        self._update_chunk_locations(root_cid, chunk_cids)
        return root_cid

    def retrieve_file(self, root_cid):
        """Retrieve file data from chunks without creating temp file"""
        manifest_path = os.path.join(self.storage_path, root_cid)
        if not os.path.exists(manifest_path):
            raise FileNotFoundError(f"Manifest {root_cid} not found")
        
        with open(manifest_path, 'rb') as f:
            manifest = json.loads(f.read().decode('utf-8'))
        
        # Generator that yields file data by reading chunks sequentially
        def generate():
            for cid in manifest['chunks']:
                chunk_path = os.path.join(self.storage_path, cid)
                if not os.path.exists(chunk_path):
                    raise FileNotFoundError(f"Chunk {cid} not found")
                with open(chunk_path, 'rb') as chunk_file:
                    yield chunk_file.read()
        
        return generate(), manifest['filename']
    
    def has_chunk(self, cid):
        return os.path.exists(os.path.join(self.storage_path, cid))

    def _update_chunk_locations(self, root_cid, chunk_cids):
        with open(self.chunk_locations_path, 'r') as f:
            locations = json.load(f)
            
        for cid in chunk_cids:
            if cid not in locations:
                locations[cid] = []
            if root_cid not in locations[cid]:
                locations[cid].append(root_cid)
                
        with open(self.chunk_locations_path, 'w') as f:
            json.dump(locations, f)