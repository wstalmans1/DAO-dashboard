import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function HomePage() {
    return (
      <div className="min-h-screen flex flex-col justify-center p-5 bg-gradient-to-british-racing-green text-gray-50 items-center">
        <h1 className="text-4xl mb-4 p-10 flex flex-col justify-center h-20 md:h-40 items-stretch rounded-md bg-gradient-to-r from-british-racing-green to-rich-gold">Global Team Blockchain Advisors</h1>
<<<<<<< HEAD
        <p className="text-lg pt-6 text-center">Welcome to your DAO. <br />
          Start producing, contributing and managing:<br />
          <Link to="/dashboard" className="text-red-300 hover:underline">Go to the Dashboard</Link>.</p>
        <div className="flex flex-col list-disc mt-10 ml-20">
          <p style={{ paddingLeft: '1em', textIndent: '-1em' }} className="pb-3">• Build your reputation by realising, selling and contributing to products & the DAO</p>
          <p style={{ paddingLeft: '1em', textIndent: '-1em' }} className="pb-3">• Mint tokens by building your reputation</p>
=======
        <p className="text-lg pt-6 text-center">The community driven collaboration platform. <br />
          <br />
          <Link to="/dashboard" className="text-red-300 hover:underline">Go to the Dashboard</Link>
          <br />
          <br />
          Mint <span title="DAO is the native token of TBA DAO and is minted as a result of reputation building">tokens</span> by building reputation through <br />helping colleagues, producing products, < br/>and managing the DAO.<br />
        </p>
        <div className="flex flex-col list-disc mt-10 ml-20">
>>>>>>> b72aae6 (Initial commit after bitdefender reset)
          <p style={{ paddingLeft: '1em', textIndent: '-1em' }} className="pb-3">• Sell tokens to clients to pay for services</p>
          <p style={{ paddingLeft: '1em', textIndent: '-1em' }} className="pb-3">• Adhere to the DAO Constitution</p> 
          <p style={{ paddingLeft: '1em', textIndent: '-1em' }} className="pb-3">• Govern the DAO's Constitution and operations</p>
          <p style={{ paddingLeft: '1em', textIndent: '-1em' }} className="pb-3">• Manage your role in the DAO</p>
        </div>
    </div>
    );
  }