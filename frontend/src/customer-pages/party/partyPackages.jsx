import React from 'react';
import { Link } from 'react-router-dom';
import Packages2 from "./partyPackages2";

export default function Packages() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Party Packages</h2>
          <Link to="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          {/* First Party */}
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
            <img
              src="https://media.giphy.com/media/SZsIexGQJc03oNSM7K/giphy.gif"
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              className="object-cover object-center group-hover:opacity-75"
            />
            <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
            <div className="flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  <Link to="/trexparty">
                    <span className="absolute inset-0" />
                    T-Rex Party
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Book Now
                </p>
              </div>
            </div>
          </div>

          {/* Second Party */}
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <img
              src="https://media.giphy.com/media/CIUUKp7vsPdy8/giphy.gif"
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />

            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link to="/character">
                    <span className="absolute inset-0" />
                    Character Parties
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Book Now
                </p>
              </div>
            </div>
          </div>

          {/* Third Party */}
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <img
              src="https://media.giphy.com/media/wcfQ8BPg1QK1aEut8a/giphy.gif"
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link to="/disco">
                    <span className="absolute inset-0" />
                    Disco Party
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Book Now
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <Link to="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

      </div>

      <Packages2 />

    </div>
  );
}
