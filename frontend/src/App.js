import {Routes, Route, Router} from 'react-router-dom';
import Navbar from './Navbar';
import Trex from '../src/customer-pages/party/Trex';
import Character from '../src/customer-pages/party/Character';
import Packages from './customer-pages/party/partyPackages';
import Login from './Login/Login';
import Register from './Login/Register';
import Chat from './staffpages/ChatDashboard';
import Calender from './staffpages/Calender';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import React from 'react';
import StaffNav from './staffpages/staffNav';
import { DataStore } from 'aws-amplify';
import PartyGuests from './customer-pages/customerlogin/PartyGuests';
import { Messages } from '../src/staffpages/models';
import Modal from './staffpages/modal';
import { useLocation } from 'react-router-dom';
import TRexCalendar from './customer-pages/party/T-rexCalender';
import ThemedCalendar from './customer-pages/party/themedCalender';
import MyBooking from './customer-pages/customerlogin/mybookings';
import CustomerNav from './customer-pages/customerlogin/customernav';
import Football from './customer-pages/party/Football';
import Kitchen from './staffpages/KitchenHome';
import Till from './staffpages/Till';
import DashBoard from './staffpages/DashBoard';
import SessionBook from './staffpages/customersession';
import Barcode from './staffpages/barcodescanner';
import Tables from './staffpages/tableparent';
import SessionLogin from './staffpages/sessiobooklogin'
import SessionBooking from './staffpages/sessiondetails';
import TillBooking from './staffpages/tillbooking';
import OrderHistory from './staffpages/allorders';
import SessionHistory from './staffpages/sessionhistory';
import PartyHistory from './staffpages/partyhistory';
import Finance from './staffpages/financials';
import Home from './customer-pages/home';
import Order from './staffpages/order';
import Graph from './staffpages/graph';
import Task from './staffpages/Task';
import CustomerScreen from './staffpages/customerscreen';
import SessionCalendar from './staffpages/sessionCalender';
import KidsMenu from './staffpages/kidsmenu'
import SessionToday from './staffpages/todaysbookings';
import EditHome from './staffpages/edithome';
import Shifts from './staffpages/shifts';

const AuthenticatedCalender = withAuthenticator(Calender);
const AuthenticatedChat = withAuthenticator(Chat);
const AuthenticatedBookingForm = withAuthenticator(MyBooking);
const AuthenticatedKitchen = withAuthenticator(Kitchen);
const AuthenticatedTill = withAuthenticator(Till);
const AuthenticatedDashBoard = withAuthenticator(DashBoard);
const AuthenticatedTables = withAuthenticator(Tables);

function App() {
  const [userGroup, setUserGroup] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const location = useLocation();

  React.useEffect(() => {
    Auth.currentSession().then((session) => {
      const groups = session.getIdToken().payload['cognito:groups'] || [];
      setUserGroup(groups[0] || '');
    });
  }, []);

  const allowedLocations = ['/calender', '/kitchen', '/Till', '/dashboard', '/Barcode', '/Tables', '/TillBooking', '/orders', '/sessionhistory', '/partyhistory', '/finance', '/Graph', '/Tasks', '/Customerscreen','/chat']; // list of locations where the modal should appear

  React.useEffect(() => {
    const subscription = DataStore.observe(Messages).subscribe((msg) => {
      if (allowedGroups.includes(userGroup) && allowedLocations.includes(location.pathname)) {
        setShowModal(true);
        setModalContent(msg.element.content)
      }
    });
    return () => subscription.unsubscribe();
  }, [userGroup, location]);


  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsSignedIn(true))
      .catch(() => setIsSignedIn(false));
  }, []);

  React.useEffect(() => {
    if (location.pathname !== '/chat') {
      setShowModal(true);
    }
  }, [messages, location]);

  const allowedGroups = [
    'Developer',
    'Staff',
    'PartyHosts',
    'Admin',
    'SuperUser',
    'TeamLeader',
    'Kitchen',
    'FrontDesk',
    'Cafe',

  ];
  const mostRecentMessage = messages[messages.length - 1];

  return (
    <>
      {isSignedIn &&
  !allowedGroups.includes(userGroup) &&
  !['/dashboard', '/kitchen','/Tables','/finance','/chat'].includes(location.pathname) ? (
    <CustomerNav />
  ) : isSignedIn &&
    allowedGroups.includes(userGroup) &&
    !['/dashboard', '/kitchen','/Tables','/finance','/chat', '/till'].includes(location.pathname) ? (
    <StaffNav />
  ) : !['/dashboard', '/kitchen', '/Tables','/finance','/chat', '/till'].includes(location.pathname) ? (
    <Navbar />
  ) : null}
      <Routes>
        {isSignedIn && !allowedGroups.includes(userGroup) && (
          <>
            <Route path="/my-booking" element={<MyBooking />} />
            <Route path="/add-guests" element={<PartyGuests />} />
            <Route path="/sessionbookings" element={<SessionBooking />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/kidsmenu" element = {<KidsMenu />} />

          </>
        )}
      </Routes>
      <Routes>
        {allowedGroups.includes(userGroup) && (
          <>
            <Route path="/calender" element={<AuthenticatedCalender />} />
            <Route path="/chat" element={<AuthenticatedChat />} />
            
            <Route path= "/kitchen" element={<AuthenticatedKitchen />} />
            <Route path="/Till" element={<AuthenticatedTill />} />
            <Route path="/dashboard" element={<AuthenticatedDashBoard />} />
            <Route path= "/Barcode" element={<Barcode />} />
            <Route path= "/Tables" element={<AuthenticatedTables />} />
            <Route path= "/TillBooking" element={<TillBooking />} />
            <Route path= "/orders" element={<OrderHistory />} />
            <Route path= "/sessionhistory" element={<SessionHistory/>} />
            <Route path= "/partyhistory" element={<PartyHistory />} />
            <Route path= "/finance" element={<Finance />} />
            <Route path= "/Graph" element={<Graph />} />
            <Route path= "/Tasks" element={<Task />} />
            <Route path= "/Customerscreen" element={<CustomerScreen />} />
            <Route path= "/timeslot" element={<SessionToday/>} />
            <Route path= "/edithome" element={<EditHome/>} />
            <Route path= "/staff" element = {<Shifts/>} />
            

          </>
        )}
      </Routes>
      <Routes>
        <Route path="/trexparty" element={<Trex />} />
        <Route path="/football" element={<Football />} />
        <Route path="/character" element={<Character />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/login" element={<Login />} />
        <Route path= "/sessionlogin" element= {<SessionLogin/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/trexparty/calendar" element={<TRexCalendar />} />
        <Route path="/themed" element={<ThemedCalendar />} />
        <Route path="/session" element={<SessionBook />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
      
    </>
  );
}

export default App;
