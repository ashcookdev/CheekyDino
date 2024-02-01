import { UserCircleIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Example() {


    const [formData, setFormData] = useState({
        name: '',
        about: '',
        role: '',
        town: '',
        experience: '',
        age: '',
        email: '',
        telephone: '',
        contact: false,
        cv: null,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if formData.cv is not null or undefined
        if (formData.cv) {
            // Convert the file to a base64 string
            const reader = new FileReader();
            reader.readAsDataURL(formData.cv);
            reader.onloadend = async () => {
                let base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    
                // Create a new FormData instance
                let data = {
                    name: formData.name,
                    about: formData.about,
                    role: formData.role,
                    town: formData.town,
                    experience: formData.experience,
                    age: formData.age,
                    email: formData.email,
                    telephone: formData.telephone,
                    contact: formData.contact,
                    cv: base64String
                };
    
                try {
                    // Send the form data to the AWS Lambda function
                    const response = await fetch('https://wlnfq9d452.execute-api.eu-west-2.amazonaws.com/default/Career', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
    
                    // Check if the request was successful
                    if (response.ok) {
                        console.log('Email sent, we will get back to you');
                        return `<div><p>Email sent, we will get back to you</p></div>`;
                    } else {
                        throw new Error('Error sending email');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
    
                // Reset the form data
                setFormData({
                    name: '',
                    about: '',
                    role: '',
                    town: '',
                    experience: '',
                    age: '',
                    email: '',
                    telephone: '',
                    contact: false,
                    cv: null,
                });
            };
        } else {
            console.error('CV file is not provided');
        }
    };
    
    







  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-5">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  onChange={handleChange}
                    value={formData.name}
                  name="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Cover Letter
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                    onChange={handleChange}
                        value={formData.about}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-2">
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                    onChange={handleChange}
                        value={formData.role}
                  name="role"
                  autoComplete="role"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="Cafe Worker/Party Host">Cafe Worker/Party Host</option>
                  <option value="Cook">Cook</option>
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="town" className="block text-sm font-medium leading-6 text-gray-900">
                Town
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="town"
                    onChange={handleChange}
                        value={formData.town}
                  name="town"
                  autoComplete="town"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                Previous Experience
              </label>
              <div className="mt-2">
                <textarea
                  id="experience"
                    onChange={handleChange}
                        value={formData.experience}
                  name="experience"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="age"
                    onChange={handleChange}
                        value={formData.age}
                  name="age"
                  autoComplete="age"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                    onChange={handleChange}
                        value={formData.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="telephone" className="block text-sm font-medium leading-6 text-gray-900">
                Telephone
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  id="telephone"
                    onChange={handleChange}
                        value={formData.telephone}
                  name="telephone"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="contact" className="flex items-center text-sm font-medium leading-6 text-gray-900">
                <input
                  id="contact"
                  name="contact"
                    onChange={handleChange}
                        checked={formData.contact}
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <span className="ml-2">Happy to be contacted</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:col-span-3">
              <label htmlFor="cv" className="block text-sm font-medium leading-6 text-gray-900">
                CV (Resume)
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf, .doc, .docx"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-1 text-sm text-gray-600">Upload your CV in PDF or Word format.</p>
            </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send
        </button>
      </div>
    </form>
  );
}
