##Register new username and password into database
    #Expected POST body payload:
        #"username": ""
        #"password" : ""
    #Returns unique user_id associated with the account

import json
import boto3 

#CONSTANTS
USERS_TABLE_NAME = "Users"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(USERS_TABLE_NAME)

def handler(event, context):
    event = json.loads(event["body"])
#Format new user with default attributes
    new_user_id, new_user_object = formatNewUser(**event)
    
#ensure no duplicate users with same username and password
    table_scan_parameters = {
        "ProjectionExpression": "user_id",
        "FilterExpression": "#username = :existing_uname and #password = :existing_pword",
        "ExpressionAttributeNames":  {
            "#username" : "username",
            "#password" : "password"
        },
        "ExpressionAttributeValues": {
            ':existing_uname' : new_user_object["username"],
            ":existing_pword" : new_user_object["password"]
        }
    }
    while(True): #Do until scanned entire table OR found a match
        check_user_exist_response = table.scan(**table_scan_parameters)
        
        if(check_user_exist_response["Count"] > 0): #duplicate user
            return {
                'statusCode': 400,
                'body': json.dumps('Attempting to register user with already existing Username & Password combination')
            }
        elif("LastEvaluatedKey" in check_user_exist_response): #more of table remains to be scanned for duplicates
            table_scan_parameters["ExclusiveStartKey"] = check_user_exist_response["LastEvaluatedKey"]
            continue
        else: #no duplicate users found after scanning whole table
            break

#create new user entry in Users DB
    response = table.put_item( #add new item to table
        Item = new_user_object
    )
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },        
        'body': json.dumps({
            "message": 'Successfuly added new user to Users Table:',
            'user_id': new_user_id,
            'db_response': response,
        }),
    }



##DEFAULT USER ENTRY STRUCTURE
# {
#     "user_id": "str, not_null", (primary key)
#     "username": "str, not_null",
#     "password": "binary, not_null", (hashed value)
#     "": "",
# }



import uuid
import hashlib

def formatNewUser(**event_kwords):
    user_entry = event_kwords 
    
    #Generate unique ID for this new user
    user_entry["user_id"] = str(uuid.uuid4())
    
    #Hash user password 
    user_entry["password"] = hashlib.sha256(event_kwords["password"].encode()).digest()
    
    
    return user_entry["user_id"], user_entry