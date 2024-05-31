const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const crypto = require('crypto');
const httpBuildQuery = require('http-build-query');
const url = require('url');
const htmlUtils = require('./htmlUtils.js');
const gateway = require('../../../paymentlambda/gateway.js').Gateway;
const assert = require('assert');

exports.handler = async (event, context) => {
    const getParams = url.parse(event.url, true).query;
    let body = '';
    global.times = 0;

    if (event.httpMethod !== 'POST') {
        body = htmlUtils.collectBrowserInfo(event);
        return sendResponse(body);
    } else {
        body = '';

        event.on('data', function(data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        event.on('end', function() {
            var post = qs.parse(body);

            if (anyKeyStartsWith(post, 'browserInfo[')) {
                let fields = getInitialFields('https://gateway.example.com/', '127.0.0.1');
                for ([k, v] of Object.entries(post)) {
                    fields[k.substr(12, k.length - 13)] = v;
                }

                gateway.directRequest(fields).then((response) => {
                    body = processResponseFields(response, gateway);
                    return sendResponse(body);
                }).catch((error) => {
                    console.error(error);
                });
            } else if (!anyKeyStartsWith(post, 'threeDSResponse[')) {
                let reqFields = {
                    action: 'SALE',
                    merchantID: getInitialFields(null, null).merchantID,
                    threeDSRef: global.threeDSRef,
                    threeDSResponse: '',
                };

                for ([k, v] of Object.entries(post)) {
                    reqFields.threeDSResponse += '[' + k + ']' + '__EQUAL__SIGN__' + v + '&';
                }

                reqFields.threeDSResponse = reqFields.threeDSResponse.substr(0, reqFields.threeDSResponse.length - 1);
                gateway.directRequest(reqFields).then((response) => {
                    body = processResponseFields(response, gateway);
                    return sendResponse(body);
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    }
};

function anyKeyStartsWith(haystack, needle) {
    for ([k, v] of Object.entries(haystack)) {
        if (k.startsWith(needle)) {
            return true;
        }
    }

    return false;
}

function processResponseFields(responseFields, gateway) {
    switch (responseFields["responseCode"]) {
        case "65802":
            global.threeDSRef = responseFields["threeDSRef"];
            return htmlUtils.showFrameForThreeDS(responseFields);
        case "0":
            return "<p>Thank you for your payment.</p>"
        default:
            return "<p>Failed to take payment: message=" + responseFields["responseMessage"] + " code=" + responseFields["responseCode"] + "</p>"
    }
}

function sendResponse(body) {
    return {
        statusCode: 200,
        body: JSON.stringify(body),
    };
}

function getInitialFields(pageURL, remoteAddress) {
    let uniqid = Math.random().toString(36).substr(2, 10)

    return {
        "merchantID": "100856",
        "action": "SALE",
        "type": 1,
        "transactionUnique": uniqid,
        "countryCode": 826,
        "currencyCode": 826,
        "amount": 1001,
        "cardNumber": "4012001037141112",
        "cardExpiryMonth": 12,
        "cardExpiryYear": 20,
        "cardCVV": "083",
        "customerName": "Test Customer",
        "customerEmail": "test@testcustomer.com",
        "customerAddress": "16 Test Street",
        "customerPostCode": "TE15 5ST",
        "orderRef": "Test purchase",
        "remoteAddress": remoteAddress,
        "merchantCategoryCode": 5411,
        "threeDSVersion": "2",
        "threeDSRedirectURL": pageURL + "&acs=1"
    }
}
