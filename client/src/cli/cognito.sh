# ---- example data ----

poolId=ap-south-1_rSmTWsYuY
lambda_arn=arn:aws:lambda:ap-south-1:232243816662:function:lakeside-server-dev-lakeside-cognito-rediect
kms_key_id=arn:aws:kms:ap-south-1:232243816662:key/e49ccee9-f86f-4e54-99b3-ddf98a5354b7

# email funtion = custome-email-trigger-dev-customEmailSender
# sms funtion = custome-email-trigger-dev-customizeMSG
# modify default cognito msg = custome-email-trigger-dev-customizeMSG

# ---- cli comments ----

# grant permision
aws lambda add-permission --function-name arn:aws:lambda:ap-south-1:232243816662:function:lakeside-server-dev-lakeside-cognito-rediect --statement-id "CognitoLambdaInvokeAccess" --action lambda:InvokeFunction --principal cognito-idp.amazonaws.com

# remove permision
aws lambda remove-permission --function-name arn:aws:lambda:ap-south-1:232243816662:function:lakeside-server-dev-lakeside-cognito-rediect --statement-id "CognitoLambdaInvokeAccess"

# update cognito user pool
aws cognito-idp update-user-pool --user-pool-id ap-south-1_rSmTWsYuY --lambda-config "CustomEmailSender={LambdaVersion=V1_0,LambdaArn=arn:aws:lambda:ap-south-1:232243816662:function:lakeside-server-dev-lakeside-cognito-rediect},KMSKeyID=arn:aws:kms:ap-south-1:232243816662:key/e49ccee9-f86f-4e54-99b3-ddf98a5354b7"
#  --auto-verified-attributes email

# remove update cognito user pool
aws cognito-idp update-user-pool --user-pool-id ap-south-1_rSmTWsYuY --lambda-config "{}"

