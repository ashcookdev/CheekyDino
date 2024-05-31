
  import { useState, useEffect } from 'react'
  import {DataStore} from 'aws-amplify'
    import {CustomerEnquiries, Sessions} from '../models'
    import { Auth } from 'aws-amplify';
    import { format, set } from 'date-fns';
    import { ArrowRightCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
    import MessagesComponent from './custmessages';
    import NewMessage from './blankmessage';
    import {useNavigate} from 'react-router-dom';





  
    export default function CustomerChat() {
      const navigate = useNavigate();
    
      const [messages, setMessages] = useState([]);
      const [userEmail, setUserEmail] = useState("");
      const [renderMessages, setRenderMessages] = useState(false);
      const [selectedEmail, setSelectedEmail] = useState(null);
      const [renderNewMessage, setRenderNewMessage] = useState(false);
      const [loading, setLoading] = useState(false);
      const [reply, setReply] = useState({});
      const [emails, setEmails] = useState([]);
    
      useEffect(() => {
        const fetchUserEmail = async () => {
          const user = await Auth.currentAuthenticatedUser();
          setUserEmail(user.attributes.email);
          setLoading(true);
        };
    
        fetchUserEmail();
      }, []);
    
      useEffect(() => {
        const fetchMessages = async () => {
          setLoading(true);
          const messages = await DataStore.query(CustomerEnquiries);
          // Sort messages by updatedAt in descending order
          const sortedMessages = messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const latestMessages = [];
          const emailSet = new Set();
          for (const message of sortedMessages) {
            if (!emailSet.has(message.From) && message.From !== 'frontdesk@cheekydino.co.uk') {
              emailSet.add(message.From);
              latestMessages.push(message);
            }
          }
          setMessages(latestMessages);
          setLoading(false);
        };
        fetchMessages();
      }, [userEmail]);
      
   
    
      useEffect(() => {
        const fetchSessions = async () => {
          const sessions = await DataStore.query(Sessions);
          const email = sessions.filter(session => session.Email);
          const emailSet = new Set();
          const latestEmails = [];
          for (const session of email) {
            if (!emailSet.has(session.Email)) {
              emailSet.add(session.Email);
              latestEmails.push(session);
            }
          }
          latestEmails.filter(email => email.Email.includes('@'));
          latestEmails.sort((a, b) => a.Email.localeCompare(b.Email));
          setEmails(latestEmails);
        };
    
        fetchSessions();
      }, []);
    
      const handleSendMessage = () => {
        const message = {
          To: selectedEmail,
          From: 'frontdesk@cheekydino.co.uk',
          Content: '',
          Replied: false
        };
        setReply(message);
        setRenderNewMessage(true);
      };
    
      const handleMessage = (person) => {
        setRenderMessages(true);
        setReply(person);
      };

      const handleDelete = async (person) => {
        await DataStore.delete(CustomerEnquiries, person.id);
        const messagesCopy = [...messages];
        const index = messagesCopy.findIndex(message => message.id === person.id);
        messagesCopy.splice(index, 1);
        setMessages(messagesCopy);
      };

     


    


    
      const getBackgroundColorClass = (from) => {
        return from === 'bookings@cheekydino.co.uk' ? 'bg-green-200' : '';
      };

      if (renderMessages) {
        return <MessagesComponent reply={reply} />;
      }

      if (renderNewMessage) {
        return <NewMessage reply={reply} />;
      }
    
      return (
        <div className="px-4 sm:px-6 lg:px-8">
          {loading && <div><h1>Loading...</h1></div>}
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900 mt-10 mb-10">Customer Enquiries</h1>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Select Email</label>
              <select 
                onChange={(e) => setSelectedEmail(e.target.value)}
                id="location"
                name="location"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Canada">
                {emails.map((email, index) => (
                  <option key={index}>{email.Email}</option>
                ))}
              </select>
              <button className="rounded-md mt-10 mr-10 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => navigate('/marketingsuite')}>Marketing Suite</button>
              {selectedEmail && (
                <button className="rounded-md mt-10 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSendMessage}>Send Message</button>
              )}
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Email</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sent Time</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Content</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Reply</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {messages.map((person, index) => (
                      <tr key={index} className={getBackgroundColorClass(person.From)}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img className="h-11 w-11 rounded-full" src= "dino-logo.png" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{person.From}</div>
                              <div className="mt-1 text-gray-500">{person.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{format(new Date(person.createdAt), 'dd/MM/yyyy HH:mm')}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {person.Replied ? (
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Replied</span>
                          ) : (
                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">Not Replied</span>
                          )}
                        </td>
                        <td className="px-3 py-5 text-sm text-gray-500 max-w-xs whitespace-pre-line">{person.Content}</td>
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button onClick={() => handleDelete(person)} className="text-red-600 hover:text-indigo-900 mr-5">Delete<span className="sr-only"></span></button>
                          <button onClick={() => handleMessage(person)} className="text-indigo-600 hover:text-indigo-900">Show<span className="sr-only"></span></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
  