import React from 'react';
import { Router, Route } from 'electron-router-dom';

// ... (previous imports)

// Replaced imports from staffpages with corresponding electroncomponents

import Chat from './electroncomponents/ChatDashboard';
import Calender from './electroncomponents/Calender';
import Kitchen from './electroncomponents/KitchenHome';
import Till from './electroncomponents/Till';
import DashBoard from './electroncomponents/DashBoard';
import SessionBook from './electroncomponents/customersession';
import Barcode from './electroncomponents/barcodescanner';
import Tables from './electroncomponents/tableparent';
import SessionLogin from './electroncomponents/sessiobooklogin';
import SessionBooking from './electroncomponents/sessiondetails';
import TillBooking from './electroncomponents/tillbooking';
import OrderHistory from './electroncomponents/e-allorders';
import SessionHistory from './electroncomponents/sessionhistory';
import PartyHistory from './electroncomponents/partyhistory';
import Finance from './electroncomponents/financials';
import Graph from './electroncomponents/graph';
import CustomerScreen from './electroncomponents/customerscreen';
import SessionToday from './electroncomponents/todaysbookings';
import EditHome from './electroncomponents/edithome';
import Shifts from './electroncomponents/shifts';
import ClockIn from './electroncomponents/staffactions';
import StarterForm from './electroncomponents/starterform';
import Settings from './electroncomponents/settings';
import StockControl from './electroncomponents/stockcontrol';
import BuildAMeal from './electroncomponents/buildameal';
import MealProfit from './electroncomponents/mealprofitmargins';
import PartyStock from './electroncomponents/partystock';
import TillProducts from './electroncomponents/tillproducts';
import BookNow from './electroncomponents/tillbooking';
import BookLater from './electroncomponents/sessionbooker';
import EditBooking from './electroncomponents/editbooking';
import MakeReservation from './electroncomponents/makereservation';
import TableLayout from './electroncomponents/tablelayout';
import MasterClose from './electroncomponents/masterclose';
import TillHistory from './electroncomponents/tillhistory';
import Training from './training/traininghome';
import PreBookTill from './electroncomponents/PrebookTill';
import MoveTables from './electroncomponents/movetables';
import CustomerScreenFront from './electroncomponents/prebook/ecustomerscreenfront';
import MoveTables2 from './electroncomponents/movetables2';
import PreBookTill2 from './electroncomponents/PrebookTill2';
import TestTill from './electroncomponents/testtill';
import ControlPanel from './electroncomponents/ControlPanel';

export default function ElectronRoutes() {
  return (
    <Router main={
      <>
<Route path="/" component={DashBoard} />
<Route path="/dashboard" component={DashBoard} />
        <Route path="/sessionbookings" component={SessionBooking} />
        <Route path="/calender" component={Calender} />
        <Route path="/chat" component={Chat} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/Till" component={Till} />
        <Route path="/Barcode" component={Barcode} />
        <Route path="/Tables" component={Tables} />
        <Route path="/TillBooking" component={TillBooking} />
        <Route path="/orders" component={OrderHistory} />
        <Route path="/sessionhistory" component={SessionHistory} />
        <Route path="/partyhistory" component={PartyHistory} />
        <Route path="/finance" component={Finance} />
        <Route path="/Graph" component={Graph} />
        <Route path="/Customerscreen" component={CustomerScreen} />
        <Route path="/timeslot" component={SessionToday} />
        <Route path="/edithome" component={EditHome} />
        <Route path="/staff" component={Shifts} />
        <Route path="/clockin" component={ClockIn} />
        <Route path="/starterform" component={StarterForm} />
        <Route path="/settings" component={Settings} />
        <Route path= "/stockcontrol" component={StockControl} />
        <Route path="/buildameal" component={BuildAMeal} />
        <Route path="/mealprofit" component={MealProfit} />
        <Route path="/partystock" component={PartyStock} />
        <Route path="/tillproducts" component={TillProducts} />
        <Route path="/booknow" component={BookNow} />
        <Route path="/booklater" component={BookLater} />
        <Route path="/editbooking" component={EditBooking} />
        <Route path= "/reservations" component={MakeReservation} />
        <Route path="/tablelayout" component={TableLayout} />
        <Route path="/masterclose" component={MasterClose} />
        <Route path="/tillhistory" component={TillHistory} />
        <Route path ="/training" component={Training} />
        <Route path="/prebooktill" component={PreBookTill} />
        <Route path="/movetable" component={MoveTables} />
        <Route path='/customerscreenfront' component={CustomerScreenFront} />
        <Route path="/movetable2" component={MoveTables2} />
        <Route path="/prebooktill2" component={PreBookTill2} />
        <Route path="/testtill" component={TestTill} />
        <Route path= '/controlpanel' element={<ControlPanel />} />

        
      </>
    } />
  );
}
