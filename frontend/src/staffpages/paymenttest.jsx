import { useState } from "react";

export default function PaymentTest() {
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        const response = await fetch('https://386f2wtkpf.execute-api.eu-west-2.amazonaws.com/test/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: 100,
                productName: "Test Product",
                id: "12345"
            }),
        });

        const responseData = await response.json(); // Parse the response as JSON

        let data = responseData.body; // Extract the HTML form from the 'body' property

        // Add a script to the form HTML to auto-submit the form
        data += '<script type="text/javascript">document.forms[0].submit();</script>';

        console.log(data);

        // Create a new window and open the HTML form in it
        const paymentWindow = window.open("", "_blank");
        paymentWindow.document.write(data);

        setLoading(false);
    }

    return (
        <div>
            <button className="" onClick={handleClick} disabled={loading}>
                {loading ? 'Loading...' : 'Pay'}
            </button>
        </div>
    );
}
