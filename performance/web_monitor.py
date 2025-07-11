from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO
import time
from threading import Lock
from collections import defaultdict
import logging
import os
from flask_cors import CORS
# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



app = Flask(__name__) 
CORS(app)
app.config['SECRET_KEY'] = os.urandom(24).hex()
socketio = SocketIO(app, 
                   cors_allowed_origins="*",
                   async_mode='threading',
                   logger=True,
                   engineio_logger=True)

# Store agent data
agent_data = defaultdict(dict)
active_agents = set()
data_lock = Lock()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/agent_data', methods=['POST'])
def receive_agent_data():
    try:
        data = request.json
        if not data or 'agent_name' not in data:
            return jsonify({"status": "invalid data"}), 400
            
        agent_name = data['agent_name']
        
        with data_lock:
            agent_data[agent_name] = data
            active_agents.add(agent_name)
            logger.info(f"Received data from {agent_name}")
            
            socketio.emit('system_stats', {
                'agent_name': agent_name,
                'data': data
            }, namespace='/')
        
        return jsonify({"status": "success"})
    except Exception as e:
        logger.error(f"Error in agent_data endpoint: {str(e)}")
        return jsonify({"status": "error"}), 500

@app.route('/api/agents')
def list_agents():
    with data_lock:
        return jsonify({
            "agents": list(active_agents),
            "count": len(active_agents),
            "timestamp": time.time()
        })

@app.route('/api/agent_data')
def get_agent_data():
    agent_name = request.args.get('agent')
    with data_lock:
        if agent_name in agent_data:
            return jsonify(agent_data[agent_name])
        return jsonify({"error": "Agent not found"}), 404

@socketio.on('connect')
def handle_connect():
    logger.info(f'Client connected: {request.sid}')
    with data_lock:
        for agent_name, data in agent_data.items():
            socketio.emit('system_stats', {
                'agent_name': agent_name,
                'data': data
            }, room=request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    logger.info(f'Client disconnected: {request.sid}')

def background_agent_checker():
    """Clean up inactive agents"""
    while True:
        time.sleep(15)
        current_time = time.time()
        
        with data_lock:
            to_remove = set()
            for agent in active_agents:
                last_update = agent_data[agent].get('timestamp', 0)
                if current_time - last_update > 30:
                    to_remove.add(agent)
                    logger.info(f"Removing inactive agent: {agent}")
            
            for agent in to_remove:
                active_agents.remove(agent)
                if agent in agent_data:
                    del agent_data[agent]

if __name__ == '__main__':
    from threading import Thread
    Thread(target=background_agent_checker, daemon=True).start()
    
    logger.info("Starting main dashboard on http://0.0.0.0:5000")
    socketio.run(app, 
                host='0.0.0.0', 
                port=5000, 
                debug=False,
                allow_unsafe_werkzeug=True)