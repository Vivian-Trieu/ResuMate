##Return Users entry matching to given username and password
    #Expected POST request body payload:
        #"username": "str",
        #"password": "str"
    #Returns 401 status if no match is found

import json
import boto3 
import hashlib

#CONSTANTS
USERS_TABLE_NAME = "Users"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(USERS_TABLE_NAME)

def handler(event, context):
    event = json.loads(event["body"])
#Scan for table entry with matching attributes
    #hash input_password
    input_password_hash = hashlib.sha256(event["password"].encode()).digest()

    table_scan_parameters = {
        # "ProjectionExpression": "user_id",
        "FilterExpression": "#username = :input_uname and #password = :input_pword_hash",
        "ExpressionAttributeNames":  {
            "#username" : "username",
            "#password" : "password"
        },
        "ExpressionAttributeValues": {
            ':input_uname' : event["username"],
            ":input_pword_hash" : input_password_hash
        }
    }
    
    while(True):
        response = table.scan(**table_scan_parameters)
        
        if (response["Count"] > 0): #match found
            break
        elif ("LastEvaluatedKey" in response): #table scan not fully completed
            table_scan_parameters["ExclusiveStartKey"] = response["LastEvaluatedKey"]
        else: #scan table finished with no item matches in Users
            return {
                'statusCode': 401,
                'body': "User Login Failed; Invalid Credentials"
            }
    
#Parse out password from response (it is all in bytes anyway and is annoying to return as JSON)
    del(response["Items"][0]["password"])
    
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },         
        'body': response 
    }
