import { createHashRouter } from "react-router-dom";

// Components
import HomePage from "../components/HomePage";
import Dashboard from "../components/Dashboard";
import NotFoundPage from "../components/NotFoundPage";
import PartySplit from "../components/PartySplit";
import PayWithMetamask from "../components/PayWithMetamask";
import ERC20 from "../components/ERC20";
import DeathmanSwitch from "../components/DeathmanSwitch";
import Civic from "../components/Civic";
import Constitution from "../components/Constitution";



const router = createHashRouter([ 
    { path: "/", element: <HomePage />, errorElement: <NotFoundPage />},
    { path: "/dashboard", element: <Dashboard />, children: [
        { path: "splitparty", element: <PartySplit />},
        { path: "deathmanswitch", element: <DeathmanSwitch />},
        { path: "paywithmetamask", element: <PayWithMetamask />},
        { path: "erc20", element: <ERC20 />},
        { path: "civic", element: <Civic />},
        { path: "constitution", element: <Constitution />},
    ]},
  ]);

  export default router;