##User removes/unsaves a joblisting => Deletes a given UserSavedListings entry 
    #Expected POST body Payload:
        #"user_id": "str" (partition key)
        #"job_id": "str" (sort key)
#Can accept a list of entries to unsave
    #Expected POST body Payload:
        #"entries": [list of singleton events] 

import json
import boto3

#CONSTANTS
USERSAVEDLISTINGS_TABLE_NAME = "UserSavedListings"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(USERSAVEDLISTINGS_TABLE_NAME)


def handler(event, context):
    event = json.loads(event["body"])
    entries_deleted = 0
    if ("entries" in event):
        entries_to_delete = event["entries"]
        for entry in entries_to_delete:
            delete_response = table.delete_item(
                Key = {"user_id": entry["user_id"], "job_id": entry["job_id"]}
            ) 
            entries_deleted += 1

    else:
        delete_response = table.delete_item(
            Key = {"user_id": event["user_id"], "job_id": event["job_id"]}
        )   
        entries_deleted += 1

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }, 
        'body': f"deleted {entries_deleted} entries from UserSavedListings table"
    }