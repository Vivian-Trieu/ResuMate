import json

def handler(event, context):
    print(event)
    user_id = event['pathParameters']['userId']
    user = {'userId': user_id, 'userName': "User " + user_id}

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(user)
    }
    return response