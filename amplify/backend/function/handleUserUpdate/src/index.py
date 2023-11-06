##Update existing User attributes 
    #Expected POST request body payload:
        #"user_id": "str", (user to update)
        #"update_attributes": {dict of key/vals}
    #Returns updated Users item

import json
import boto3

#CONSTANTS
USERS_TABLE_NAME = "Users"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(USERS_TABLE_NAME)

def handler(event, context):
    event = json.loads(event["body"])
#Ensure format of updated attributes are correct before sending to DB table
    updated_attributes_dict = formatExistingUser(event["update_attributes"])
    
#Update given user of user_id with changed attributes
    #Format parameters
    update_expr_substr_list = []
    expr_attr_names = {}
    expr_attr_vals = {}
    for attr_key in updated_attributes_dict:
        update_expr_substr_list.append(f"#{attr_key} = :{attr_key}")
        expr_attr_names[f"#{attr_key}"] = attr_key
        expr_attr_vals[f":{attr_key}"] = updated_attributes_dict[attr_key]
    
    update_params = {
        "Key": {"user_id": event["user_id"]},
        "UpdateExpression": "SET " + ", ".join(update_expr_substr_list), #setting attributes to new values
        "ExpressionAttributeNames": expr_attr_names,
        "ExpressionAttributeValues": expr_attr_vals,
        "ReturnValues": "ALL_NEW"
    }

    updated_user_response = table.update_item(**update_params)
    
    if ("password" in updated_user_response["Attributes"]):
        del(updated_user_response["Attributes"]["password"]) #Don't send password back as part of response from update 
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },         
        "body": json.dumps({
            'updated_item': updated_user_response["Attributes"],
            'password_updated': True if ("password" in event["update_attributes"]) else False
        })    
    }
    
    
    

##Handle input data and assign required/default keys to dictionary
    #With respect to Users table in DynamoDB
#Returns a formatted dictionary object

import uuid
import hashlib

#DEFAULT USER ENTRY STRUCTURE
# {
#     "user_id" : "str, not_null", (partition/primary key)
#     "username": "str, not_null",
#     "password": "binary, not_null (hashed value)"
#     "":""
# }


def formatExistingUser(dictionary_input_data):
    formatted_user_entry = {}
    
    #Partition Key: user_id
        #do not allow changing of user_id
    if ("user_id" in dictionary_input_data):
        ##TODO Raise invalid input error
        del(dictionary_input_data["user_id"])
    
    #Attribute: password
    if ("password" in dictionary_input_data):
        dictionary_input_data["password"] = hashlib.sha256(dictionary_input_data["password"].encode()).digest() #raw byte data
    
    formatted_user_entry = dictionary_input_data
    return formatted_user_entry
