import CustomerEdit from './customeredit.jsx';
import CustomerEvent from './customerevent.jsx';
import TrexModel from './trexmodel.jsx';
import './customerfont.css'


const collections = [
    {
      name: "Book a Session",
      href: '/sessionlogin',
      imageSrc: 'https://media.giphy.com/media/SrzTefRVxXbJvso2zl/giphy.gif',
      imageAlt: 'Kids Playing',
    },
    {
      name: "Book a Party",
      href: '#',
      imageSrc: 'https://media.giphy.com/media/SZsIexGQJc03oNSM7K/giphy.gif',
      imageAlt: 'Man wearing a charcoal gray cotton t-shirt.',
    },
    {
      name: 'Private Hire',
      href: '#',
      imageSrc: 'https://media.giphy.com/media/YPFTnF2RlsmegYZdGF/giphy.gif',
      imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
    },
  ]
  
  export default function Example() {
    return (
      <div className="relative bg-white mb-5">
        <CustomerEdit />
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
                      <a href={collection.href}>
                        <span className="absolute inset-0 component-title" />
                        {collection.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
    
    );
            }    