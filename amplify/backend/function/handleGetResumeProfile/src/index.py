##Get ResumeProfile data entry specified by the primary key (partition key + sort key)
    #Expected POST body payload:
        #"user_id": "str" (partition key)
        #"upload_date": "str" (sort key)

#Returns Resume Profile entry in json format

import json
import boto3

#CONSTANTS
RESUMEPROFILE_TABLE_NAME = "ResumeProfiles"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(RESUMEPROFILE_TABLE_NAME)


def handler(event, context):
    event = json.loads(event["body"])
    response = table.get_item(
        Key = {"user_id": event["user_id"], "upload_date": event["upload_date"]}
    )
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },        
        "body": json.dumps(response["Item"])
    }