import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function Modal({ content }) {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()


  if (show === true) {
    return (
      navigate('/chat')
    )
    
  }

  return (
<>
  <div
  aria-live="assertive"
  className="sticky top-20 left-1/2 transform -translate-x-1/2 pointer-events-none flex items-end px-4 py-6 sm:items-start sm:p-6 animate-pulse"
  >
  <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="/versa.gif"
                alt=""
              />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{content.email}</p>
              <p className="mt-1 text-sm text-gray-500">{content.content}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => {
              setShow(true)
            }}
          >
            Reply
          </button>
        </div>
      </div>
    </Transition>
  </div>
</div>
</>
)
}