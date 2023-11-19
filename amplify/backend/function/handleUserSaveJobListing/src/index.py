##Associate User with a JobListing to complete Saved Job Process
    #Expected POST body format
        #"user_id": "str",
        #"job_id": "str"

##TODO
#Check to see if job_id and user_id currently exist. 


import json
import datetime
import boto3

#CONSTANTS
USERSAVEDLISTINGS_TABLE_NAME = "UserSavedListings"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(USERSAVEDLISTINGS_TABLE_NAME)


def handler(event, context):
    event = json.loads(event["body"])
    new_saved_listing_item = formatNewUserSavedListingEntry(event["user_id"], event["job_id"])

   #create new entry
    new_resume_profile_res = table.put_item(
        Item = new_saved_listing_item
    )

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }, 
        'body': f"job listing id: {new_saved_listing_item['job_id']} saved by user id: {new_saved_listing_item['user_id']}"
    }
    return response



##DEFAULT USERSAVEDLISTINGS ENTRY FORMAT
    # "user_id": "str, not-null", (partition key)
    # "job_id": "str, not-null", (sort-key)
    # "date_added": "str"

def formatNewUserSavedListingEntry(user_id, job_id):
    new_usersavedjob_entry = {}

    new_usersavedjob_entry["user_id"] = user_id
    new_usersavedjob_entry["job_id"] = job_id
    new_usersavedjob_entry["date_added"] = str(datetime.datetime.now())

    return new_usersavedjob_entry