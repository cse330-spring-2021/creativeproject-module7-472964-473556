from flask import Flask, jsonify, request
from flask_pymongo import PyMongo 
import db
from flask_bcrypt import Bcrypt
from bson.json_util import dumps, loads

app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# handles new account user data 
@app.route('/register', methods=['POST'])
def handle_new_user():
    username = request.json['username'] 
    password = request.json['password']
    pw_hash = bcrypt.generate_password_hash(password)

    query = db.user_collection.find({"username": username}).count()
    
    if(query == 1):
        loginInfo = { 
            'success': False
            }  
        return jsonify(loginInfo) 
    loginInfo = { 
        'username': username,
        'success': True
    }  

    db.user_collection.insert({"username": username, "password": pw_hash, "mood": [], "symptoms": [], "stress": [], "sleep" : [], "score" : []})
    return jsonify(loginInfo)

# handles existing user data 
@app.route('/login', methods=["POST"])
def handle_login():
    username = request.json['username'] 
    password = request.json['password']

    query1 = db.user_collection.find_one({"username": username})

    if(query1):
        check_pw = bcrypt.check_password_hash(query1["password"], password) # returns True
        if query1["username"] == username and check_pw:
            loginInfo = {
                'username': username,
                'success': True
            }
            return(jsonify(loginInfo))

    loginInfo = {
    'success': False
    }
    return jsonify(loginInfo)

# handles data from survey
@app.route('/form', methods=["POST"])
def handle_submit_form():
    mood = request.json['mood'] 
    symptoms = request.json['symptomsCount']
    stress = request.json['stress']
    sleep = request.json['sleep']
    username = request.json['username']
    score = request.json['score']

    print(mood, symptoms, stress, sleep, username, score)


    resp1 = db.user_collection.update(
        { "username": username },
        { '$push': { "mood": mood}}
    )

    resp2 = db.user_collection.update(
        { "username": username },
        { '$push': { "symptoms": symptoms}}
    )

    resp3 = db.user_collection.update(
        { "username": username },
        { '$push': { "stress": stress}}
    )

    resp4 = db.user_collection.update(
        { "username": username },
        { '$push': { "sleep": sleep}}
    )

    resp5 = db.user_collection.update(
        { "username": username },
        { '$push': { "score": score}}
    )



    if resp1["nModified"] == 1 and resp2["nModified"] == 1 and resp3["nModified"] == 1 and resp4["nModified"] == 1 and resp5["nModified"] == 1:
        submitInfo = {
            'success': True
        }
        return jsonify(submitInfo)
    
    submitInfo = {
        'success': False
    }
    return jsonify(submitInfo)

# gets data from survey
@app.route('/get_data', methods=["POST"])
def handle_chart_data():
    username = request.json['username']
    query1 = db.user_collection.find({"username": username})

    if query1:
        json_data = dumps(query1) 
        return json_data
    
    getInfo = {
        'success': False
    }
    return jsonify(getInfo)