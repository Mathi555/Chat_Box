from flask import Flask, request, jsonify
import json
import time
from flask_cors import CORS
from fuzzywuzzy import process
from googlesearch import search

app = Flask(__name__)
CORS(app)

# Load keywords and responses from responses.json
with open('responses.json', encoding='utf-8') as f:  # Specify encoding explicitly
    responses_data = json.load(f)

def find_similar_keyword(keyword):
    # Create a list of keywords from the responses data
    keywords = list(responses_data.keys())
    # Use fuzzy matching to find the closest match to the input keyword
    closest_match, score = process.extractOne(keyword, keywords)
    # If the score is below a certain threshold, consider it as not found
    if score < 60:  # You can adjust this threshold as per your needs
        return None
    return closest_match

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('user_input', '').lower()

    if user_input == "quit":
        return jsonify({'response': 'Thank you for chatting!'})

    elif user_input in responses_data:
        response = responses_data[user_input]
        
        # Fetch Google search links
        google_links = search_google(user_input)
        
        return jsonify({'response': response, 'google_links': google_links})

    else:
        # Check if there's a fuzzy match in the responses_data
        similar_keyword = find_similar_keyword(user_input)
        if similar_keyword:
            response = responses_data[similar_keyword]
            
            # Fetch Google search links
            google_links = search_google(user_input)
            
            return jsonify({'response': response, 'google_links': google_links})
        else:
            response = f"I'm still learning, but here's a response for: {user_input}"
            return jsonify({'response': response})

def search_google(query):
    try:
        # Adding a delay to avoid making too many requests too quickly
        time.sleep(1)
        return list(search(query, num=5, stop=5, pause=1))
    except Exception as e:
        print(f"Error fetching Google search results: {e}")
        return []

if __name__ == '__main__':
    app.run(debug=True)













# from flask import Flask, request, jsonify
# import json
# import time
# from flask_cors import CORS
# from fuzzywuzzy import process
# from googlesearch import search

# app = Flask(__name__)
# CORS(app)

# # Load keywords and responses from responses.json
# with open('responses.json') as f:
#     responses_data = json.load(f)

# def find_similar_keyword(keyword):
#     # Create a list of keywords from the responses data
#     keywords = list(responses_data.keys())
#     # Use fuzzy matching to find the closest match to the input keyword
#     closest_match, score = process.extractOne(keyword, keywords)
#     # If the score is below a certain threshold, consider it as not found
#     if score < 60:  # You can adjust this threshold as per your needs
#         return None
#     return closest_match

# @app.route('/api/chat', methods=['POST'])
# def chat():
#     user_input = request.json.get('user_input', '').lower()

#     if user_input == "quit":
#         return jsonify({'response': 'Thank you for chatting!'})

#     elif user_input in responses_data:
#         response = responses_data[user_input]
        
#         # Fetch Google search links
#         google_links = search_google(user_input)
        
#         return jsonify({'response': response, 'google_links': google_links})

#     else:
#         # Check if there's a fuzzy match in the responses_data
#         similar_keyword = find_similar_keyword(user_input)
#         if similar_keyword:
#             response = responses_data[similar_keyword]
            
#             # Fetch Google search links
#             google_links = search_google(user_input)
            
#             return jsonify({'response': response, 'google_links': google_links})
#         else:
#             response = f"I'm still learning, but here's a response for: {user_input}"
#             return jsonify({'response': response})

# def search_google(query):
#     try:
#         # Adding a delay to avoid making too many requests too quickly
#         time.sleep(1)
#         return list(search(query, num=5, stop=5, pause=1))
#     except Exception as e:
#         print(f"Error fetching Google search results: {e}")
#         return []

# if __name__ == '__main__':
#     app.run(debug=True)






# Below code is without link code 

# from flask import Flask, request, jsonify
# import json
# import os
# import time
# from flask_cors import CORS
# from fuzzywuzzy import process

# def preprocess_input(input_str):
#     # Replace spaces with underscores in the input string
#     processed_input = input_str.replace(' ', '_')
#     return processed_input

# app = Flask(__name__)
# CORS(app)

# # Load keywords and responses from responses.json
# with open('responses.json') as f:
#     responses_data = json.load(f)

# def print_with_typing_effect(text, delay=1):
#     for char in text:
#         print(char, end='', flush=True)
#         time.sleep(delay)
#     print()

# def find_similar_keyword(keyword):
#     # Create a list of keywords from the responses data
#     keywords = list(responses_data.keys())
#     # Use fuzzy matching to find the closest match to the input keyword
#     closest_match, score = process.extractOne(keyword, keywords)
#     # If the score is below a certain threshold, consider it as not found
#     if score < 60:  # You can adjust this threshold as per your needs
#         return None
#     return closest_match

# @app.route('/api/chat', methods=['POST'])
# def chat():
#     user_input = request.json.get('user_input', '').lower()

#     if user_input == "quit":
#         return jsonify({'response': 'Thank you for chatting!'})

#     elif user_input in responses_data:
#         response = responses_data[user_input]
#         return jsonify({'response': response})

#     else:
#         # Check if there's a fuzzy match in the responses_data
#         similar_keyword = find_similar_keyword(user_input)
#         if similar_keyword:
#             response = responses_data[similar_keyword]
#             return jsonify({'response': response})
#         else:
#             response = f"I'm still learning, but here's a response for: {user_input}"
#             return jsonify({'response': response})

# if __name__ == '__main__':
#     app.run(debug=True)
