from .utils import generate_cid, ensure_dir
import os

class Chunker:
    def __init__(self, chunk_size=262144):  # 256KB default
        self.chunk_size = chunk_size

    def chunk_file(self, file_path):
        cids = []
        with open(file_path, 'rb') as f:
            while True:
                chunk = f.read(self.chunk_size)
                if not chunk:
                    break
                cid = generate_cid(chunk)
                cids.append(cid)
        return cids

    def store_chunks(self, file_path, storage_path):
        ensure_dir(storage_path)
        cids = []
        with open(file_path, 'rb') as f:
            while True:
                chunk = f.read(self.chunk_size)
                if not chunk:
                    break
                cid = generate_cid(chunk)
                chunk_path = os.path.join(storage_path, cid)
                with open(chunk_path, 'wb') as chunk_file:
                    chunk_file.write(chunk)
                cids.append(cid)
        return cids

    def reassemble_file(self, cids, output_path, storage_path):
        ensure_dir(os.path.dirname(output_path))
        with open(output_path, 'wb') as f:
            for cid in cids:
                chunk_path = os.path.join(storage_path, cid)
                if not os.path.exists(chunk_path):
                    raise FileNotFoundError(f"Chunk {cid} not found")
                with open(chunk_path, 'rb') as chunk_file:
                    f.write(chunk_file.read())