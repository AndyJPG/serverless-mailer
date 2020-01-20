'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

const RECEIVER = 'jiangpeigeng@gmail.com';
const SENDER = 'jiangpeigeng@gmail.com';

function sendEmail(formData, callback) {
    const emailParams = {
        Source: SENDER,
        ReplyToAddresses: [formData.email],
        Destination: {
            ToAddresses: [RECEIVER],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `${formData.content}\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nContact Number: ${formData.phone}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New message from soezy',
            },
        },
    };

    SES.sendEmail(emailParams, callback);
}

module.exports.soezySiteMailer = (event, context, callback) => {
    const formatData = JSON.parse(event.body);
    console.log('Received event: ', formatData);

    sendEmail(formatData, function (err, data) {
        const response = {
            statusCode: err ? 500 : 200,
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin' : '*',
            },
            body: JSON.stringify({
                message: err ? err.message : data,
            }),
        };

        callback(null, response);
    })
};