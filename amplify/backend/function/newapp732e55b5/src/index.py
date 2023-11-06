import json

def handler(event, context):
  print('received event:')
#   event = json.loads(event["body"])
#   event = event.body

#   assert_bingobongo = False
#   if ("bingobongo" in event):
#     assert_bingobongo = True


  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
      'body': json.dumps({
        "output_str": "hello this is a response coming from aws lambda (amplify)",
        "lambda_name": "newapp732e55b5_dev",
        "event": event,
        # "assert_bingobongo": event["bingobongo"]
      }),
  }