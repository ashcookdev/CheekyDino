import {Routes, Route, Router} from 'react-router-dom';
import Navbar from './Navbar';
import Trex from '../src/customer-pages/party/Trex';
import Character from '../src/customer-pages/party/Character';
import Packages from './customer-pages/party/partyPackages';
import Login from './customer-pages/Login/Login';
import Register from './customer-pages/Login/Register';
import Chat from './staffpages/ChatDashboard';
import Calender from './staffpages/Calender';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import React from 'react';
import StaffNav from './staffpages/staffNav';
import { DataStore } from 'aws-amplify';
import PartyGuests from './customer-pages/customerlogin/PartyGuests';
import { Messages, PartyBooking } from './models';
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
import KidsMenu from './staffpages/menu'
import SessionToday from './staffpages/todaysbookings';
import EditHome from './staffpages/edithome';
import Shifts from './staffpages/shifts';
import DiscoParty from './customer-pages/party/discoparty';
import LaserParty from './customer-pages/party/Laserparty';
import LaserPartyCalender from './customer-pages/party/laserpartycalender';
import TeddyParty from './customer-pages/party/Teddyparty';
import TeddyPartyCalender from './customer-pages/party/teddycalender';
import PrivateHire from './customer-pages/party/privatehire';
import PrivateHireCalender from './customer-pages/party/privatehirecalender';
import PrivateHireRegister from './customer-pages/party/privatehireregister';
import ClockIn from './staffpages/staffactions';
import StarterForm from './staffpages/starterform';
import StaffDetails from './staffpages/staffdetails';
import Settings from './staffpages/settings';
import StockControl from './staffpages/stockcontrol';
import BuildAMeal from './staffpages/buildameal';
import MealProfit from './staffpages/mealprofitmargins';
import PartyStock from './staffpages/partystock';
import TillProducts from './staffpages/tillproducts';
import BookNow from './staffpages/tillbooking';
import BookLater from './staffpages/sessionbooker';
import EditBooking from './staffpages/editbooking';
import MakeReservation from './staffpages/makereservation';
import TableLayout from './staffpages/tablelayout';
import MasterClose from './staffpages/masterclose';
import TillHistory from './staffpages/tillhistory';
import Training from './training/traininghome';
import PreBookTill from './staffpages/PrebookTill';
import MoveTables from './staffpages/movetables';
import CustomerScreenFront from './staffpages/prebook/customerscreenfront';
import PreBook from './staffpages/prebook/prebookhome';
import MoveTables2 from './staffpages/movetables2';
import PreBookTill2 from './staffpages/PrebookTill2';
import TestTill from './staffpages/testtill';
import Audio from './staffpages/audiochat';
import ControlPanel from './staffpages/ControlPanel';
import UsedByStock from './staffpages/UsedByStock';
import Jobs from './customer-pages/Careers';
import Application from './customer-pages/applicationform';
import StockSwap from './staffpages/stockswap';
import ShoppingList from './staffpages/ShoppingList';
import CreateEvent from './staffpages/createevent';
import Event from './customer-pages/events';
import Eventregister from './customer-pages/Login/eventregister';
import EventDetails from './customer-pages/eventdetails';
import StockPdf from './staffpages/stockpdf';
import PaymentSession from './customer-pages/paymentSession';
import PaymentTest from './staffpages/paymenttest';
import Confirmation from './staffpages/confirmation';
import Payments from './staffpages/payments';
import HomeCookedFinance from './staffpages/homecookedorders';
import ManualEntry from './staffpages/manualentry';
import Applications from './staffpages/applications';
import CareerRegister from './customer-pages/Login/careerRegister';
import TillBack from './staffpages/tillback';
import BranchSettings from './staffpages/branchsettings';
import Announcement from './staffpages/Announcement';
import EditBookingFromTable from './staffpages/editbookingfromtable';
import CustMessages from './customer-pages/contactus';
import CustEnquire from './staffpages/customercontact';
import RegisterEnquiry from './customer-pages/Login/enquiryregister';
import EnquiryContact from './customer-pages/enquirycontact';
import MarketingSuite from './staffpages/marketingsuite';
import TaskManager from './staffpages/stafftasks';
import PartyStaffCalender from './staffpages/PartyStaffCalendar';
import Unsubscribe from './customer-pages/unsubscribe';
import SecondDisplay from './staffpages/seconddisplay';
import StaffIntro from './staffpages/staffintro';








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


 
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsSignedIn(true))
      .catch(() => setIsSignedIn(false));
  }, []);



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



  return (
    <>
    
      {isSignedIn &&
        !allowedGroups.includes(userGroup) &&
        !['/dashboard', '/kitchen', '/Tables', '/finance', '/chat'].includes(
          location.pathname
        ) ? (
        <CustomerNav />
      ) : isSignedIn &&
        allowedGroups.includes(userGroup) &&
        ![
          '/dashboard',
          '/Tables',
          '/finance',
          '/chat',
          '/till',
          '/customerscreen',
          '/training/',
          '/customerscreenfront',
          '/customerprebooking',
          '/confirmation',
          '/staffintro',
        ].includes(location.pathname) ? (
        <StaffNav />
      ) : ![
          '/dashboard',
          '/kitchen',
          '/Tables',
          '/finance',
          '/chat',
          '/till',
          '/customerscreen',
          '/training/',
          '/customerscreenfront',
          '/customerprebooking',
          '/confirmation',
          '/staffintro',
        ].includes(location.pathname) ? (
        <Navbar />
      ) : null}
      <Routes>
        {isSignedIn && !allowedGroups.includes(userGroup) && (
          <>
            <Route path="/my-booking" element={<MyBooking />} />
            <Route path='/customercontact' element={<CustMessages />} />
            <Route path="/add-guests" element={<PartyGuests />} />
            <Route path="/sessionbookings" element={<SessionBooking />} />
            <Route path="/bookedevents" element={<EventDetails />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/kidsmenu" element={<KidsMenu />} />
            <Route path= "/enquirycontact" element={<EnquiryContact />} />
            <Route path= "/unsubscribe" element={<Unsubscribe />} />

            {/* <Route path="/payments" element={<Payments />} /> */}
          </>
        )}
      </Routes>

      <Routes>
        
        {allowedGroups.includes(userGroup) && (
          <>
            <Route path="/calender" element={<AuthenticatedCalender />} />
            <Route path="/chat" element={<AuthenticatedChat />} />
            <Route path="/kitchen" element={<AuthenticatedKitchen />} />
            <Route path="/Till" element={<AuthenticatedTill />} />
            <Route path="/dashboard" element={<AuthenticatedDashBoard />} />
            <Route path="/Barcode" element={<Barcode />} />
            <Route path="/Tables" element={<AuthenticatedTables />} />
            <Route path="/TillBooking" element={<TillBooking />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/sessionhistory" element={<SessionHistory />} />
            <Route path="/partyhistory" element={<PartyHistory />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/Graph" element={<Graph />} />
            <Route path="/Customerscreen" element={<CustomerScreen />} />
            <Route path="/timeslot" element={<SessionToday />} />
            <Route path="/edithome" element={<EditHome />} />
            <Route path="/staff" element={<Shifts />} />
            <Route path="/clockin" element={<ClockIn />} />
            <Route path="/starterform" element={<StarterForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path= "/stockcontrol" element={<StockControl />} />
            <Route path="/buildameal" element={<BuildAMeal />} />
            <Route path="/mealprofit" element={<MealProfit />} />
            <Route path="/partystock" element={<PartyStock />} />
            <Route path="/tillproducts" element={<TillProducts />} />
            <Route path="/booknow" element={<BookNow />} />
            <Route path="/booklater" element={<BookLater />} />
            <Route path="/editbooking" element={<EditBooking />} />
            <Route path= "/reservations" element={<MakeReservation />} />
            <Route path="/tablelayout" element={<TableLayout />} />
            <Route path="/masterclose" element={<MasterClose />} />
            <Route path="/tillhistory" element={<TillHistory />} />
            <Route path ="/training" element={<Training />} />
            <Route path="/prebooktill" element={<PreBookTill />} />
            <Route path="/movetable" element={<MoveTables />} />
            <Route path='/customerscreenfront' element={<CustomerScreenFront />} />
            <Route path = '/movetables2'element={<MoveTables2 />} />
            <Route path='/prebooktill2' element={<PreBookTill2 />} />
            <Route path= '/testtill' element={<TestTill />} />
            <Route path= '/audio' element={<Audio />} />
            <Route path= '/controlpanel' element={<ControlPanel />} />
            <Route path= '/usedby' element={<UsedByStock />} />
            <Route path='/stockswap' element={<StockSwap />} />
            <Route path='/shoppinglist' element={<ShoppingList />} /> 
            <Route path='/createevent' element={<CreateEvent />} />
            <Route path= '/stockpdf' element={<StockPdf />} />
            <Route path= '/paymenttest' element={<PaymentTest />} />
            <Route path= '/confirmation' element={<Confirmation />} />
            <Route path= '/hcmhistory' element={<HomeCookedFinance />} />
            <Route path= '/entry' element={<ManualEntry />} />
            <Route path= '/applications' element={<Applications />} />
            <Route path= '/tillback' element={<TillBack />} />
            <Route path= '/branchsettings' element={<BranchSettings />} />
            <Route path= '/announcement' element={<Announcement />} />
            <Route path= '/addguestbookings' element={<EditBookingFromTable />} />
            <Route path= "/staff/staffedit" element={<StaffDetails />} />
            <Route path='/customerenquiries' element={<CustEnquire />} />
            <Route path= '/marketingsuite' element={<MarketingSuite />} />
            <Route path= '/taskmanager' element={<TaskManager />} />
            <Route path='/partybooking' element={<PartyBooking />} />
            <Route path='/secondscreen' element={<SecondDisplay />} />
            <Route path='/staffintro' element= {<StaffIntro />} />

<Route path="/staff/shiftbooking" element={<PartyStaffCalender />} />
          </>
        )}
        
      
      
      </Routes>
      <Routes>
        <Route path="/trexparty" element={<Trex />} />
        <Route path="/disco" element={<DiscoParty />} />
        <Route path="/laser" element={<LaserParty />} />
        <Route path="/laserparty" element={<LaserPartyCalender />} />
        <Route path="/teddy" element={<TeddyParty />} />
        <Route path="/teddyparty" element={<TeddyPartyCalender />} />
        <Route path="/privatehire" element={<PrivateHire />} />
        <Route path="/privatehirecalender" element={<PrivateHireCalender />} />
        <Route path='/events' element={<Event />} />
        <Route path="/enquiryregister" element={<RegisterEnquiry />} />

        
        <Route path="/football" element={<Football />} />
        <Route path="/character" element={<Character />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sessionlogin" element={<SessionLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privatehireregister" element={<PrivateHireRegister />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path= "/jobs/apply" element={<Application />} />
        <Route path="/eventregister" element={< Eventregister />} />
        <Route path="/paymentsession" element={<PaymentSession />} />
        <Route path='/careerregister' element={<CareerRegister />} />
        
        


        <Route
          path="/trexparty/calendar"
          element={<TRexCalendar />}
        />
        <Route
          path="/themed"
          element={<ThemedCalendar />}
        />
        <Route
          path="/session"
          element={<SessionBook />}
        />
        <Route
          path="/customerprebooking"
          element={<PreBook />}
        />

        <Route
          path="/" 
          element={
             
                  <Home />
              } 
         /> 
      </Routes>
      <Routes>
  
</Routes>
    </>
  );
  
}

export default App;

//import { Router, Route } from 'electron-router-dom';

