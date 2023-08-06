import { DataStore } from 'aws-amplify';
import { HomePage } from './models';
import { useState } from 'react';

export default function Example() {
  const [topSectionTitle, setTopSectionTitle] = useState('');
  const [topSectionPic, setTopSectionPic] = useState('');
  const [topSectionWriting, setTopSectionWriting] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventPic, setEventPic] = useState('');
  const [eventWriting, setEventWriting] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await DataStore.save(
      new HomePage({
        TopSectionTitle: topSectionTitle,
        TopSectionPic: topSectionPic,
        TopSectionWriting: topSectionWriting,
        
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="top-section-title" className="block text-sm font-medium leading-6 text-gray-900">
          Top Section Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="top-section-title"
            id="top-section-title"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Top Section Title"
            value={topSectionTitle}
            onChange={(e) => setTopSectionTitle(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="top-section-pic" className="block text-sm font-medium leading-6 text-gray-900">
          Top Section Picture
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="top-section-pic"
            id="top-section-pic"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Top Section Picture"
            value={topSectionPic}
            onChange={(e) => setTopSectionPic(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="top-section-writing" className="block text-sm font-medium leading-6 text-gray-900">
          Top Section Writing
        </label>
        <div className="mt-2">
          <textarea
            name="top-section-writing"
            id="top-section-writing"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Top Section Writing"
            value={topSectionWriting}
            onChange={(e) => setTopSectionWriting(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="event-title" className="block text-sm font-medium leading-6 text-gray-900">
          Event Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="event-title"
            id="event-title"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
      </div>
      {/* <div>
        <label htmlFor="event-pic" className="block text-sm font-medium leading-6 text-gray-900">
          Event Picture
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="event-pic"
            id="event-pic"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Event Picture"
            value={eventPic}
            onChange={(e) => setEventPic(e.target.value)}
            />
        </div>
        </div>
        <div>
        <label htmlFor="event-writing" className="block text-sm font-medium leading-6 text-gray-900">
            Event Writing
        </label>
        <div className="mt-2">
            <textarea
            name="event-writing"
            id="event-writing"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Event Writing"
            value={eventWriting}
            onChange={(e) => setEventWriting(e.target.value)}
            />
        </div>
        </div> */}
        <div className="mt-6">
        <button

            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        >
            Save
        </button>
        </div>
    </form>
    );
}

