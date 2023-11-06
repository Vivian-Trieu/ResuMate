##User views collection of saved Job Listings => Get JobListings from UserSavedListings
    #Expected POST body Payload:
        #"user_id": "str" (partition key)
#Returns a list of JobListing entries

import boto3
import json
from dynamodb_json import json_util as ddb_json



#CONSTANTS
USERSAVEDLISTINGS_TABLE_NAME = "UserSavedListings"
JOBLISTINGS_TABLE_NAME = "JobListings"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
users_listings_table = dynamodb.Table(USERSAVEDLISTINGS_TABLE_NAME)
job_listings_table = dynamodb.Table(JOBLISTINGS_TABLE_NAME)


def handler(event, context):
    event = json.loads(event["body"])
#Get list of "job_id" stored under partition key "user_id" of table UserSavedListings
    job_listing_ids = []
    query_params = {
        "KeyConditionExpression" : "#user_id = :user_id",
        # "FilterExpression" :
        "ExpressionAttributeNames": {"#user_id": "user_id"},
        "ExpressionAttributeValues": {":user_id": event["user_id"]},
    }
    query_response = users_listings_table.query(**query_params)
    print(f"query job listing ids response {query_response}")

    #gather list of job ids from response
    for saved_listing in query_response["Items"]:
        job_listing_ids.append(saved_listing["job_id"])


#Use "job_id" keys to get listing details from table JobListings
    job_listing_data = []
    for job_id in job_listing_ids:
        job_listing = job_listings_table.get_item(
            Key = {"job_id": job_id}
        )
        print(job_listing)
        #parse "Decimal" type data which is annoying and cant be json seralized
        parsed_job_listing = ddb_json.loads(job_listing["Item"])
        job_listing_data.append(parsed_job_listing)


    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },   
        "body": json.dumps({
            'job_listings': job_listing_data
        })         
    }
