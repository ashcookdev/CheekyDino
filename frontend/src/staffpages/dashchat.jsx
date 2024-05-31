import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Messages } from "../models";





export default function DashChat({ userEmail }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = DataStore.observe(Messages).subscribe(() => {
      fetchMessages();
    });
    fetchMessages();
    return () => subscription.unsubscribe();
  }, []);

  async function fetchMessages() {
    const messages = await DataStore.query(Messages);
    setMessages(messages);
  }

  const sortedMessages = messages.sort((a, b) => {
    const aDate = new Date(a.updatedAt);
    const bDate = new Date(b.updatedAt);
    return bDate - aDate; // Sort in descending order (newest first)
  });

  return (
    <div className="border p-4 mb-4 h-64 overflow-y-scroll shadow-md rounded-lg">
      {sortedMessages.map((message) => (
        <div
          key={message.id}
          className={`p-2 rounded-lg mb-2 ${
            message.email === "Kitchen" ? "bg-green-500 text-white" : 
            (message.email === "Front Desk" ? "bg-purple-500 text-white" : "bg-blue-200")
          }`}
        >
          <div className="font-bold">{message.email}</div>
          {message.content}
        </div>
      ))}
    </div>
  );
}
