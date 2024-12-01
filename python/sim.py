import requests
import random
import time

API_URL = "http://34.42.34.201:8080/sensor/set"  # Replace with your actual API endpoint
USERNAME = "tirth"

def generate_random_sensor_data():
    return {
        "RPM": random.uniform(3000, 4000),
        "SPEED": random.uniform(40, 50),
        "ENGINE_LOAD": random.uniform(20, 60),
        "LONG_FUEL_TRIM_1": random.uniform(-7.8125, -8),
        "O2_B1S1": random.uniform(0.17, 0.18),
        "THROTTLE_POS": random.uniform(14, 18),
        "COOLANT_TEMP": random.uniform(86, 90),
        "MAF": random.uniform(4.15, 5),
        "FUEL_LEVEL": random.uniform(16, 20),
        "username": USERNAME
    }

def post_sensor_data():
    while True:
        sensor_data = generate_random_sensor_data()
        try:
            response = requests.post(API_URL, json=sensor_data)
            if response.status_code == 200:
                print(f"Data sent successfully: {sensor_data}")
            else:
                print(f"Failed to send data: {response.status_code}, {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
        time.sleep(0.5)  # 500 milliseconds

if __name__ == "__main__":
    post_sensor_data()
