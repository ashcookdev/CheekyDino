const { Gateway } = require("./gateway.js");

exports.handler = async (event) => {
    // Sample code environment variables.
    const MERCHANT_ID = process.env.MERCHANT_ID;
    const MERCHANT_SECRET = process.env.MERCHANT_SECRET;
    const GATEWAY_URL = process.env.GATEWAY_URL;

    // The hosted form Url for the SDK can be set via the hostedUrl property 
    // or passed as the field redirectUrl in the request.
    Gateway.hostedUrl = GATEWAY_URL;

    // Create the hosted form request to send to the gateway.
    let gatewayRequest = {
        "merchantID": MERCHANT_ID,
        "action": "SALE",
        "type": 1,
        "transactionUnique": "NodeSDK Sample code test",
        "countryCode": 826,
        "currencyCode": 826,
        "amount": event.price,
        "orderRef": event.productName,
        "redirectURL": "https://dinoplaycentre/confirmation",
    };

    // A safer alternative to passing the secret in the request is to set it on the SDK.
    Gateway.merchantSecret = MERCHANT_SECRET;

    // A 3rd alterative is to sign the request manually using the SDK.
    gatewayRequest.signature = Gateway.sign(gatewayRequest, MERCHANT_SECRET);

    // Using the gateway SDK, pass the gateway request to the hostedRequest
    // function which will return a HTML form.
    let htmlBody = Gateway.hostedRequest(gatewayRequest);

    // Return the HTML form in the response.
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: htmlBody,
    };
};
