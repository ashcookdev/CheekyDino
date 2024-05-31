import React, { useState, useEffect } from "react";
import { DataStore } from 'aws-amplify';
import { Auth } from "aws-amplify";
import { CustomerEnquiries } from "../models";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    const fetchUserEmail = async () => {
        const user = await Auth.currentAuthenticatedUser();
        setUserEmail(user.attributes.email);
    }





    fetchUserEmail();
}, []);


    useEffect(() => {



  const fetchMessages = async () => {
    const messages = await DataStore.query(CustomerEnquiries);
    // filter messages to only show messages where From and To are the user's email
    const filteredMessages = messages.filter(
      (message) => message.From === userEmail || message.To === userEmail
    );
    setMessages(filteredMessages);
    console.log(filteredMessages);  
  };

    fetchMessages();

}, [userEmail]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const newMessage = {
      To: "frontdesk@cheekydino.co.uk",
      Content: input,
      From: userEmail,
      Replied: false
    };
    await DataStore.save(new CustomerEnquiries(newMessage));
    setInput("");
    setMessages([...messages, newMessage]);
  };

  return (
      <div className="flex flex-col h-full bg-gray-100" style={{height: '90vh'}}>
        <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Chat with us</h1>
          <span className="text-sm">{userEmail}</span>
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>

        <div className="flex flex-col h-screen bg-purple-50 mt-10">
  {messages.map((message, index) => (
    <div key={index} className={`p-4 mb-4 rounded-lg mt-5 shadow-lg ${message.From === userEmail ? "bg-green-100 bg-opacity-75 self-center" : "bg-blue-50 bg-opacity-75 self-start"}`} style={{borderRadius: '20px'}}>
      <div style={{padding: '10px'}}>
        <div>{message.From}: {message.Content}</div>
      </div>
    </div>
  ))}
</div>
        </div>
        <form onSubmit={sendMessage} className="m-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Type your message here..."
            style={{height: '100px'}}
          />
          <button type="submit" className="w-full p-2 mt-2 bg-indigo-500 text-white rounded-lg">
            Send
          </button>
        </form>
      </div>
    );
    
};


export default ChatComponent;
