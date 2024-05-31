import React, { useState, useEffect } from "react";
import { DataStore } from 'aws-amplify';
import { Auth } from "aws-amplify";
import { CustomerEnquiries } from "../models";
import {useLocation} from 'react-router-dom';

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

  const location = useLocation();
  const { party } = location.state || {};  // Add a default empty object

  if (!party) {
    return <div>Loading...</div>;  // Return a loading state or a default state
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await DataStore.query(CustomerEnquiries);
      const filteredMessages = messages.filter(
        (message) => message.From === userEmail || message.To === userEmail
      );
      setMessages(filteredMessages);
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
    fetchMessages();
  };

  return (
    <div className="flex flex-col h-full bg-gray-100" style={{height: '90vh'}}>
      <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Chat with us</h1>
        <span className="text-sm">{userEmail}</span>
      </div>
      <div className="md:flex p-4 mb-10">
        <img className="w-full md:w-1/2 md:mr-4" src={party.imageSrc} alt={party.imageAlt} />
        <div className="mt-4 md:mt-0 md:w-1/2">
          <h2>{party.name}</h2>
          <p>{party.description}</p>
          <ul>
            {party.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          <p>Price: £{party.price}</p>
        </div>
      </div>
      <div className="flex flex-col h-screen bg-purple-100 mt-10">
  {messages.map((message, index) => (
    <div key={index} className={`p-4 mb-4 rounded-lg mt-5 shadow-lg ${message.From === userEmail ? "bg-green-100 bg-opacity-75 self-center" : "bg-blue-50 bg-opacity-75 self-start"}`} style={{borderRadius: '20px'}}>
      <div style={{padding: '10px'}}>
        <div>{message.From}: {message.Content}</div>
      </div>
    </div>
  ))}
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
