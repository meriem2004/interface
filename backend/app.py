import datetime
from flask import Flask, jsonify
import requests
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define your API endpoints
API_ENDPOINTS = {
    "Ompic_Typage_With_Simplifie": "http://10.1.23.10:8011/",
    "Ompic_inference_passif": "http://10.1.23.10:8012/",
    # "highco_belg": "http://10.1.11.35:8017/",
    # "highco_france": "http://10.1.11.35:8016/",
    # Add more APIs as needed
}

# Dictionary to store last down time and last activate time for each API
api_status_history = {name: {'last_down_time': None, 'last_activate_time': None} for name in API_ENDPOINTS}

# File to store downtime data
JSONL_FILE = "downtime_data.jsonl"

@app.route('/')
def index():
    return jsonify({"message": 'Welcome to API Monitor!'})

@app.route('/check')
def check_apis():
    api_statuses = {}
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    downtime_data = {name: [] for name in API_ENDPOINTS}
    
    for name, url in API_ENDPOINTS.items():
        # Splitting the URL into address and port components
        address_port_parts = url.split(':')
        address = ':'.join(address_port_parts[:-1])  # Join all parts except the last one
        port = address_port_parts[-1] if len(address_port_parts) > 1 else ''
        
        # Perform a check for each API
        try:
            response = requests.get(url, timeout=5)  # Add a timeout
            if response.status_code == 200:
                api_statuses[name] = {
                    'status': True,
                    'address': address,
                    'port': port,
                    'last_checked': current_time,
                    'last_down_time': api_status_history[name]['last_down_time'],
                    'last_activate_time': current_time
                }
                api_status_history[name]['last_activate_time'] = current_time
            else:
                api_statuses[name] = {
                    'status': False,
                    'address': address,
                    'port': port,
                    'last_checked': current_time,
                    'last_down_time': current_time,
                    'last_activate_time': api_status_history[name]['last_activate_time']
                }
                api_status_history[name]['last_down_time'] = current_time
                downtime_data[name].append({'date': current_time, 'status': 'down'})
        except requests.RequestException:
            api_statuses[name] = {
                'status': False,
                'address': address,
                'port': port,
                'last_checked': current_time,
                'last_down_time': current_time,
                'last_activate_time': api_status_history[name]['last_activate_time']
            }
            api_status_history[name]['last_down_time'] = current_time
            downtime_data[name].append({'date': current_time, 'status': 'down'})

    # Write downtime data to JSONL file
    write_to_jsonl(downtime_data)

    return jsonify(api_statuses)

def write_to_jsonl(data):
    """Write downtime data to a JSONL file."""
    with open(JSONL_FILE, 'a') as f:
        for api_name, entries in data.items():
            for entry in entries:
                json.dump({'api_name': api_name, 'date': entry['date'], 'status': entry['status']}, f)
                f.write('\n')

@app.route('/api/downtime')
def get_downtime_data():
    try:
        downtime_data = {}
        if os.path.exists(JSONL_FILE):
            with open(JSONL_FILE, 'r') as f:
                for line in f:
                    entry = json.loads(line)
                    api_name = entry['api_name']
                    date = datetime.datetime.strptime(entry['date'], "%Y-%m-%d %H:%M:%S")
                    month = date.strftime("%b")
                    if month not in downtime_data:
                        downtime_data[month] = 0
                    if entry['status'] == 'down':
                        downtime_data[month] += 1
        
        chart_data = [{"name": month, "downtime": count} for month, count in downtime_data.items()]
        return jsonify(chart_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)