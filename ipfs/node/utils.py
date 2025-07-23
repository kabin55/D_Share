import hashlib
import os
import json
from Crypto.Hash import SHA256

def generate_cid(data):
    """Generate Content ID using SHA-256"""
    if isinstance(data, str):
        data = data.encode('utf-8')
    sha256 = SHA256.new()
    sha256.update(data)
    return sha256.hexdigest()

def ensure_dir(path):
    """Ensure directory exists"""
    if not os.path.exists(path):
        os.makedirs(path)