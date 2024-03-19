import { useState } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import { JobApplication } from '../models';
import { useNavigate } from 'react-router-dom';

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
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cv) {
      console.error('CV file is required.');
      return;
    }

    try {
      // Upload CV file to S3
      const cvFile = await Storage.put(`cvs/${formData.name}-cv`, formData.cv, {
          contentType: formData.cv.type,
      });
  

      // Save the job application data with CV URL
      const jobApplication = await DataStore.save(
        new JobApplication({
          Name: formData.name,
          CoverLetter: formData.about,
          Role: formData.role,
          Town: formData.town,
          PreviousExprience: formData.experience,
          Age: formData.age,
          Email: formData.email,
          Telephone: formData.telephone,
          Contact: formData.contact,
          Interviewed: false,
          InterviewSet: false,
          NotInterested: false,
          CV: cvFile.key, // Save the S3 key of the uploaded CV
        })
      );

      console.log('Job application saved:', jobApplication);
      setMessage(true)
    } catch (error) {
      console.error('Error saving the job application:', error);
    }
  };

  const [message, setMessage] = useState(false)

  const Navigate = useNavigate()



                    
  return (
    <div >
      {message && 
      <div className="bg-white shadow sm:rounded-lg fixed">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Your Application Has Been Submitted </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            We have received your application and will be in touch soon. Thank you for your interest in working with us.
          </p>
        </div>
        <div className="mt-5">
          <button
          onClick={function() {
            Navigate('/')
          }
          }
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
      }
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
                  rows={20}
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
      value={formData.role} // Ensure that the selected value is bound to the formData
      name="role"
      autoComplete="role"
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option value="">Select a role</option>
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
                  rows={20}
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
  </div>
  );
}
