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
import SessionBook from './staffpages/sessionbooker';
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

  const location = useLocation();

  React.useEffect(() => {
    Auth.currentSession().then((session) => {
      const groups = session.getIdToken().payload['cognito:groups'] || [];
      setUserGroup(groups[0] || '');
    });
  }, []);

  React.useEffect(() => {
    const subscription = DataStore.observe(Messages).subscribe(() => {
      DataStore.query(Messages).then(setMessages);
    });
    return () => subscription.unsubscribe();
  }, []);

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
    'Cafe'

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
    !['/dashboard', '/kitchen','/Tables','/finance','/chat'].includes(location.pathname) ? (
    <StaffNav />
  ) : !['/dashboard', '/kitchen', '/Tables','/finance','/chat'].includes(location.pathname) ? (
    <Navbar />
  ) : null}
      <Routes>
        {isSignedIn && !allowedGroups.includes(userGroup) && (
          <>
            <Route path="/my-booking" element={<MyBooking />} />
            <Route path="/add-guests" element={<PartyGuests />} />
            <Route path="/sessionbookings" element={<SessionBooking />} />
            <Route path="/order" element={<Order />} />

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
