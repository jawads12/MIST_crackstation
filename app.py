from flask import Flask, request, jsonify, session
from openai import OpenAI
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.secret_key = 'your_secret_key'

OPENAI_API_KEY = "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"
client = OpenAI(api_key=OPENAI_API_KEY)

# Initialize the conversation with the system message
conversation = [
    {"role": "system", "content":  "Make JSON format . You are a trip advisor. My users will come to you and ask for any kind of help regarding any place in sylhet, also transportation, name, history, address of places you should give. And also you have to suggest traditional food or normal food and restaurant to have it it's address, cost etc. You also maybe have to suggest hotels address, cost, review. Response will be on JSON format"}
]

# Function to add a message and get a response
def chat_with_gpt4(user_message):
    # Add the user's message to the conversation
    conversation.append({"role": "user", "content": user_message})

    # Create the completion
    completion = client.chat.completions.create(
        model="gpt-4-0125-preview",
        response_format={"type": "json_object"},
        messages=conversation
    )

    # Extract GPT's response and add to the conversation
    gpt_response = completion.choices[0].message
    #conversation.append({"role": "system", "content": gpt_response})

    # Print GPT's response
   # print(gpt_response)

# Example usage
#chat_with_gpt4("Is jaflong is safe to visit today? tell me surffing internet")
chat_with_gpt4("Bro Jaflong is in fire!!!")
#chat_with_gpt4("Is jaflong is safe to visit today? tell me surffing internet")


##Assistant##
assistant = client.beta.assistants.create(
  instructions="Give JSON format. You are a trip advisor. My users will come to you and ask for any kind of help regarding anything related to food, transport, hotels and place in sylhet. If you dont find any information from what files you are given than do it by yourself. Also if anyone explicitely mention that they only need food, accomodation, place or something than only show those data in JSON otherwise show everything. Give ONLY JSON format details with place details = name, history, transportation=(vehicle, distance, time), address, food = name, cost, restaurant, address, hotels = name, address, cost, review. No other text will be there except JSON. If you have anything to say make it a 'note' field in JSON and write there. If you detect any kind of review then in 'note'='review' field say only 'review'. I will store it for further testing",
  model="gpt-4-0125-preview",
  tools=[{"type": "retrieval"}]

)
#print(assistant)

ASSISTANT_ID = assistant.id
import time

rules = "If you dont find any information from what files you are given than do it by yourself. Also if anyone explicitely mention that they only need food, accomodation, place or something than only show those data in JSON otherwise show everything. Give ONLY JSON format details with 'place' = 'name', 'history', 'transportation'=('vehicle', 'distance', 'time'), 'address', 'food' = 'name', cost, restaurant, address, hotels = name, address, cost, review. No other text will be there except JSON. If you have anything to say make it a 'note' field in JSON and write there. Give JSON format. You are a trip advisor. My users will come to you and ask for any kind of help regarding anything related to food, transport, hotels and place in sylhet. If you dont find any information from what files you are given than do it by yourself. Also if anyone explicitely mention that they only need food, accomodation, place or something than only show those data in JSON otherwise show everything. Give ONLY JSON format details with 'places' = 'name', 'history', 'transportation'=('vehicle', 'distance', 'time'), 'address', 'food' = 'name', 'cost', 'restaurant', 'address', 'hotels' = 'name', 'address', 'cost', 'review'. No other text will be there except JSON. If you have anything to say make it a 'note' field in JSON and write there. DONT CHANGE ANY FIELD NAME GIVEN. If you detect any kind of review then in 'note'='review' field say only 'review'.I will store it for further testing"
# Enter your Assistant ID here.
#print(rules)

@app.route('/query', methods=['POST'])
def query():


    # Enter your Assistant ID here.
    print('prompt')
    user_input = request.json.get('prompt')
    user_id = session.get('user_id')

    if not user_id:
        # Create a new thread for a new user
        user_id = create_new_thread(user_input)
        session['user_id'] = user_id
    else:
        # Use existing thread for returning user
        add_message_to_thread(user_id, user_input)

    response = get_response_from_thread(user_id)
    return jsonify(response)

def create_new_thread(user_input):
    # Create a new thread with the initial user message
    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": user_input + rules,  }
        ]
    )
    print(thread.id)
    return thread.id


def add_message_to_thread(thread_id, message):
    # Add a new message to the existing thread
    client.beta.threads.messages.create(
        thread_id=thread_id,

        role= "user",
        content= message + rules,

    )



# Print the latest message.


def get_response_from_thread(thread_id):
    run = client.beta.threads.runs.create(thread_id=thread_id, assistant_id=ASSISTANT_ID)
    print(f"👉 Run Created: {run.id}")
    while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)
        print(f"🏃 Run Status: {run.status}")
        time.sleep(1)
    else:
        print(f"🏁 Run Completed!")

# Get the latest message from the thread.
        message_response = client.beta.threads.messages.list(thread_id=thread_id)
        messages = message_response.data
        latest_message = messages[0]
        print(f"💬 Response: {latest_message.content[0].text.value}")
        return latest_message.content[0].text.value
    # Retrieve the latest messages from the thread



#a = create_new_thread("HI")
#add_message_to_thread(a, "Suggest me plan for five days in sylhet")
#get_response_from_thread(a)






@app.route('/danger', methods=['POST'])
def danger():
    # Extracting data from the query parameters
    danger = request.json.get('danger')


    # Appending the data to the 'danger' string
    danger_string = danger + danger_string
    print(danger_string)

    # Returning the modified string
    return danger_string






if __name__ == '__main__':
    app.run(debug=True)
