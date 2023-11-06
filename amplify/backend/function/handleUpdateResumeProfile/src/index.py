##Update attributes of resume profile
    #Expected POST body payload:
        #"user_id": "str" (partition key)
        #"upload_date": "str" (sort key)
        #"update_attributes": {dict} (key-val of attributes to modify)
        #"new_attributes": {dict} (key-val of new attributes to add to entry)

#Returns Resume Profile entry in json format after update effects

import json
import boto3

#CONSTANTS
RESUMEPROFILE_TABLE_NAME = "ResumeProfiles"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(RESUMEPROFILE_TABLE_NAME)


def handler(event, context):
    event = json.loads(event["body"])
#Ensure format of updated attributes are correct before sending to DB table
    updated_attributes_dict = formatExistingResProfile(event["update_attributes"])
    
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
        "Key": {"user_id": event["user_id"], "upload_date": event["upload_date"]},
        "UpdateExpression": "SET " + ", ".join(update_expr_substr_list), #setting attributes to new values
        "ExpressionAttributeNames": expr_attr_names,
        "ExpressionAttributeValues": expr_attr_vals,
        "ReturnValues": "ALL_NEW"
    }

    updated_resume_prof_response = table.update_item(**update_params)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },  
        "body": json.dumps({
            'updated_item': updated_resume_prof_response["Attributes"]
        })        
    }
    
    
    
##Handle input data and assign required/default keys to dictionary
    #With respect to ResumeProfile table in DynamoDB
#Returns a formatted dictionary object


#DEFAULT RESUMEPROFILE ENTRY STRUCTURE
# {
#     "user_id" : "str, not_null", (partition key)
#     "upload_date": "str, not_null", (sort key)
#     "":""
# }


def formatExistingResProfile(dictionary_input_data):
    formatted_resprofile_entry = {}
    
    #Partition Key: user_id
        #do not allow changing of user_id
    if ("user_id" in dictionary_input_data):
        ##TODO Raise invalid input error
        del(dictionary_input_data["user_id"])
    
    #Sort Key: upload_date
        #do not allow changing of upload date
    if ("upload_date" in dictionary_input_data):
        ##TODO Raise invalid input error
        del(dictionary_input_data["upload_date"])


    formatted_resprofile_entry = dictionary_input_data
    return formatted_resprofile_entry
