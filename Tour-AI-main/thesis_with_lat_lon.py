


import pandas as pd

# Loading the dataset
file_path = 'Updated_User_Data_Sylhet_Places.xlsx'
data = pd.read_excel(file_path)

# Displaying the first few rows of the dataset to understand its structure
data.head()

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report






data = data.dropna()

# Splitting the dataset into features and target
X = data[['Gender', 'DayOrder', 'Season', 'With', 'Budget']]
y = data['Place ID']

# Splitting the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Training the Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predicting and evaluating the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print("Model Accuracy:", accuracy)
print("Classification Report:\n", report)

def predict_place_id(gender, day_order, season, with_whom, budget):
    # Convert input data to a DataFrame (as our model expects a DataFrame input)
    input_data = pd.DataFrame([[gender, day_order, season, with_whom, budget]],
                              columns=['Gender', 'DayOrder', 'Season', 'With', 'Budget'])

    # Use the model to make a prediction
    predicted_place_id = model.predict(input_data)

    return predicted_place_id[0]

# # Example of using the function
# # Replace these values with your input
# gender_input = 1  # Example input
# day_order_input = 1
# season_input = 2
# with_input = 3
# budget_input = 3

# predicted_place = predict_place_id(gender_input, day_order_input, season_input, with_input, budget_input)
# print("Predicted Place ID:", predicted_place)



import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Load the feature mapping table
mapping_table_path = 'Mapping_Table.xlsx'
feature_mapping = pd.read_excel(mapping_table_path)

# Function to map Place IDs to place names
def map_place_id_to_name(place_id):
    place_id_name_mapping = {
        1: 'Ratargul Swamp Forest',
    2: 'Jaflong',
    3: 'Lalakhal',
    4: 'Bichanakandi',
    5: 'Srimangal',
    6: 'Lawachara National Park',
    7: 'Madhabkunda Waterfall',
    8: 'SUST Campus',
    9: 'Osmani Museum',
    10: 'Hazrat Shahjalal Mazar Sharif',
    11: 'Hazrat Shah Paran Bangla Bazar Mosque',
    12: 'Dreamland Amusement & Water Park',
    13: 'Tea estates in Sreemangal',
    14: 'Tamabil-Jaflong border area',
    15: 'Rajasri Waterfall',
    16: 'Malnichhara Tea Estate',
    17: 'Moulvibazar town',
    18: 'Pangthumai Waterfall',
    19: 'Hum Hum Waterfall',
    20: 'Dargah of Hazrat Shah Jalal'
    }
    return place_id_name_mapping.get(place_id, "Unknown Place")

# Function to convert categorical feature values to numeric codes
def convert_to_numeric(features):
    numeric_values = []
    for feature, value in features.items():
        if feature == 'DayOrder':
            # Directly use the numeric value for DayOrder
            numeric_values.append(value)
        else:
            numeric_value = feature_mapping[
                (feature_mapping['Feature'] == feature) &
                (feature_mapping['Categorical Value'] == value)
            ]['Numeric Code'].values
            if numeric_value.size > 0:
                numeric_values.append(numeric_value[0])
            else:
                raise ValueError(f"Invalid value for {feature}: {value}")
    return numeric_values
def predict_place(gender, day_order, season, with_whom, budget):
    # Convert inputs to numeric codes
    features = {
        "Gender": gender,
        "DayOrder": day_order,
        "Season": season,
        "With": with_whom,
        "Budget": budget
    }
    numeric_features = convert_to_numeric(features)

    # Create a DataFrame with the correct feature names
    feature_names = ['Gender', 'DayOrder', 'Season', 'With', 'Budget']  # Adjust these names based on your model training
    input_df = pd.DataFrame([numeric_features], columns=feature_names)

    # Assuming model is already trained and named 'model'
    predicted_place_id = model.predict(input_df)[0]

    # Map Place ID to Place Name
    place_name = map_place_id_to_name(predicted_place_id)
    return place_name

# Example usage
# print(predict_place("Male", 1, "Winter", "Family", "High"))  # Replace with actual values

def get_user_input(feature, options):
    print(f"Select {feature}:")
    for i, option in enumerate(options, 1):
        print(f"{i}. {option}")
    choice = int(input("Enter choice (number): "))
    return options[choice - 1]



import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from haversine import haversine

# Function to calculate distance
def calculate_distance(coord1, coord2):
    return haversine(coord1, coord2)
place_coordinates = {
    1: (24.9725, 91.7389),  # Ratargul Swamp Forest
    2: (25.1704, 92.0957),  # Jaflong
    3: (24.7425, 92.3453),  # Lalakhal
    4: (25.1827, 92.1801),  # Bichanakandi
    5: (24.3065, 91.7296),  # Srimangal
    6: (24.3926, 91.7866),  # Lawachara National Park
    7: (24.5300, 91.9896),  # Madhabkunda Waterfall
    8: (24.8975, 91.8611),  # SUST Campus
    9: (24.8992, 91.8715),  # Osmani Museum
    10: (24.8918, 91.8667), # Hazrat Shahjalal Mazar Sharif
    11: (24.8992, 91.8721), # Hazrat Shah Paran Bangla Bazar Mosque
    12: (24.8542, 91.8677), # Dreamland Amusement & Water Park
    13: (24.3238, 91.7257), # Tea estates in Sreemangal
    14: (25.1561, 92.1137), # Tamabil-Jaflong border area
    15: (24.4650, 91.9668), # Rajasri Waterfall
    16: (24.8912, 91.8607), # Malnichhara Tea Estate
    17: (24.4986, 91.7715), # Moulvibazar town
    18: (24.7331, 91.9602), # Pangthumai Waterfall
    19: (24.5997, 92.1953), # Hum Hum Waterfall
    20: (24.9025, 91.8740)  # Dargah of Hazrat Shah Jalal
}


def predict_top_12_place_ids(input_df):
    probabilities = model.predict_proba(input_df)
    top_12_indices = np.argsort(probabilities, axis=1)[0][-12:]
    top_12_place_ids = [model.classes_[i] for i in top_12_indices]
    return top_12_place_ids

def main():
    # Define options for each feature, excluding DayOrder
    gender_options = feature_mapping[feature_mapping['Feature'] == 'Gender']['Categorical Value'].tolist()
    season_options = feature_mapping[feature_mapping['Feature'] == 'Season']['Categorical Value'].tolist()
    with_options = feature_mapping[feature_mapping['Feature'] == 'With']['Categorical Value'].tolist()
    budget_options = feature_mapping[feature_mapping['Feature'] == 'Budget']['Categorical Value'].tolist()

    # Get user input for each feature
    gender = get_user_input("Gender", gender_options)
    season = get_user_input("Season", season_options)
    with_whom = get_user_input("With", with_options)
    budget = get_user_input("Budget", budget_options)

    # Convert inputs to numeric codes and create a DataFrame
    # Use a fixed DayOrder (e.g., 1) as it's not used directly for prediction in this context
    features = {"Gender": gender, "DayOrder": 1, "Season": season, "With": with_whom, "Budget": budget}
    numeric_features = convert_to_numeric(features)
    input_df = pd.DataFrame([numeric_features], columns=['Gender', 'DayOrder', 'Season', 'With', 'Budget'])

    # Predict the top 12 places
    top_place_ids = predict_top_12_place_ids(input_df)
    ref_point = (24.8903, 91.8715)

    # Calculate distances and sort places
    places_with_distances = []
    for place_id in top_place_ids:
        place_coord = place_coordinates[place_id]
        distance = calculate_distance(ref_point, place_coord)
        place_name = map_place_id_to_name(place_id)
        places_with_distances.append((place_name, distance))

    places_with_distances.sort(key=lambda x: x[1])

    # Ask for the number of tour days (1, 2, or 3)
    num_days = int(input("Enter the number of tour days (1, 2, or 3): "))
    if num_days not in [1, 2, 3]:
        print("Invalid number of days. Please enter 1, 2, or 3.")
        return

    # Split the sorted places across the days
    for day_order in range(1, num_days + 1):
        start_index = (day_order - 1) * 4
        end_index = start_index + 4

        # Print 4 places for the current day
        print(f"\nDay {day_order} Itinerary:")
        for place, distance in places_with_distances[start_index:end_index]:
            print(f"{place}: {distance:.2f} km")

if __name__ == "__main__":
    main()