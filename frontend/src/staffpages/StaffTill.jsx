import { DataStore } from "aws-amplify";
import { ClockIns } from "../models";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckBadgeIcon, ChevronDoubleDownIcon } from "@heroicons/react/24/solid";




export default function TillStaff({onSelectChange}) {


  const defaultStaff = { StaffId: 'Barry@Cheekydino.co.uk', /* other properties */ };



  const [selected, setSelected] = useState(defaultStaff);

  useEffect(() => {
    onSelectChange(selected);
  }, [selected]);
    
    // Assume defaultStaff is your default staff value

// Set defaultStaff as the initial state


    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
        }

    // find all clocked in staff

    const [clockedInStaff, setClockedInStaff] = useState([]);

    useEffect(() => {
      const today = new Date();
        const fetchClockIn = async () => {
          const clockIn = await DataStore.query(ClockIns);
          const filterClockIn = clockIn.filter(
            (c) =>
              c.ClockedIn === true &&
              c.ClockedOut === false
             
          );
          console.log(filterClockIn);
          setClockedInStaff(filterClockIn); // Update clockedIn state
        };
        fetchClockIn();
        }
        , []);



        return (
            <Listbox value={selected} onChange={(value) => {
              setSelected(value);
                onSelectChange(value);
            }}>
              {({ open }) => (
                <>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full animate-pulse cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <span className="block truncate">{selected ? selected.StaffId : "Select Staff"}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDoubleDownIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
        
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="relative z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {clockedInStaff.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {person.StaffId}
                                </span>
        
                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckBadgeIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          );
        }
    




