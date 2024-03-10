

    import { useState, useRef } from "react";
    import { CogIcon } from '@heroicons/react/20/solid';
    
    export default function PaymentTest() {
        const [loading, setLoading] = useState(false);
        const iframeRef = useRef(null);
    
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
    
            // Write the HTML form to the iframe's 'srcdoc' attribute
            iframeRef.current.srcdoc = data;
    
            setLoading(false);
        }
    
        return (
            <div className="flex">
                {loading ? (
                    <CogIcon className="animate-spin items-center h-50 w-50 text-black" /> // Use the cog icon as a loading spinner
                ) : (
                    <button className="" onClick={handleClick}>
                        Pay
                    </button>
                )}
                <iframe ref={iframeRef} style={{width: '100%', height: '600px'}}></iframe>
            </div>
        );
    }
    
