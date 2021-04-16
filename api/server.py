from flask import Flask, jsonify, request
from flask_pymongo import PyMongo 
import db
from flask_bcrypt import Bcrypt

#https://exploreflask.com/en/latest/forms.html
app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/register', methods=['POST'])
def handle_new_user():
    username = request.json['username'] 
    password = request.json['password']
    pw_hash = bcrypt.generate_password_hash(password)
    # bcrypt.check_password_hash(pw_hash, 'hunter2') # returns True

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
    db.user_collection.insert({"username": username, "password": pw_hash})
    return jsonify(loginInfo)

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
