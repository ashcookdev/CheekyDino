import React, { useState, useEffect } from "react";
import axios from 'axios';








export default function TestTill() {


    const printReceipt = () => {
        // Prepare the data you want to print
        const receiptData = {
            price: '10.99',
            change: '1.01',
            product: 'T-Shirt',
            // Add any other data you need
        };
    
        // Send a POST request to the /print-receipt endpoint
        axios.post('http://localhost:5252/print-receipt', receiptData)
        .then(response => console.log(response.data))
        .catch(error => console.error('There was an error!', error));
    }


    const sendEmail = async () => {
        const emailData = {
            email: "ashcookdev@gmail.com",
            name: "Barry",
            date: "30/10/23",
            timeslot: "10:00 - 12:00",
            table: "1",
            qrCodeDataUrl: "https://www.google.com",
            telephone: "01234567890",
            adults: 1,
            children: 2,
            bookingID: "1234567890",
            total: "10.00",
            variable: "booklater",
        };
    
        try {
            const response = await fetch('https://ebaedr0fmd.execute-api.eu-west-2.amazonaws.com/production/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('There was an error!', response.status);
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    

    return <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
<div className="flex flex-col">
    <button onClick={printReceipt}
        type="button"
        className="rounded-md mt-5 mb-5 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Print
      </button>



        <button
        type="button"
        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        Open Drawer

        </button>
      </div>

      <button onClick={sendEmail}
        type="button"
        className="rounded-md mt-10 bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        Test Email

        </button>
    


   



    </div>
  }

  
