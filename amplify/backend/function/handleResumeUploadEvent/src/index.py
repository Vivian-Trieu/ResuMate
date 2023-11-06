##Build a resume profile for a new resume uploaded to "userresumes" S3 Bucket 
    #Expected POST request body payload:
        #"resume_id": "str", (identify location of resume to be parsed by AI)
        #"user_id": "str" (user in possession of the resume)
    #Returns ResumeProfile item 
    
#NOTES: 
    #To upload files to "userresumes" S3 bucket, do not use Lambda service
    #Should be called after uploading file to S3 bucket. Ensure upload was successful BEFORE calling this function

#TODO:
#Add machine learning modules to parse user resume
#Define additional keys for Resume Profile that will be filled in my ML inferencing step  

import json
import boto3

#CONSTANTS
RESUMEPROF_TABLE_NAME = "ResumeProfiles"

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(RESUMEPROF_TABLE_NAME)


def handler(event, context):
    event = json.loads(event["body"])
#Get and parse file from S3 bucket "userresumes"

#Resume=>Machine Learning Inference step
    inferenced_data = {}


#Use inference data to build new ResumeProfile item for user
    #format default attributes
        #if exists, use most recent ResumeProfile item (belonging to user) as a base template
    formatted_resume_profile_item = formatResProfileItem(event["user_id"], event["resume_id"], inferenced_data)
    
    #create new entry
        #associating 
    new_resume_profile_res = table.put_item(
        Item = formatted_resume_profile_item
    )

    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },    
        'body': json.dumps({
            'resume_profile_data': formatted_resume_profile_item
        }),
    }




#DEFAULT RESUMEPROFILES ENTRY STRUCTURE
# {
#     "user_id" : "str, not_null", (partition key)
#     "upload_date": "str, not_null", (sort key)
#     "resume_id": "str, not_null"
#     "":"" (various named entity keys based on ML parsing)
# }
import datetime

def formatResProfileItem(user_id, resume_id, resume_after_ML):
    formatted_resume_profile = resume_after_ML

    formatted_resume_profile["user_id"] = user_id
    formatted_resume_profile["upload_date"] = str(datetime.datetime.now())
    print(formatted_resume_profile["upload_date"])

    formatted_resume_profile["resume_id"] = resume_id

    
    return formatted_resume_profile