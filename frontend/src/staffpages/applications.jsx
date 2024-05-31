import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataStore, Storage } from "aws-amplify";
import { JobApplication as JobApplicationModel } from "../models";
import {Staff} from "../models";
import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function JobApplicationForms() {
    const [jobApplications, setJobApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [password, setPassword] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [cvUrl, setCvUrl] = useState('');
    const [interest, setInterest] = useState(false);
    const [name, setName] = useState('');
    const [interviewDate, setInterviewDate] = useState('');
    const [interviewTime, setInterviewTime] = useState('');
    const [notes, setNotes] = useState(false);
    const [interviewNotes, setInterviewNotes] = useState('');
    const [contract, setContract] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [medical, setMedical] = useState('');
    const [dob, setDob] = useState('');



    const navigate = useNavigate();

    useEffect(() => {
        // get all job applications
        const getJobApplications = async () => {
            try {
                const jobApplications = await DataStore.query(JobApplicationModel);
                const sortedApplications = jobApplications.sort((a, b,) => {
                    // Sorting by createdAt in descending order
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setJobApplications(sortedApplications);
            } catch (error) {
                console.error("Error getting job applications:", error);
            }
        };

        getJobApplications();
    }, []);

    const handleApplicationClick = (application) => {
        // Display application details when clicked
        setSelectedApplication(application);
        setName(application.Name);
   
    };
    

    const handlePasswordSubmit = () => {
        // Check the password
        if (password === '1') {
            setAuthorized(true);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    useEffect(() => {
        // Fetch CV when selected application changes
        if (selectedApplication) {
            fetchCv(selectedApplication.Name);
        }
    }, [selectedApplication]);

    const fetchCv = async (Name) => {
        try {
            const cvKey = `cvs/${Name}-cv`;
            const url = await Storage.get(cvKey);
            setCvUrl(url);
        } catch (error) {
            console.error("Error fetching CV:", error);
        }
    };

    const setNotInterested = async (id) => {
        try {
            const application = await DataStore.query(JobApplicationModel, id);
            await DataStore.save(
                JobApplicationModel.copyOf(application, updated => {
                    updated.NotInterested = true;
                })
            );
            setSelectedApplication(null);
        } catch (error) {
            console.error("Error setting not interested:", error);
        }
    }

    const handleSubmit = async (id) => {
        try {
            const application = await DataStore.query(JobApplicationModel, id);
            await DataStore.save(
                JobApplicationModel.copyOf(application, updated => {
                    updated.Interviewed = true;
                    updated.InterviewDate = interviewDate;
                    updated.InterviewTime = interviewTime;
                })
            );
            setNotes(true); // Set notes to true after interview submission
            // timeout and reload the page
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error("Error setting interview:", error);
        }
    }

    const handleRole = async () => {
        try {
            const application = await DataStore.query(JobApplicationModel, selectedApplication.id);
            // Mark the application as offered
            await DataStore.save(
                JobApplicationModel.copyOf(application, updated => {
                    updated.Offered = true;
                    updated.Interviewed = true;
                })
            );
    
            // Save new staff instance in the database
            const newStaff = await DataStore.save(
                new Staff({
                    Name: selectedApplication.Name,
                    Email: selectedApplication.Email,
                    Role: selectedApplication.Role,
                    Telephone: selectedApplication.Telephone,
                    StartDate: selectedApplication.InterviewDate, // Assuming InterviewDate is the start date for the staff
                    ContractType: contract, // Example contract type, replace with the actual value
                    HourlyRate: Number(hourlyRate), // Example hourly rate, replace with the actual value
                    Age: selectedApplication.Age,
                    Medical: medical,
                    DOB: dob,
                    Current: true,
                })
            );
    
            setSelectedApplication(null); // Reset selected application after handling the role
        } catch (error) {
            console.error("Error setting role:", error);
        }
    }

    

    


    return (
        <div>
            {!authorized ? (
                <div>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button         className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={handlePasswordSubmit}>Submit</button>
                </div>
            ) : (
                <div>
                    <select
                        id="applicationsDropdown"
                        name="applicationsDropdown"
                        defaultValue=""
                        onChange={(e) => handleApplicationClick(JSON.parse(e.target.value))}
                    >
                        <option disabled value="">Select an application</option>
                        {jobApplications.map(application => (
                            <option key={application.id} value={JSON.stringify(application)}>
                                {application.Name + "-" + new Date(application.createdAt).toLocaleString()}
                            </option>
                        ))}
                    </select>

                    {selectedApplication && (
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.Name}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.Role}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.Email}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Telephone</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.Telephone}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Cover Letter</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.CoverLetter}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Previous Experience</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.PreviousExperience}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-gray-900">Interviewed</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {selectedApplication.Interviewed ? 'Yes' : 'New Application'}
    </dd>
</div>

                                    {cvUrl && (
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">CV</dt>
                            <a        className="text-sm leading-6 text-indigo-600 hover:text-indigo-500 sm:col-span-2 sm:mt-0" target="_blank" rel="noopener noreferrer"
 href={cvUrl} target="_blank" rel="noopener noreferrer">View CV</a>
                        </div>
                    )}
                                </dl>
                            </div>
                            {selectedApplication.InterviewDate !== null ? (
    <div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Interview Date</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.InterviewDate}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Interview Time</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedApplication.InterviewTime}</dd>
        </div>
        <button 
    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    type="button"
    onClick={() => setNotes(true)}
>
    Add Interview Notes
</button>
<button 
    className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    type="button"
    onClick={() => setInterest(true)}
>
    Edit Time and Date
</button>
{notes && (
    <div>
        <label htmlFor="notes" className="block mt-6 text-sm font-medium leading-6 text-gray-900">
            Interview Notes
        </label>
        <textarea
            id="notes"
            name="notes"
            value={interviewNotes || ''}
            onChange={(e) => setInterviewNotes(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 mt-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter notes here"
        />
 <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Contract Type
      </label>
      <div className="mt-2">
        <input
        onChange={(e) => {
            setContract(e.target.value);
        }
        }
          type="text"
          name="contract"
          id="contract"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Full Time"
        />
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Hourly Rate
      </label>
      <div className="mt-2">
        <input
        onChange={(e) => {
            setHourlyRate(e.target.value);
        }
        }

          type="float"
          name="hourlyRate"
          id="hourlyRate"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="11.44"
        />
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Medical
      </label>
      <div className="mt-2">
        <input
        onChange={(e) => {
            setMedical(e.target.value);
        }
        }

          type="text"
          name="medical"
          id="medical"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Depression etc"
        />
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        DOB
      </label>
      <div className="mt-2">
        <input
        onChange={
            (e) => {
            setDob(e.target.value);
            }
        }
          type="text"
          name="dob"
          id="dob"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="19/07/1999"
        />
      </div>
    </div>
        <button className="rounded-md mt-5 bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="button" onClick={handleRole}>

            Offered Role
        </button>
        <button className="rounded-md mt-5 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="button"
        onClick={(e)=> {setNotInterested(selectedApplication.id)}}>
            Reject
        </button>

    </div>
)}



    </div>
) : null}

<div>
    {!selectedApplication.InterviewDate ? (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Actions</dt>
            <button className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                    setNotInterested(selectedApplication.id);
                }}
            >
                Not Interested (Please Contact Applicant)
            </button>
            <button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setInterest(true)}
            >
                Set up an interview
            </button>
        </div>
    ) : null}
</div>

                            
                            



                                    {interest && (
                            
                            <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Set up an interview Date
      </label>
      <div className="mt-2">
        <input onChange={(e) => {
            setInterviewDate(e.target.value);

        }
    }
          type="date"
          name="date"
          id="date"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="12/03/24"
        />
      </div>
      <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Set up an interview Time
      </label>
      <div className="mt-2">
        <input
        onChange={(e) => {
            setInterviewTime(e.target.value);


        }
    }
          type="time"
          name="time"
          id="time"
          className="block w-full rounded-md border-0 py-1.5 mb-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="15:00"
        />
    </div>
    <button className="rounded-md mt-5 bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    onClick={() => {
        handleSubmit (selectedApplication.id);

    }
}
>
Confirm Interview (Please Contact Interviewee)</button>

    </div>
    



    
    </div>
        
    
    
                                    )}

    
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
