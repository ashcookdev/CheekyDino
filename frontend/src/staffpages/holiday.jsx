import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useNavigate } from 'react-router-dom'
import { DataStore } from 'aws-amplify'
import { Holiday } from '../models'
import Staff from './shifts'
import { XCircleIcon } from '@heroicons/react/20/solid'

export default function Example({ email }) {
  const [open, setOpen] = useState(true)
  const [staff, setStaff] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()


  async function saveHoliday(e) {
    e.preventDefault()
    console.log('Saving data')

    try {
      await DataStore.save(
        new Holiday({
          Email: email,
          StartDate: startDate,
          EndDate: endDate,
          Description: description,
        })
      )
      console.log('Saved data')
      navigate('/staff')
    } catch (error) {
      console.log(error)
    }
  }

  if (staff === true) {
    return <Staff />
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form onSubmit={saveHoliday} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              Request Holiday
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">{email}</p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="relative text-gray-400 hover:text-gray-500"
                              onClick={() => setStaff(true)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XCircleIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Project name */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Start Date
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={(e) => {
                                setStartDate(e.target.value)
                              }}
                              type="date"
                              value={startDate}
                              name="startdate"
                              id="startdate"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              End Date
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                                                            onChange={(e) => {
                                                              setEndDate(e.target.value)
                                                            }}
                                                            type="date"
                                                            name="enddate"
                                                            id="enddate"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                          />
                                                        </div>
                                                      </div>
                              
                                                      {/* Project description */}
                                                      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                        <div>
                                                          <label
                                                            htmlFor="project-description"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                          >
                                                            Description
                                                          </label>
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                          <textarea
                                                                                          onChange={(e) => {
                                                                                            setDescription(e.target.value)
                                                                                          }}
                                                                                          id="project-description"
                                                                                          name="project-description"
                                                                                          rows={3}
                                                                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                        />
                                                                                      </div>
                                                                                    </div>
                                                                                    {/* Action buttons */}
                                                                                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                                                                      <div className="flex justify-end space-x-3">
                                                                                        <button
                                                                                          type="submit"
                                                                                          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
                                                                                        >
                                                                                          Save
                                                                                        </button>
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                              </form>
                                                                            </Dialog.Panel>
                                                                          </Transition.Child>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </Dialog>
                                                                </Transition.Root>
                                                              )
                                                            }
                                                            