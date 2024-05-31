import React, { useEffect, useState } from 'react';
import SessionCalenderTill from './sessioncalendertill';
import StaffTill from './StaffTill';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import SessionCalender from './sessionCalender';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';



export default function SessionBook() {
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [childData, setChildData] = useState([{ age: '' }]);
  const [name, setName] = useState("");
  const [staff, setStaff] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [sessions, setSessions] = useState([]);
  const [price, setPrice] = useState(0);
const [dontRenderForm, setDontRenderForm] = useState(false);
 
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setNumber] = useState(''); 
  

  console.log(children, adults, date)

  const Navigate = useNavigate();

  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setChildData(Array.from({ length: value }, () => ({ name: '', age: '' })));
  };

  // get email from auth

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      setEmail(user.attributes.email);
    });
  }, []);


  const fetchSessions = async () => {
    const models = await DataStore.query(Sessions);
    const filteredSessions = models.filter(session => session.Email === email && session.LeftCenter === false && session.Arrived === false);
    
    if (filteredSessions.length >= 2) {
      setDontRenderForm(true);
    } else {
      setDontRenderForm(false);
    }
  }
  

  useEffect(() => {
    fetchSessions();
  }, [email]);


  



  const handleChildAgeChange = (index, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, childAge: value } : data))
    );
  };
  
  
  
  const calculatePrice = (childData, adults, children) => {
    let price = 0;
    childData.forEach((data) => {
      if (data.childAge === "Under 1 year") {
        price += 3.0;
      } else if (data.childAge === "1-2 years old") {
        price += 8.0;
      } else if (data.childAge === "2+") {
        price += 9.0;
      } else if (data.childAge === "sibling") {
        price += 0;
      }
    });
    // Add an extra £2.00 for every adult if there are more adults than children
    console.log(adults)
    const additionalAdults = adults - children;

    if (additionalAdults > 0) {
      // Add £2.00 for each additional adult beyond the number of children
      price += additionalAdults * 2.0;
    }

    return price;
  };

  const handleSubmit = () => {
    const totalPrice = calculatePrice(childData, parseInt(adults), parseInt(children));
    setPrice(totalPrice); // Set the total price state
    setChildData((prev) => prev.map((data) => ({ ...data, TotalSpent: totalPrice })));
    if (totalPrice !== 0) {
      setSubmitted(true);
    } else {
      alert('Please add the childrens Ages to proceed with your booking.');
    }
  };
  



  useEffect(() => {
    const getSession = async () => {
      const models = await DataStore.query(Sessions);
      const filteredSessions = models.filter(session => session.Email === email);
      setSessions(filteredSessions);
    }
  
    getSession();
  }, [email]);


  const AutoFill = () => {
    const session = sessions.find(session => session.id === selectedSession);
    if (session) {
      setName(session.Name);
      console.log(session.Name)
setNumber(session.Number);

      setChildren(session.Children);
      setChildData(Array.from({ length: session.Children }, () => ({ age: '' })));


      console.log(session.Children)
      setAdults(session.Adults);
      console.log(session.Adults)
    }
  }
    

  



  
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 border">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className=" mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl component-title">
                Book Your Session
              </h2>
              <div>
                <h4 className=' component-title text-orange-500 mt-5'>{email}</h4>
              </div>
              {dontRenderForm ? (
                <div>
                <h4 className=' text-orange-500 mt-5'>
  Regrettably, your online booking privileges have been temporarily suspended due to two previous instances of non-attendance. This action is in accordance with our session policy. If you would like to request a reinstatement of your booking privileges, please reach out to our center directly. We appreciate your understanding.
</h4>
<button className="bg-green-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded component-title ml-2 mt-2" onClick={() => {Navigate('/customercontact')}}>Contact Us</button>

                </div>

              ) : (
                <>
                  <div className='mt-5'>
                    {sessions.length > 0 && (
                      <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
                        <option disabled value="">Copy Previous a Session</option>
                        {sessions.map((session, index) => (
                          <option key={index} value={session.id}>
                            {session.Name} - {session.Adults} Adults, {session.Children} Children - {session.Date}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      onClick={AutoFill}
                      className="bg-green-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded component-title ml-2"
                    >
                      AutoFill
                    </button>
                  </div>
                  <label htmlFor="children" className="block component-title mt-2 text-sm font-medium leading-6 text-gray-900">
                    Adult Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    type="text"
                    name="name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={name}
                  />
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm component-title mt-2 font-medium leading-6 text-gray-900"
                    >
                      Telephone
                    </label>
                    <input
                      onChange={(e) => setNumber(e.target.value)}
                      id="number"
                      type='text'
                      name="number"
                      value={telephone}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="adults" className="block text-sm component-title mt-2 font-medium leading-6 text-gray-900">
                      Number of Adults
                    </label>
                    <input
                      onChange={(e) => setAdults(e.target.value)}
                      id="adults"
                      type="number"
                      name="adults"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={adults}
                    />
                  </div>
                  <div>
                    <label htmlFor="children" className="block text-sm component-title mt-2 font-medium leading-6 text-gray-900">
                      Number of Children
                    </label>
                    <input
                      onChange={handleChildrenChange}
                      id="children"
                      type="number"
                      name="children"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={children}
                    />
                  </div>
                  <div>
                    <div>
                      {childData.map((data, index) => (
                        <div key={index}>
                          <div>
                            <label htmlFor={`child-age-${index}`} className="block component-title mt-2 text-sm font-medium leading-6 text-gray-900">
                              Child's Age
                            </label>
                            <select
                              onChange={(e) => handleChildAgeChange(index, e.target.value)}
                              id={`child-age-${index}`}
                              name={`child-age-${index}`}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="">Select an age</option>
                              <option value="Under 1 year">under 1 year</option>
                              <option value="1-2 years old">1-2 years old</option>
                              {childData.length > 1 && <option value="sibling">sibling( 6 months or under)</option>}
                              <option value="2+">2+</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium leading-6 component-title mt-2 text-gray-900">
                        Date
                      </label>
                      <input
                        onChange={(e) => setDate(e.target.value)}
                        id="date"
                        type="date"
                        name="date"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-2 text-sm font-bold text-gray-500">Terms Of Service</p>
                    <p className="mt-2 text-sm text-gray-900"> Disclaimer for Online Bookings:
  
                      At Cheeky Dino, we prioritize the safety and enjoyment of all our visitors. To maintain a safe and fair environment for everyone, it's essential that accurate information is provided when booking tickets online or using our online services.
  
                      By using our online booking platform, you agree to adhere to our code of practice and transparency. This includes providing truthful and accurate information, especially regarding age for discounted rates.
  
                      Please be advised that intentionally providing incorrect information, such as incorrect ages to receive discounted rates, is strictly prohibited. Inaccurate information provided during online booking may result in refusal of entry or services without refund.
  
                      We reserve the right to verify the accuracy of information provided and to take appropriate action if discrepancies are found. This may include adjusting pricing to reflect the correct age category or refusing entry.
  
                      Thank you for your cooperation in helping us maintain a safe and enjoyable experience for all our guests.
  
                      Please contact us if you have any questions or require further information.
  
                    </p>
                    <p className="mt-2 text-sm text-gray-900">Privacy Policy
                       Data Security and GDPR Compliance:
  
                      At Cheeky Dino, we take the privacy and security of your personal information seriously. Any information provided during the booking process is saved securely and is used solely for business purposes within Cheeky Dino. We do not share this personal information with any other parties.
  
                      We are committed to complying with the General Data Protection Regulation (GDPR) rules. If you wish for your personal data to be deleted, please submit a written request, and we will promptly delete it from our records. Additionally, you have the right to make a Subject Access Request (SAR) in writing to obtain information about the personal data we hold about you.
  
                      Please rest assured that we adhere to strict data protection protocols to ensure the confidentiality and integrity of your information at all times.
  
                      Thank you for entrusting us with your personal information. If you have any concerns or questions regarding data privacy, please don't hesitate to contact us.
                    </p>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border component-title mt-2 border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-orange-500 md:py-4 md:text-lg md:px-10"
                    >
                      Book
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 border">
        {submitted && (
          <SessionCalender children={children} adults={adults} date={date} childData={childData} telephone={telephone}
            email={email} name={name} price={price} />
        )}
      </div>
    </div>
  );
  
}
