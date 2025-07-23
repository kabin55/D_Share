import json
import argparse
import os
import threading
import time
from node.storage import Storage
from node.network import Network
from node.api import API

def load_config(config_path):
    with open(config_path, 'r') as f:
        return json.load(f)

def main():
    parser = argparse.ArgumentParser(description='IPFS Clone Node')
    parser.add_argument('--config', default='config.json', help='Path to config file')
    parser.add_argument('--port', type=int, help='Port to run the node on')
    args = parser.parse_args()
    
    config = load_config(args.config)
    
    # Override port if specified
    if args.port:
        config['port'] = args.port
    
    # Initialize components
    storage = Storage(config)
    network = Network(config)
    api = API(config, storage, network)
    
    # Start network services
    network.start()
    
    # Start API server
    print(f"\nStarting node {network.node_name} on {network.api_url}")
    print(f"Storage path: {config['storage_path']}")
    print(f"Bootstrap nodes: {config.get('bootstrap_nodes', [])}")
    print(f"Peer discovery interval: {config.get('discovery_interval', 60)} seconds\n")
    
    def display_node_info(network):
        """Display local node and peer info in terminal"""
        while True:
            os.system('clear' if os.name == 'posix' else 'cls')
            
            # Local node info
            print(f"\n{' NODE INFORMATION ':~^60}")
            print(f"ID: {network.node_id}")
            print(f"Name: {network.node_name}")
            print(f"API URL: {network.api_url}")
            print(f"Storage: {network.config['storage_path']}")
            print(f"{'':-<60}")
            
            # Peer table header
            print(f"\n{' NETWORK PEERS ':~^60}")
            print(f"{'URL':<30} {'Name':<20} {'Status':<10} {'Uptime':<12} {'Last Seen':<12}")
            print("-" * 60)
            
            # Peer data
            for url, info in network.peers.items():
                status = 'ACTIVE' if time.time() - info.get('last_seen', 0) < 60 else 'INACTIVE'
                uptime = time.time() - info.get('first_seen', time.time())
                last_seen = time.time() - info.get('last_seen', 0)
                
                print(f"{url:<30} {info.get('name','unknown'):<20} "
                      f"{status:<10} {uptime:.1f}s {'':<5} {last_seen:.1f}s ago")
            
            time.sleep(5)  # Refresh every 5 seconds
    
    # Start the display thread
    threading.Thread(target=display_node_info, args=(network,), daemon=True).start()
    api.run()

if __name__ == '__main__':
    main()