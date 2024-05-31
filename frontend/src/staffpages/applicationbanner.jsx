import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { JobApplication as JobApplicationModel } from '../models'; // Rename the imported model
import { format, isToday } from 'date-fns';

export default function JobApplicationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [interviewToday, setInterviewToday] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getJobApplication = async () => {
      try {
        const jobApplications = await DataStore.query(JobApplicationModel);
        const newApplications = jobApplications.filter(application => 
            !application.Interviewed && 
            !application.InterviewSet && 
            !application.NotInterested
        );

        const todayInterview = newApplications.find(application => isToday(new Date(application.InterviewDate)));

        if (newApplications.length > 0 || todayInterview) {
          setShowBanner(true);
        }

        if (todayInterview) {
          setInterviewToday(true);
        }
      } catch (error) {
        console.error('Error getting job applications:', error);
      }
    };

    getJobApplication();
  }, []);

  const handleViewApplication = () => {
    navigate('/applications');
  };

  return (
    <div>
      {showBanner && (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                {interviewToday ? "You have an interview scheduled for today." : "You have received a new job application."}
              </p>
              <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <button
                  type="button"
                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                  onClick={handleViewApplication}
                >
                  View Application
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
