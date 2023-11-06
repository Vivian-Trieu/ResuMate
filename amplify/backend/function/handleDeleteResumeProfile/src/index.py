##Deletes a given ResumeProfile entry and it's associated Resume stored in S3 Bucket
    #Expected POST body event Payload:
        #"user_id": "str" (partition key)
        #"upload_date": "str" (sort key)
        #"resume_id": "str" (optional (MUTUALLY EXCLUSIVE WITH: UPLOAD DATE))
    #When resume_id is specified, all resumeprofile instances with that resume_id will be deleted 
    #When primary key (partition + sort key) are specified, only the unique resume profile instance will be deleted 

import json
import boto3

#CONSTANTS
RESUMEPROFILE_TABLE_NAME = "ResumeProfiles"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(RESUMEPROFILE_TABLE_NAME)


def handler(event, context):
    event = json.loads(event["body"])
    primary_keys_of_deleted_entries = []
        
    #If upload_date specified
    #Delete singular specific profile using primary key => (user_id + upload_date) => (partition + sort key)
    if ("upload_date" in event):
        delete_response = table.delete_item(
            Key = {"user_id": event["user_id"], "upload_date": event["upload_date"]}
        )
        primary_keys_of_deleted_entries.append({"user_id": event["user_id"], "upload_date": event["upload_date"]})

    #If resume_id specified
    #Query and Filter for profile(s) that belong to said resume_id (standard attribute) within user_id (partition)
    elif ("resume_id" in event):
        query_params = {
            "KeyConditionExpression" : "#user_id = :user_id",
            "FilterExpression" : "#resume_id = :resume_id",
            "ExpressionAttributeNames": {"#user_id": "user_id", "#resume_id": "resume_id"},
            "ExpressionAttributeValues": {":user_id": event["user_id"], ":resume_id": event["resume_id"]},
        }
        query_response = table.query(**query_params)

        #use primary keys in response and delete directly
        for item in query_response["Items"]:
            delete_response = table.delete_item(
                Key = {"user_id": item["user_id"], "upload_date": item["upload_date"]}
            )
            primary_keys_of_deleted_entries.append({"user_id": item["user_id"], "upload_date": item["upload_date"]})

    #TODO: if neither above specified, two possibilities
        #return error, bad input
        #delete all resumeprofiles belonging to user_id
    else:
        print()


    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({
            "message": f"deleted {len(primary_keys_of_deleted_entries)} entries from ResumeProfiles table",
            'primarykeys_of_deleted': primary_keys_of_deleted_entries
        })
    }