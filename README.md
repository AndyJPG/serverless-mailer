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
sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_ACCESS_KEY
````
replacing `YOUR_ACCESS_KEY_ID` and `YOUR_SECRET_ACCESS_KEY` with your own keys.

### Verify email
Follow the step to verify the email address that you want to receive emails.

Verify email step link: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html

### Test function

Until now, you should be able to test the function. You can test the function locally with following commend.
````
sls invoke local -f soezySiteMailer --region your_email_region --email your_email@example.com --allowOrigin your_domain.com --path testData.json
````
It uses the data from `testData.json` file to test function.
Replace `your_email_region` with your verified email region, and the default region is `ap-southeast-2`.
Replace `your_email@example.com` with your own verified email, and replace `your_domain.com` with your own domain.

You can also test function without give it a domain like the following command.
````
sls invoke local -f soezySiteMailer --region your_email_region --email your_email@example.com --path testData.json
````
It will use default variable for origin access control, which is any origin or sources.
> NOTE: It is OK for testing, but you need to give it a origin to prevent
>any other domains from using your service when you deploy it.

When it is success, you will be able to receive the email with your verified email address.
You will also see the following message in the console:
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
> ERROR: If the email failed to send, check your email to see if it is correct or verified.
> Also make sure the region of the verified email is the same as the region you provided.

### Deploy to AWS
To deploy it run following command in the CLI.
````
sls deploy --region your_email_region --email your_email@example.com --allowOrigin your_domain.com
````
Same as testing, replace `your_email_region`, `your_email@example.com` and `your_domain.com` with your own information.

Once it's deployed you'll get a endpoint URL in the console that looks like
````
https://r4nd0mh45h.execute-api.us-east-1.amazonaws.com/dev/soezy-site-mailer
````
which you can add to the contact form action.

### For Soezy website
Go to `Signup_data.js` file and replace `url` with the url you get from deploy your application.
