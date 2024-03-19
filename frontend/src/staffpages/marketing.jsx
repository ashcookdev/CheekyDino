import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from '../models';
import { ArrowDownIcon } from '@heroicons/react/20/solid';

function EmailExtractor() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      const sessions = await DataStore.query(Sessions);
      const emails = sessions.map(session => session.Email);

      // Create CSV content
      const csvContent = 'data:text/csv;charset=utf-8,' + emails.join('\n');

      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'emails.csv');
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArrowDownIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />    
        {isLoading ? 'Downloading...' : 'Download Emails as CSV'}
      </button>
    </div>
  );
}

export default EmailExtractor;
