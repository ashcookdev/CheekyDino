import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DataStore } from 'aws-amplify';
import { CustomerEnquiries } from "../models";
import { format } from 'date-fns';

export default function Example({ reply }) {
  const [open, setOpen] = useState(true)
  const [replys, setReply] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    setReply(reply);
  }, [reply]);

  
  console.log(replys);

  
  

  const handleSendReply = async () => {
    console.log('Sending reply:', newReply);
   

    const emailData = {
      email: replys.To,
      name: replys.From,
      message: newReply,
    }
    // send email to customer using 

    const response = await fetch('https://fkciaz8rxf.execute-api.eu-west-2.amazonaws.com/send', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
  });

  const data = await response.json();

  console.log(data);





    const newMessage = {
      To: replys.To,
      Content: newReply,
      From: 'frontdesk@cheekydino.co.uk',
      Replied: true
    };
    await DataStore.save(new CustomerEnquiries(newMessage));
    setNewReply('');
    window.location.reload();   
  };

  const handleCloseDialog = () => {
    window.location.reload();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-screen max-w-2xl">
                <form className="flex flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between space-x-3">
                      <div className="space-y-1">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {replys[0]?.From}
                        </Dialog.Title>
                      </div>
                      <div className="flex h-7 items-center">
                        <button
                          type="button"
                          className="relative text-gray-400 hover:text-gray-500"
                          onClick={handleCloseDialog}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  

                  <div className="px-4 sm:px-6 py-5">
                    <h2 className="text-lg font-semibold text-gray-900">Reply</h2>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block w-full rounded-md shadow-sm">
                          <button
                            type="button"
                            onClick={handleSendReply}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Send
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
