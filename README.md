# Serverless-mailer
> AWS Serverless mailing function

This function is for contact form and mailing function for static website.

## Getting started
### Install Serverless Framework
Install serverless globally
````
npm install serverless -g
````

### Clone project to local folder
```
git clone git@github.com:AndyJPG/serverless-mailer.git folder-name
```

### Install all the dependencies

Once it is finished, we need to navigate to the folder and install all the dependencies in package.json file for the serverless application.

Dependencies include:
> "aws-sdk"

````
npm install
````

### Create an IAM User and Access Key
Next step we need to sign up for an AWS account or log in if you have one.

Then we need to create an IAM User and Access Key. You can follow the step of following link to complete the step.

Step of creating IAM user and Access key: 
https://serverless.com/framework/docs/providers/aws/guide/credentials/#create-an-iam-user-and-access-key

or

Video walk-through of creating IAM user and Access Key: https://www.youtube.com/watch?v=KngM5bfpttA
> Remember: you will need to save your “Access key ID” and “Secret access key” for your serverless framework, 
>and also save them properly, don't reveal to anyone.

On the confirmation screen shows the user “Access key ID” and “Secret access key”, 
you’ll need these to provide the Serverless Framework with access.

In your CLI, type
````
npm sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_ACCESS_KEY
````
replacing `YOUR_ACCESS_KEY_ID` and `YOUR_SECRET_ACCESS_KEY` with your own keys.

### Verify email
Follow the step to verify the email address that you want to receive emails.

Verify email step link: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html

### Modify code
Go to handler.js file in the project.
Change following code:
````
const RECEIVER = 'your_email@example.com';
const SENDER = 'your_email@example.com';
````
replace `your_email@example.com` with your verified email.

Until now, you should be about to test the function. You can test the function locally with following commend.
````
sls invoke local --function soezySiteMailer --path testData.json
````
It uses the data from `testData.json` file to test function.

When it success, you will be able to receive the email with your verified email address.
You will also see the following message in the CLI:
````
Received event:  {
  email: 'sender_email@example.com',
  firstName: 'John',
  lastName: 'Wick',
  phone: '0499999999',
  content: 'hello there'
}
{
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    "body": {
        "message": {
            "ResponseMetadata": {
                "RequestId": "fc0eddba-1db1-4c25-9375-f16ada0ec61d"
            },
            "MessageId": "0108016fc14182c4-23a2c5a9-96af-4aa4-92ce-26975cd2172a-000000"
        }
    }
}
````
> ERROR: If the email fails to send, check your email if it is correct or verified.
> Also make sure the region of verified email is same as the region in `serverless.yml` file
> under the provider.

### Before deploy
Last step before deploy lambda function.

You will need to go to `handler.js`, and in the headers where
````
'Access-Control-Allow-Origin' : '*'
````
replace `*` with your own domain. This will prevent any other domains from using your service.

### Deploy to AWS
To deploy it run `sls deploy -v`.
Once it's deployed you'll get a endpoint URL in the console that looks like
````
https://r4nd0mh45h.execute-api.us-east-1.amazonaws.com/dev/soezy-site-mailer
````
which you can add to the contact form action.

### In Soezy
Go to `Signup_data.js` and replace `url` with the url you get from deploy your application.
