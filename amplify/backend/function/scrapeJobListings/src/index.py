import random
import requests
import boto3
import json

final_categories = ['Accounting', 'Accounting and Finance', 'Account Management', 'Account Management/Customer Success', 'Administration and Office', 'Advertising and Marketing', 'Animal Care', 'Arts', 'Business Operations', 'Cleaning and Facilities', 'Computer and ITConstruction', 'Corporate', 'Customer Service', 'Data and Analytics', 'Data Science', 'Design', 'Design and UXEditor', 'Education', 'Energy Generation and Mining', 'Entertainment and Travel Services', 'Farming and Outdoors', 'Food and Hospitality Services', 'Healthcare', 'HR', 'Human Resources and Recruitment', 'Installation, Maintenance, and Repairs', 'IT', 'Law', 'Legal Services', 'Management', 'Manufacturing and Warehouse', 'Marketing', 'Mechanic', 'Media, PR, and Communications', 'Mental Health', 'Nurses', 'Office Administration', 'Personal Care and Services', 'Physical Assistant', 'Product', 'Product Management', 'Project Management', 'Protective Services', 'Public Relations', 'Real Estate', 'Recruiting', 'Retail', 'Sales', 'Science and Engineering', 'Social Services', 'Software Engineer', 'Software Engineering', 'Sports, Fitness, and Recreation', 'Transportation and Logistics', 'Unknown', 'UXVideography', 'Writer']

def scrape():
##Pick two categories to search for at random
    two_categories = [final_categories.pop(random.randint(0, len(final_categories)-1)), final_categories.pop(random.randint(0, len(final_categories)-1))]
    print(two_categories)

    category_param = "&category=".join(two_categories)

##One request to look for remote jobs, one for jobs with locations
    headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"}
    api_request_str = f"https://www.themuse.com/api/public/jobs?category={category_param}&page=1"
    api_request_str_remote = f"https://www.themuse.com/api/public/jobs?category={category_param}&location=Flexible/Remote&page=1"
    print(api_request_str + "\n" + api_request_str_remote)

    jobs = [] 

    generic_jobs_data = requests.get(api_request_str, headers=headers)
    jobs.extend(generic_jobs_data.json()["results"])

    remote_jobs_data = requests.get(api_request_str_remote, headers=headers)
    jobs.extend(remote_jobs_data.json()["results"])

    #for testing purposes
    # print(generic_jobs_data.json()["results"][0]["id"])
    # pretty_data = json.dumps(us_jobs_data.json()["results"], indent=4)
    # job_file = open("src\event2.json", "w") #(use this as test input event on handleStoringScrapedJobs function)
    # job_file.write(pretty_data)
    # print(pretty_data)
    
    # pretty_data = json.dumps(jobs_payload, indent=4)
    # job_file = open("src\event3.json", "w") #(use this as test input event on handleStoringScrapedJobs function)
    # job_file.write(pretty_data)

    lambda_client = boto3.client("lambda")
    
    jobs_payload = {}
    jobs_payload["jobs"] = jobs

    response = lambda_client.invoke(
        FunctionName = "arn:aws:lambda:us-west-1:319163603467:function:handleStoringScrapedJobs-dev",
        InvocationType = "RequestResponse",
        Payload = json.dumps(jobs_payload, indent=4)
    )

    print(f"response from invoked function {response['Payload'].read()}")
    
def handler(event, context):
    scrape()
    return {
        'statusCode': 200,
        'body': json.dumps(f'scrape function works'),
    }
    