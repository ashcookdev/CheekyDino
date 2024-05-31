import React from 'react';
import { Link } from 'react-router-dom';
import CustomerEdit from './customeredit.jsx';
import Event from './events.jsx';
import TrexModel from './trexmodel.jsx';
import './customerfont.css';

const collections = [
  {
    name: "Book a Session",
    href: '/sessionlogin',
    imageSrc: 'whatsapp1.jpg',
    imageAlt: 'Kids Playing',
  },
  {
    name: "Book a Party",
    href: '/packages',
    imageSrc: 'whatsapp2.jpg',
    imageAlt: 'Man wearing a charcoal gray cotton t-shirt.',
  },
  {
    name: 'Private Hire',
    href: '/privatehire',
    imageSrc: 'whatsapp3.jpg',
    imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
  },
];

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Book', href: '/sessions' },
    { name: 'Contact', href: '/customercontact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          {/* ... (Facebook icon SVG) */}
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          {/* ... (Instagram icon SVG) */}
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          {/* ... (Twitter icon SVG) */}
        </svg>
      ),
    },
  ],
};

function Example() {
  return (
    <div className="relative bg-white mb-5">
      <CustomerEdit />
      <div className='mt-5 mb-5'>
</div>
      <div className='mt-5 mb-5'>
        <Event />
      </div>

      <section
        aria-labelledby="collection-heading"
        className="relative mt-8 sm:mt-5"
      >
        <h2 id="collection-heading" className="sr-only">
          Collections
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
            >
              <div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <img
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg p-6">
                  <div>
                    <h3 className="mt-1 font-semibold text-white component-title">
                      <Link to={collection.href}>
                        <span className="absolute inset-0 component-title" />
                        {collection.name}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className="mt-10 flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <Link key={item.name} to={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            &copy; 2023 Chimera Trading, Built by VersaSoft Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Example;
