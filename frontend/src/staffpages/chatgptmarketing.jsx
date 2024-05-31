import React, { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { FireIcon, HeartIcon, FaceSmileIcon, FaceFrownIcon, HandThumbUpIcon, XMarkIcon } from '@heroicons/react/20/solid';
import OpenAI from 'openai';
import config from '../openai'; // Adjust the path if necessary
import { CustomerEnquiries } from '../models';
import { DataStore } from 'aws-amplify';



const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ChatGPTMarketing({emails}) {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [openai, setOpenAI] = useState(null);
    const [selected, setSelected] = useState(moods[5]);
    const [editMode, setEditMode] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [mail, setMail] = useState([]);
    const [progress, setProgress] = useState(0); // State to keep track of progress

    const navigate = useNavigate();


    
    

    useEffect(() => {
        setMail(emails);
    }, [emails]);

    console.log(emails);

    useEffect(() => {
        const initializeOpenAI = async () => {
            const openaiInstance = new OpenAI({
                dangerouslyAllowBrowser: true,
                apiKey: config.OPENAI_API_KEY,
            });

            setOpenAI(openaiInstance);
        };

        initializeOpenAI();
    }, []);

    const sendMessage = async () => {
        setLoading(true);
        const messages = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Cheeky Dino Playcentre - create marketing email but just the body don't include the subject  - ${message}` }
        ];
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages,
            });
            const newMessage = response.choices[0].message.content;
            const newMessages = [...chatMessages, { author: 'bot', message: newMessage }];
            setChatMessages(newMessages);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    const editResponse = (index) => {
        setEditMode(true);
        setEditMessage(chatMessages[index].message);
    };

    const saveEdit = async (index) => {
        let newMessages = [...chatMessages];
        newMessages[index].message = editMessage;
        setChatMessages(newMessages);
        setEditMode(false);
    
        // Initialize a counter
        let sentCount = 0;
    
        // Loop through the mail array to send emails
        for (const email of mail) {
            // Prepare the data to be sent in the request body
            const emailData = {
                email: email,
                content: editMessage // Send the edited message instead of the original one
            };
            
            try {
                // Send the POST request to the Lambda function
                const response = await fetch('https://tsfjam7hwf.execute-api.eu-west-2.amazonaws.com/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(emailData),
                });

                // turn mail into an array



                

              
                        await DataStore.save(
                            new CustomerEnquiries({
                                To: "Marketing",
                                Content: editMessage,
                                From: 'bookings@cheekydino.co.uk',
                                ToMarketing: mail, // turn into an array
                                Replied: true,
                                Marketing: true
                            })
                        );

                        console.log('Marketing email saved successfully');


                        
                // Check if the request was successful
                if (response.ok) {
                    // Increment the counter for each successful email sent
                    sentCount++;
                    // Update progress state
                    setProgress((sentCount / mail.length) * 100);
                } else {
                    // Log an error if the request was not successful
                    console.error(`Error sending email to ${email}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error sending email:', error);
                // Handle error if needed
            }
        }
    
        // Output the number of emails sent
        console.log(`${sentCount} emails sent successfully.`);
    };
    
    return (
        <div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Back</button>
            <div className="bg-white px-6 py-24 sm:py-32 lg:px-8" style={{ backgroundImage: "url('robot.png')", backgroundSize: "contain", backgroundPosition: "left", backgroundRepeat: "no-repeat" }}>
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-base font-semibold leading-7 text-indigo-600">Versasoft AI Marketing Manager</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-indigo-900 sm:text-6xl">Talk To Versa</h2>
                    {mail.length > 0 && <div className="mt-4">
                        <p> Emails Selected : {mail.length} </p>
                    </div>}

                </div>
            </div>


            <div className='mt-10 mb-10'>
                {loading && <div>Loading...</div>}
                {chatMessages.map((chatMessage, index) => (
                    <div key={index} className="p-4 mb-4 bg-indigo-100 text-sm font-semi-bold rounded shadow">
                        <div>{chatMessage.message}</div>
                        {chatMessage.author === 'bot' && <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => editResponse(index)}>Edit</button>}
                        {editMode &&
                            <textarea
                                value={editMessage}
                                onChange={(e) => setEditMessage(e.target.value)}
                                className="w-full p-2 mt-2 border rounded mb-5"
                            />
                        }
                        {editMode &&
                            <button
                                onClick={() => saveEdit(index)}
                                className="px-4 py-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        }
                    </div>
                ))}
            </div>

            <div className="flex items-start space-x-4 mb-10 mt-10">
                <div className="flex-shrink-0">
                    <img
                        className="inline-block h-10 w-10 rounded-full"
                        src='versa.gif'
                        alt=""
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                        <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="comment" className="sr-only">
                                Add your comment
                            </label>
                            <textarea
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Add your comment..."
                                defaultValue={''}
                            />

                            {/* Spacer element to match the height of the toolbar */}
                            <div className="py-2" aria-hidden="true">
                                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                                <div className="py-px">
                                    <div className="h-9" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between py-2 pl-3 pr-2">
                            <div className="flex items-center space-x-5">
                                <div className="flex items-center">
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                                                <div className="relative">
                                                    <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                                        <span className="flex items-center justify-center">
                                                            {selected.value === null ? (
                                                                <span>
                                                                    <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                                                    <span className="sr-only">Add your mood</span>
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    <span
                                                                        className={classNames(
                                                                            selected.bgColor,
                                                                            'flex h-8 w-8 items-center justify-center rounded-full'
                                                                        )}
                                                                    >
                                                                        <selected.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                                                    </span>
                                                                    <span className="sr-only">{selected.name}</span>
                                                                </span>
                                                            )}
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                                            {moods.map((mood) => (
                                                                <Listbox.Option
                                                                    key={mood.value}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'bg-gray-100' : 'bg-white',
                                                                            'relative cursor-default select-none px-3 py-2'
                                                                        )
                                                                    }
                                                                    value={mood}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <div
                                                                            className={classNames(
                                                                                mood.bgColor,
                                                                                'flex h-8 w-8 items-center justify-center rounded-full'
                                                                            )}
                                                                        >
                                                                            <mood.icon
                                                                                className={classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                                                                aria-hidden="true"
                                                                            />
                                                                        </div>
                                                                        <span className="ml-3 block truncate font-medium">{mood.name}</span>
                                                                    </div>
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Loading bar and progress */}
            {loading && (
                <div className="bg-gray-200 h-5 rounded-lg overflow-hidden">
                    <div
                        className="bg-indigo-600 h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
            {loading && <p className="mt-2">{progress.toFixed(2)}% complete</p>}
        </div>
    );
}
