##Returns a list of jobs most closely matched with input keyword string
    #Expected POST request body in JSON format:
        #"query" : "some string of keywords or other search parameters" 
#May return 0 results

import os
import json


from googleapiclient.discovery import build
from googleapiclient.errors import Error

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "igneous-tracer-401703-f52a40df0c10.json"
os.environ["GOOGLE_CLOUD_PROJECT"] = "igneous-tracer-401703"

client_service = build("jobs", "v3")



def handler(event, context):
    event = json.loads(event["body"])
    # company_name = "projects/igneous-tracer-401703/companies/88a5289e-1c35-478a-93c4-a83eee16140e"
    company_name = None #option to specify jobs within a specific company
    keywords = event["query"]
    parent = "projects/" + os.environ["GOOGLE_CLOUD_PROJECT"]

    #optional metadata specific to current user...
        #NOT CURRENTLY USED
    request_metadata = { 
        "user_id": "HashedUserId",
        "session_id": "HashedSessionId",
        "domain": "www.google.com",
    }

    job_query = {"query": keywords}
    
    if company_name is not None:
        job_query.update({"company_names": [company_name]})
    
    request = {
        "search_mode": "JOB_SEARCH",
        "request_metadata": request_metadata,
        "job_query": job_query,
    }
    response = (
        client_service.projects().jobs().search(parent=parent, body=request).execute()
    )

  
    # print(f"Search params: {keywords}")
    # if ('matchingJobs' in response):
    #     print(f"List of Jobs Matched {[match['job']['companyDisplayName'] for match in response['matchingJobs']]}")
    # else:
    #     print("No Matches")
    

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({
            'search_query': keywords,
            'length': len(response["matchingJobs"]) if 'matchingJobs' in response else 0,
            'matches': [match['job'] for match in response['matchingJobs']] if 'matchingJobs' in response else "No Matches"
        })
    }