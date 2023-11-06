##Store job listings in dynamoDB and Google Cloud Talent Solution for keyword retrieval
    #Expected Lambda Event Payload:
        #"jobs": [list of job objects from scrape]
##Invoked whenever new Jobs are scraped by API

#TODO: Add joblevel to GoogleAPI job upsert format


import os
import json
import boto3 

#CONSTANTS
JOB_LISTING_TABLE_NAME = "JobListings"

from googleapiclient.discovery import build
from googleapiclient.errors import Error

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "igneous-tracer-401703-f52a40df0c10.json"
#TODO: Store with AWS Secrets Manager or maybe S3?
#https://docs.aws.amazon.com/secretsmanager/latest/userguide/hardcoded.html
os.environ["GOOGLE_CLOUD_PROJECT"] = "igneous-tracer-401703"

def handler(event, context):
    list_of_jobs = event["jobs"]

#Put items in DynamoDB (only non-duplicates)
    non_dup_jobs_to_upsert = []
    for job_obj in list_of_jobs:
        entry_id, entry_is_dup = tryPutNoDups(job_obj)
        #Check if job was a duplicate 
        if (entry_is_dup == False):
            non_dup_jobs_to_upsert.append(job_obj)

#For the jobs that were upserted, prep those to send to GoogleAPI
    jobs_to_google = []
    for job_obj in non_dup_jobs_to_upsert:
        jobs_to_google.append(formatJobForGoogleAPI(job_obj))
    upsertJobsToGoogleAPI(jobs_to_google)


    return {
        'statusCode': 200,
        'body': json.dumps(f"Upserted {len(non_dup_jobs_to_upsert)} new jobs"),
        # 'test': os.listdir(),
    }


##Puts a job item inside dynamoDB table: JobListings 
    #only puts job if an entry with that job_id doesn't already exist
        #(job_id is determined by the "id" field from scraped job listing data)
#Returns a boolean if entry was duplicate or not
def tryPutNoDups(job_dict):
    # create a DynamoDB object using the AWS SDK
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(JOB_LISTING_TABLE_NAME)

    new_table_item = formatJobListing(job_dict)
    check_dups_expression = "attribute_not_exists(job_id)"
    try:
        response = table.put_item( #add new item to table
        Item = new_table_item,
        ConditionExpression = check_dups_expression
        )
        print()
    except dynamodb.meta.client.exceptions.ConditionalCheckFailedException as e:
    #if Job is a duplicate, return ID with duplicate boolean = True
        print(f"Cannot add scraped job entry {new_table_item['job_id']}: Duplicate Entry")
        return (new_table_item["job_id"], True)


    #otherwise, Job was successfully added and duplicate boolean = False
    return (new_table_item["job_id"], False)



##Handle input data and assign required/default keys to dictionary
    #With respect to JobListings' table in DynamoDB
#Returns formatted dictionary object 

#DEFAULT JOBLISTING ENTRY STRUCTURE
# {
#     "job_id" : "str, not_null", (partition/primary key)
#     "": ""
# }
def formatJobListing(dictionary_input_data):
    #Primary Key: job_id
    dictionary_input_data["job_id"] = str(dictionary_input_data.pop("id"))
    
    return dictionary_input_data



##Puts job item inside Google Cloud Talent Solutions
    #Automatically creates a new Company associated with the job if not exist
def upsertJobsToGoogleAPI(list_of_jobs_with_company):
    client_service = build("jobs", "v3")
    project_id = "projects/" + os.environ["GOOGLE_CLOUD_PROJECT"]

##Get List of companies resource names as prerequisite for next step
    #(In future, may be better to store company resource names in a database
    # alongside the "company:id" value that comes pre-packaged with the job scraping API.
    # That way we only need to reference one entry within the database that matches
    # the job's "company:id" to retrieve the correct company resource name.
    # Only reason not to do this is the overhead of setting up the database table
    existing_company_dicts = getListOfGoogleCompanies()
    print(f"existing companies before adding new jobs: {existing_company_dicts}")

##Do For each Job
    for job_dict, company_dict in list_of_jobs_with_company:
##CHECK FOR COMPANY "externalId" ALREADY EXISTS
        company_already_created = False
        company_resource_name = ""
        for company in existing_company_dicts:
            if (company["externalId"] == company_dict["externalId"]):
                print(f"external id matched: company already exist: {company['externalId']}")
                company_already_created = True
                company_resource_name = company["name"]
                break
        #add new company if not exist
        print(f"Adding JobReqID: {job_dict['requisitionId']}")
        print(f"Job Company: {company_dict['externalId']}: already exist? {company_already_created}")
        if (not company_already_created):
            new_company = createNewCompany(company_dict)
            print(new_company)
            company_resource_name = new_company["name"]
            existing_company_dicts.append(new_company)

        #add companyName to job_listing
        job_dict["companyName"] = company_resource_name

##UPSERT JOBLISTING TO GOOGLE
        try:
            request = {"job": job_dict}
            job_created = (
                client_service.projects()
                .jobs()
                .create(parent=project_id, body=request)
                .execute()
            )
            print("Job created: %s" % job_created.get("name"))
        except Error as e:
            print("Got exception while creating job")
            raise e


##Handle formatting of scraped job => googleJob

#Returns two objects
    #job_dict_for_google: the object to upsert to google
    #company_dict: object with keys about the company the job will be upserted to
def formatJobForGoogleAPI(job_dict):

##REASSIGN KEYS FOR GOOGLE CTS FORMATTING
    job_dict_for_google = {}
    #reformat job_id into requisitionID
    job_dict_for_google["requisitionId"] = job_dict["job_id"]
    #reformat name into job_title
    job_dict_for_google["title"] = job_dict["name"]
    #reformat contents into description
    job_dict_for_google["description"] = job_dict["contents"]
    #reformat locations into adddresses 
    locations = []
    for location in job_dict["locations"]:
        if (location["name"] == "Flexible / Remote"):
            job_dict_for_google["postingRegion"] = 3 #special case if Remote Work (Google won't be able to parse as an Address)
        else:
            locations.append(location["name"])

    job_dict_for_google["addresses"] = locations
    #define applicationInfo (required field)
    job_dict_for_google["applicationInfo"] = {"uris": job_dict["refs"]["landing_page"]}
    #define reformat publication_date into postingPublishTime (optional - otherwise automatically assigned)
    # job_dict_for_google["postingPublishTime"] = job_dict["publication_date"] 
    #reformat levels into jobLevel enum 
    # levels_name_map = {"Entry Level": 1, "Mid Level": 2, "Senior Level": 3, "management": 3, "Internship": 1}
    # job_dict_for_google["jobLevel"] = job_dict["levels"][0]["name"]


##DEFINE COMPANY THAT THE JOB WILL BELONG TO IN GOOGLE CTS
    company_dict = {}
    #externalId defines the unique ID associated with the company (defined by scraping API, but we assume they are using a unique ID for this field)
    company_dict["externalId"] = str(job_dict["company"]["id"])
    #companyDisplayName determines what the name of the company will look like
    company_dict["companyDisplayName"] = job_dict["company"]["name"]


    return job_dict_for_google, company_dict



##Returns list of dict objects (all companies listed under google CTS)
    #{externalId, name}
        #externalId corresponds to a unique ID associated with the company from job scrape API
        #name is the name of the resource for API interaction purposes
        #displayName is what the company is publically known as
def getListOfGoogleCompanies():
    client_service = build("jobs", "v3")
    project_id = "projects/" + os.environ["GOOGLE_CLOUD_PROJECT"]

    company_object_list = []
    try:
        response = (
            client_service.projects().companies().list(parent=project_id).execute()
        )
        # print("Request Id: %s" % response.get("metadata").get("requestId"))
        if response.get("companies") is not None:
            for company in response.get("companies"):
                company_object_list.append(
                    {
                        "externalId": company.get("externalId"),
                        "name": company.get("name"),
                        "displayName": company.get("displayName")
                    }
                )
    except Error as e:
        print("Got exception while listing companies")
        raise e
    
    return company_object_list



##Create a new company under Google CTS API
    #Called by upsertJobsToGoogleAPI when a company needs to be created such that a job (to be upserted) belongs to said company
#Returns company created object (include "name" attribute) for the purposes of retrieval and upserting new jobs under it
def createNewCompany(company_dict):
    client_service = build("jobs", "v3")
    project_id = "projects/" + os.environ["GOOGLE_CLOUD_PROJECT"]
    
    try:
        request = {
            "company": {
                "displayName": company_dict["companyDisplayName"],
                "externalId": str(company_dict["externalId"])
            }
        }
        company_created = (
            client_service.projects()
            .companies()
            .create(parent=project_id, body=request)
            .execute()
        )
        #getting relevant fields, rest of them we don't really care about
        company_created_parsed = {}
        company_created_parsed["name"] = company_created["name"]
        company_created_parsed["externalId"] = company_created["externalId"]
        company_created_parsed["displayName"] = company_created["displayName"]
    except Error as e:
        print("Got exception while creating company")
        raise e

    return company_created_parsed


