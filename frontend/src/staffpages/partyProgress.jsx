import React, { useState, useEffect } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { format, parse, addMinutes, parseISO } from "date-fns";
import { differenceInMinutes } from "date-fns/esm";
import { PartyBooking } from "../models";
import { PartyGuests } from "../models";
import { Messages } from "../models";



import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function PartyBookings() {
    const [currentTime, setCurrentTime] = useState(0);
    const [bookings, setPartyBookings] = useState([]);
    const [partyGuests, setPartyGuests] = useState([]);
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());




    useEffect(() => {
        async function fetchTodaysPartyBookings() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const allPartyBookings = await DataStore.query(PartyBooking);
            const partyBookings = allPartyBookings.filter(
                (booking) =>
                    new Date(booking.PartyDate) >= today &&
                    new Date(booking.PartyDate) < tomorrow
            );
            setPartyBookings(partyBookings);
            if (partyBookings.length > 0) {
                const partybookingId = partyBookings[0].id;
                const partyGuests = await DataStore.query(PartyGuests);
                const guests = partyGuests.filter(
                    (guest) => guest.PartyBookingID === partybookingId
                );
                setPartyGuests(guests);
            }}

        fetchTodaysPartyBookings();
        const subscription = DataStore.observe(PartyBooking).subscribe(() => {
            const currentTime = new Date();
            const timeSinceLastUpdate = differenceInMinutes(currentTime, lastUpdateTime);
        
            if (timeSinceLastUpdate >= 5) {
              fetchTodaysPartyBookings();
              setLastUpdateTime(currentTime);
            }
          });
        
          return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="flex space-x-12">
            {bookings.map((booking) => (
                <PartyProgress key={booking.id} booking={booking} />
            ))}
        </div>
    );
}

function PartyProgress({ booking }) {
    const [messageSent, setMessageSent] = useState(false);

    const partyTime = parse(booking.PartyTime, 'HH:mm', new Date());
    const timeElapsed = differenceInMinutes(new Date(), partyTime);
    const characterStart = addMinutes(partyTime, 30);
    const foodStart = addMinutes(partyTime, 90);
    const playStart = addMinutes(partyTime, 120);
    const finishTime = addMinutes(partyTime, 150);
    const time = booking.PartyChildMumArrived || '';
    const formattedTime = time.substring(0, 5);

    console.log(formattedTime); // Output: 20:59

    // time difference between party time and formatted time

    const timeDifference = differenceInMinutes(partyTime, formattedTime);
    console.log(timeDifference); // Output: 20:59



    // Map through the orders array and create a new step for each order
    const steps = [
        {
            name: booking.ChildName + "'s Party" + " - " + booking.PartyType + " - " + "Party Host:" + " - " + booking.PartyHostAssigned,

            description: format(partyTime, 'h:mm a') + " - " + "Party Client Arrived:" + " - " + formattedTime,
            status: timeElapsed >= 0 ? 'complete' : 'upcoming',
        },
        {
            name: 'Character Start',
            description: format(characterStart, 'h:mm a') + " - " + "Current Guests:" + " - " + booking.CurrentGuests,
            status:
                booking.PartyType !== 'T-Rex' && timeElapsed >= 30
                    ? 'complete'
                    : 'upcoming',
        },
        {
            name: 'Food',
            description: format(foodStart, 'h:mm a'),
            status: timeElapsed >= 90 ? 'complete' : 'upcoming',
        },
        {
            name: 'Play',
            description: format(playStart, 'h:mm a'),
            status: timeElapsed >= 120 ? 'complete' : 'upcoming',
        },
        {
            name: 'Finish',
            description: format(finishTime, 'h:mm a'),
            status: timeElapsed >= 150 ? 'complete' : 'upcoming',
        },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }




    return (
        <nav aria-label="Progress">
            <ol role="list" className="overflow-hidden">
                {steps.map((step, stepIdx) => (
                    <li
                        key={step.name}
                        className={classNames(
                            stepIdx !== steps.length - 1 ? "pb-10" : "",
                            "relative"
                        )}
                    >
                        {step.status === "complete" ? (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div
                                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <a href={step.href} className="group relative flex items-start">
                                    <span className="flex h-9 items-center">
                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                                            <CheckCircleIcon
                                                className="h-5 w-5 text-white"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium animate-pulse">{step.name}</span>
                                        <span className="text-sm text-gray-500">
                                            {step.description}
                                        </span>
                                    </span>
                                </a>
                            </>
                        ) : step.status === "current" ? (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div
                                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <a
                                    href={step.href}
                                    className="group relative flex items-start"
                                    aria-current="step"
                                >
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                                            <svg
                                                className="animate-spin h-5 w-5 text-indigo-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-indigo-600">
                                            {step.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {step.description}
                                        </span>
                                    </span>
                                </a>
                            </>
                        ) : (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div
                                        className="absolute left-4 top-4 -ml-p
                            x mt-0.5 h-full w-0.5 bg-gray-300"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <a href={step.href} className="group relative flex items-start">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-gray-500">
                                            {step.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {step.description}
                                        </span>
                                    </span>
                                </a>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
