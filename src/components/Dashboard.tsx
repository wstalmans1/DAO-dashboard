import '../styles/main.css';
import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet } from "react-router-dom";
import ConnectionDot from '../utils/Connection';
//import ConnectionDot2 from '../utils/Connection2';
//import { ConnectKitButton } from 'connectkit';

export default function Dashboard() {


  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gradient-to-r from-british-racing-green to-lighterbritish-racing-green text-gray-50">
      
      {/* ------- Navigation ------- */}
      <div className="w-full flex-none md:w-64">
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <div className="mb-2 flex flex-col justify-between h-20 md:h-40 items-stretch rounded-md bg-gradient-to-r from-british-racing-green to-rich-gold" >
            <div className="w-full flex flex-col items-start text-xs sm:text-base md:text-lg lg:text-xl p-2">
              <div className="block sm:hidden text-lg">Global Team Blockchain Advisors</div>
              <div className="hidden sm:block">Global</div>
              <div className="hidden sm:block">Team</div>
              <div className="hidden sm:block">Blockchain</div>
              <div className="hidden sm:block">Advisors</div>
            </div>
            <div className="p-2 w-full flex items-end justify-end text-red-800 sm:text-base md:text-l lg:text-l">
              <span className="block sm:hidden">Dashboard</span>
              <span className="hidden sm:block">Dashboard</span>
            </div>
          </div>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
              <NavLink to="/dashboard/splitparty" className={({ isActive }) => `flex h-[48px] grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${ isActive ? 'bg-red-800' : 'bg-green-800 hover:bg-red-900'}`}>
                <UserGroupIcon className="h-5 w-5" />
                <span className="hidden md:block">Split Party</span>
              </NavLink>
              <NavLink to="/dashboard/paywithmetamask" className={({ isActive }) => `flex h-[48px] grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${ isActive ? 'bg-red-800' : 'bg-green-800 hover:bg-red-900'}`}>
                <DocumentDuplicateIcon className="h-5 w-5" />
                <span className="hidden md:block">Pay with MetaMask</span>
              </NavLink>
              <NavLink to="/dashboard/paywithsigner" className={({ isActive }) => `flex h-[48px] grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${ isActive ? 'bg-red-800' : 'bg-green-800 hover:bg-red-900'}`}>
                <DocumentDuplicateIcon className="h-5 w-5" />
                <span className="hidden md:block">Pay with Signer</span>
              </NavLink>
              <div className="hidden h-auto w-full grow rounded-md bg-green-900 md:block"></div>
              <NavLink to="/" className={({ isActive }) => `flex h-[48px] grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${ isActive ? 'bg-red-800' : 'bg-green-800 hover:bg-red-900'}`}>
                <HomeIcon className="h-5 w-5" />
                <span className="hidden md:block">Home</span>
              </NavLink>
              
              {/* <NavLink to="/dashboard/manageconnection" className={({ isActive }) => `flex h-[48px] grow items-center justify-center gap-2 rounded-md text-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${ isActive ? 'bg-red-800' : 'bg-green-800 hover:bg-red-900'}`}> */}
              {/*  <PowerIcon className="h-5 w-5" /> */}
              {/*  <span className="hidden md:block">Connection</span> */}
              {/* </NavLink> */}
            
            </div>
        </div>
      </div>

      {/* ------- Main Content ------- */}
      <div className='flex-grow h-full p-2 md:overflow-y-auto md:p-4'>
        <main className="flex flex-col h-full">
          
          {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"> */}
            {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
            {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
            {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
            {/* <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
          {/*</div> */}
          {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"> */}
            {/* <RevenueChart revenue={revenue}  /> */}
            {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
          {/* </div> */}
          
          <div className="flex items-center pt-1 pb-2">
            {/*<div className="pr-4"><ConnectionDot/></div>*/}
            <div className="flex items-center">
              {/*<ConnectKitButton />*/}
              <ConnectionDot />
              {/*<ConnectionDot2 />*/}
            </div>
          </div>
          <div className="flex-grow bg-white bg-opacity-20 w-full h-full rounded-lg mt-1">
            <Outlet/>
          </div>
        </main>  
      </div>
    </div>
  );
}