import psutil
import time
from threading import Thread
import requests
from flask import Flask, jsonify
import logging
# import socket
from dotenv import load_dotenv
import os
import platform

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

load_dotenv(dotenv_path='../.env')


SERVER_IP = os.getenv("WEBPER_URL")
# print("Server IP:", SERVER_IP)

MAIN_SERVER = f"{SERVER_IP}"

UPDATE_INTERVAL = 2  # seconds
AGENT_NAME = f"{platform.node()}-{psutil.Process().pid}" 

def get_cpu_temp():
    try:
        temps = psutil.sensors_temperatures()
        if 'coretemp' in temps:
            return temps['coretemp'][0].current
        return None
    except Exception:
        return None

def get_system_info():
    try:
        # CPU
        cpu_percent = psutil.cpu_percent(interval=None)
        cpu_freq = psutil.cpu_freq().current if hasattr(psutil, 'cpu_freq') else 0
        
        # RAM
        ram = psutil.virtual_memory()
        
        # Disk (only physical disks)
        disks = []
        for partition in psutil.disk_partitions():
            if not partition.mountpoint.startswith('/snap'):
                try:
                    usage = psutil.disk_usage(partition.mountpoint)
                    disks.append({
                        'mountpoint': partition.mountpoint,
                        'total': usage.total,
                        'used': usage.used,
                        'free': usage.free,
                        'percent': usage.percent
                    })
                except Exception as e:
                    logger.warning(f"Disk error on {partition.mountpoint}: {str(e)}")
                    continue
        
        # Network
        net_io = psutil.net_io_counters()
        
        return {
            'agent_name': AGENT_NAME,
            'cpu': {
                'percent': cpu_percent,
                'freq': cpu_freq,
                'cores': psutil.cpu_count(logical=False),
                'logical_cores': psutil.cpu_count(logical=True),
                'per_cpu': psutil.cpu_percent(percpu=True),
                'temperature': get_cpu_temp()
            },
            'ram': {
                'total': ram.total,
                'available': ram.available,
                'used': ram.used,
                'free': ram.free,
                'percent': ram.percent
            },
            'disks': disks,
            'network': {
                'bytes_sent': net_io.bytes_sent,
                'bytes_recv': net_io.bytes_recv
            },
            'timestamp': time.time()
        }
    except Exception as e:
        logger.error(f"Error getting system info: {str(e)}")
        return None

# def send_to_server():
#     last_net = psutil.net_io_counters()
#     last_time = time.time()
    
#     while True:
#         try:
#             time.sleep(UPDATE_INTERVAL)
#             stats = get_system_info()
            
#             if stats:
#                 current_net = psutil.net_io_counters()
#                 time_diff = time.time() - last_time
                
#                 # Calculate network speeds in MB/s
#                 stats['network']['sent_speed'] = (current_net.bytes_sent - last_net.bytes_sent) / (1024**2) / time_diff
#                 stats['network']['recv_speed'] = (current_net.bytes_recv - last_net.bytes_recv) / (1024**2) / time_diff
                
#                 # Send data
#                 try:
#                     response = requests.post(
#                         f"{MAIN_SERVER}/api/agent_data",
#                         json=stats,
#                         timeout=3
#                     )
#                     if response.status_code != 200:
#                         logger.warning(f"Server response: {response.status_code}")
#                 except requests.exceptions.RequestException as e:
#                     logger.warning(f"Failed to send data: {str(e)}")
#                     time.sleep(5)
#                     continue
                
#                 # Update last values
#                 last_net = current_net
#                 last_time = time.time()
#         except Exception as e:
#             logger.error(f"Error in send loop: {str(e)}")
#             time.sleep(5)

def send_to_server():
    last_net = psutil.net_io_counters()
    last_time = time.time()

    while True:
        try:
            time.sleep(UPDATE_INTERVAL)
            stats = get_system_info()

            if stats:
                current_net = psutil.net_io_counters()
                now = time.time()
                time_diff = now - last_time

                # Bytes difference
                bytes_sent_diff = current_net.bytes_sent - last_net.bytes_sent
                bytes_recv_diff = current_net.bytes_recv - last_net.bytes_recv

                # Speeds in Mbps (Megabits per second)
                stats['network']['sent_speed_mbps'] = (bytes_sent_diff * 8) / 1024**2 / time_diff
                stats['network']['recv_speed_mbps'] = (bytes_recv_diff * 8) / 1024**2 / time_diff

                # Optional: Also include in MB/s if frontend still expects it
                stats['network']['sent_speed'] = bytes_sent_diff / 1024**2 / time_diff
                stats['network']['recv_speed'] = bytes_recv_diff / 1024**2 / time_diff

                try:
                    response = requests.post(
                        f"{MAIN_SERVER}/api/agent_data",
                        json=stats,
                        timeout=3
                    )
                    if response.status_code != 200:
                        logger.warning(f"Server response: {response.status_code}")
                except requests.exceptions.RequestException as e:
                    logger.warning(f"Failed to send data: {str(e)}")
                    time.sleep(5)
                    continue

                # Update for next round
                last_net = current_net
                last_time = now

        except Exception as e:
            logger.error(f"Error in send loop: {str(e)}")
            time.sleep(5)


if __name__ == '__main__':
    logger.info(f"Starting agent {AGENT_NAME} sending to {MAIN_SERVER}")
    Thread(target=send_to_server, daemon=True).start()
    app.run(host='0.0.0.0', port=5001, debug=False)