import joblib
import pandas as pd
import os
import warnings
import sys
from sklearn.exceptions import InconsistentVersionWarning

# Suppress specific warning
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)

# Define the absolute path to the model file
model_filename = os.path.join(os.path.dirname(__file__), 'co2_emission_model.joblib')

# Check if the model file exists
if not os.path.exists(model_filename):
    raise FileNotFoundError(f"The model file '{model_filename}' was not found. Please check the path and try again.")

# Load the saved model
model = joblib.load(model_filename)

# List of all required fields
fields = ['Engine size (L)', 'Cylinders', 'Combined (L/100 km)',
          'Transmission_A3', 'Transmission_A4', 'Transmission_A5',
          'Transmission_A6', 'Transmission_A7', 'Transmission_A8',
          'Transmission_A9', 'Transmission_AM5', 'Transmission_AM6',
          'Transmission_AM7', 'Transmission_AM8', 'Transmission_AM9',
          'Transmission_AS10', 'Transmission_AS4', 'Transmission_AS5',
          'Transmission_AS6', 'Transmission_AS7', 'Transmission_AS8',
          'Transmission_AS9', 'Transmission_AV', 'Transmission_AV1',
          'Transmission_AV10', 'Transmission_AV6', 'Transmission_AV7',
          'Transmission_AV8', 'Transmission_M4', 'Transmission_M5',
          'Transmission_M6', 'Transmission_M7', 'Fuel type_E', 'Fuel type_N',
          'Fuel type_X', 'Fuel type_Z']

# Initialize the DataFrame with appropriate data types
new_data = pd.DataFrame([{col: 0 for col in fields}], dtype=float)

# Parse command-line arguments
if len(sys.argv) != 6:
    raise ValueError("Expected 5 arguments: Engine size, Cylinders, Combined (L/100 km), Transmission, Fuel type")

engine_size = float(sys.argv[1])
cylinders = int(sys.argv[2])
combined = float(sys.argv[3])
transmission = sys.argv[4]
fuel_type = sys.argv[5]

# Set the values for the fields you have data for
new_data.at[0, 'Engine size (L)'] = engine_size
new_data.at[0, 'Cylinders'] = cylinders
new_data.at[0, 'Combined (L/100 km)'] = combined

# Set the appropriate transmission and fuel type
transmission_col = f'Transmission_{transmission}'
fuel_type_col = f'Fuel type_{fuel_type}'

if transmission_col in new_data.columns:
    new_data.at[0, transmission_col] = 1
else:
    raise ValueError(f"Invalid transmission type: {transmission}")

if fuel_type_col in new_data.columns:
    new_data.at[0, fuel_type_col] = 1
else:
    raise ValueError(f"Invalid fuel type: {fuel_type}")

# Making predictions
predicted_emissions = model.predict(new_data)
print(f"Predicted CO2 emissions: {predicted_emissions[0]:.2f} g/km")
