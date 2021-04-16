from flask import Flask
from flask_pymongo import pymongo
#from server import app
CONNECTION_STRING = "mongodb+srv://mod7creative:RonSwanson123@cluster0.akymi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
# user_db = client.get_database('users')
# user_collection = pymongo.collection.Collection(user_db, 'users')
user_db = client.users
user_collection = user_db.users