import { DataStore } from 'aws-amplify';
import { HomePage } from '../models';
import { useState } from 'react';
import Home from '../customer-pages//home';

export default function Example() {
  const [topSectionTitle, setTopSectionTitle] = useState('');
  const [topSectionPic, setTopSectionPic] = useState('');
  const [topSectionWriting, setTopSectionWriting] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventPic, setEventPic] = useState('');
  const [eventWriting, setEventWriting] = useState('');
  const [eventTitleTwo, setEventTitleTwo] = useState('');
  const [eventPicTwo, setEventPicTwo] = useState('');
  const [eventWritingTwo, setEventWritingTwo] = useState('');
  const [eventTitleThree, setEventTitleThree] = useState('');
  const [eventPicThree, setEventPicThree] = useState('');
  const [eventWritingThree, setEventWritingThree] = useState('');
  const [eventOn, setEventOn] = useState(true);
  const [eventTwoOn, setEventTwoOn] = useState(true);
  const [eventThreeOn, setEventThreeOn] = useState(true);


  const handleTopSectionSubmit = async () => {
    try {
      const existingRecord = await DataStore.query(HomePage);
      if (existingRecord.length > 0) {
        await DataStore.save(
          HomePage.copyOf(existingRecord[0], updated => {
            updated.TopSectionTitle = topSectionTitle;
            updated.TopSectionPic = topSectionPic;
            updated.TopSectionWriting = topSectionWriting;
          })
        );
      } else {
        console.error('No existing record found in the database.');
      }
    } catch (error) {
      console.error('Error handling top section submission:', error);
    }
  };

  const handleEventSubmit = async () => {
    try {
      const existingRecord = await DataStore.query(HomePage);
      if (existingRecord.length > 0) {
        await DataStore.save(
          HomePage.copyOf(existingRecord[0], updated => {
            updated.EventTitle = eventTitle;
            updated.EventPic = eventPic;
            updated.EventWriting = eventWriting;
            updated.EventOneButton = eventOn;
          })
        );
      } else {
        console.error('No existing record found in the database.');
      }
    } catch (error) {
      console.error('Error handling event submission:', error);
    }
  };

  const handleEventTwoSubmit = async () => {
    try {
      const existingRecord = await DataStore.query(HomePage);
      if (existingRecord.length > 0) {
        await DataStore.save(
          HomePage.copyOf(existingRecord[0], updated => {
            updated.EventTwoTitle = eventTitleTwo;
            updated.EventTwoPic = eventPicTwo;
            updated.EventTwoWriting = eventWritingTwo;
            updated.EventTwoButton = eventTwoOn;
          })
        );
      } else {
        console.error('No existing record found in the database.');
      }
    } catch (error) {
      console.error('Error handling event two submission:', error);
    }
  };

  const handleEventThreeSubmit = async () => {
    try {
      const existingRecord = await DataStore.query(HomePage);
      if (existingRecord.length > 0) {
        await DataStore.save(
          HomePage.copyOf(existingRecord[0], updated => {
            updated.EventThreeTitle = eventPicThree;
            updated.EventThreePic = eventPicThree;
            updated.EventThreeWriting = eventWritingThree;
            updated.EventThreeButton = eventThreeOn;
          })
        );
      } else {
        console.error('No existing record found in the database.');
      }
    } catch (error) {
      console.error('Error handling event three submission:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Home />
      
      {/* Top Section */}
      <div>
        <label htmlFor="top-section-title" className="block text-sm font-medium leading-6 text-gray-900">
          Top Section Title
        </label>
        <input
          type="text"
          name="top-section-title"
          id="top-section-title"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Top Section Title"
          value={topSectionTitle}
          onChange={(e) => setTopSectionTitle(e.target.value)}
        />
        <input
          type="text"
          name="top-section-pic"
          id="top-section-pic"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Top Section Picture"
          value={topSectionPic}
          onChange={(e) => setTopSectionPic(e.target.value)}
        />
        <textarea
          name="top-section-writing"
          id="top-section-writing"
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Top Section Writing"
          value={topSectionWriting}
          onChange={(e) => setTopSectionWriting(e.target.value)}
        />
        <button         className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={handleTopSectionSubmit}>Save Top Section</button>
      </div>

      {/* Event */}
      <div className="mt-10">
        <input
          type="text"
          name="event-title"
          id="event-title"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <input
          type="text"
          name="event-pic"
          id="event-pic"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Event Picture"
          value={eventPic}
          onChange={(e) => setEventPic(e.target.value)}
        />
        <textarea
          name="event-writing"
          id="event-writing"
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Event Writing"
          value={eventWriting}
          onChange={(e) => setEventWriting(e.target.value)}
        />
        <button         className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={handleEventSubmit}>Save Event</button>
      </div>

      {/* Event Two */}
      <div className="mt-10">
        <input
          type="text"
          name="event-title-two"
          id="event-title-two"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Event Title Two"
          value={eventTitleTwo}
          onChange={(e) => setEventTitleTwo(e.target.value)}
        />
        <input
          type="text"
          name="event-pic-two"
          id="event-pic-two"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Event Picture Two"
          value={eventPicTwo}
          onChange={(e) => setEventPicTwo(e.target.value)}
        />
        <textarea
          name="event-writing-two"
          id="event-writing-two"
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Event Writing Two"
          value={eventWritingTwo}
          onChange={(e) => setEventWritingTwo(e.target.value)}
        />
        <button         className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={handleEventTwoSubmit}>Save Event Two</button>
      </div>

      {/* Event Three */}
      <div className="mt-10">
        <input
          type="text"
          name="event-title-three"
          id="event-title-three"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Event Title Three"
          value={eventTitleThree}
          onChange={(e) => setEventTitleThree(e.target.value)}
        />
        <input
          type="text"
          name="event-pic-three"
          id="event-pic-three"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Event Picture Three"
          value={eventPicThree}
          onChange={(e) => setEventPicThree(e.target.value)}
        />
        <textarea
          name="event-writing-three"
          id="event-writing-three"
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
          placeholder="Event Writing Three"
          value={eventWritingThree}
          onChange={(e) => setEventWritingThree(e.target.value)}
        />
        <button         className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={handleEventThreeSubmit}>Save Event Three</button>
      </div>
      <div className="mt-10">

      <span className="isolate inline-flex rounded-md shadow-sm">
      <button
      onClick={() => setEventOn(true)
       

      }
        type="button"
        className="relative inline-flex ml-3 items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Event One On
      </button>
      <button
      onClick={() => setEventOn(false)}
        type="button"
        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Event One Off 
      </button>
      
    </span>
    </div>
    <div className="mt-10">

      <span className="isolate inline-flex rounded-md shadow-sm">
      <button
      onClick={() => setEventTwoOn(true)
       

      }
        type="button"
        className="relative inline-flex ml-3 items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Event Two On
      </button>
      <button
      onClick={() => setEventTwoOn(false)}
        type="button"
        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Event Two Off 
      </button>
      
    </span>
    </div>
    <div className="mt-10">

<span className="isolate inline-flex rounded-md shadow-sm">
<button
onClick={() => setEventThreeOn(true)
 

}
  type="button"
  className="relative inline-flex ml-3 items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
>
  Event Three On
</button>
<button
onClick={() => setEventThreeOn(false)}
  type="button"
  className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
>
  Event Three Off 
</button>

</span>
</div>

    </div>
  );
}
