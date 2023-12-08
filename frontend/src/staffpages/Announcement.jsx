import { DataStore, Predicates } from "aws-amplify";
import {CustomerScreen} from '../models';

import { Fragment, useState } from 'react'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Announcement() {

  const navigate = useNavigate();



    const [comment, setComment] = useState('')
    const [number, setNumber] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        // save the comment to the CustomerScreen DataStore model
        await DataStore.save(
          new CustomerScreen({
            Message: comment,
            Show: true,
            Number: Number(number)
          })
        );
        // reset the comment state
        setComment('');
        navigate('/customerscreen')
      };

      const DeleteAnnouncement = async (event) => {
        event.preventDefault()
        await DataStore.delete(CustomerScreen, Predicates.ALL);
        setComment('');
        window.location.reload();
      }

  return (
    <div className="flex items-start space-x-4">
     
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="./versa.gif"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
      <form onSubmit={handleSubmit} className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
            rows={3}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <input onChange={(e) => setNumber(e.target.value)}
                  id="number"
                  name="number"
                  type="number"
                  className="block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0"
                />
                <label htmlFor="number" className="sr-only">
                  Announcement Number
                </label>



                  
              </div>
            </div>
            <div className="flex-shrink-0">
              <button 
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
              <button onClick={DeleteAnnouncement}
                type="button"
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>


            </div>
          </div>
        </form>
       

      </div>
    </div>
  )
}


