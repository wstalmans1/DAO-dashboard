<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

// Components
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import NotFoundPage from "./components/NotFoundPage";
import PartySplit from "./components/PartySplit";
import PayWithMetamask from "./components/PayWithMetamask";
import ERC20 from "./components/ERC20";
import DeathmanSwitch from "./components/DeathmanSwitch";
import Civic from "./components/Civic";

// Styles
import './styles/main.css';

// Providers Wagmi, QueryClient, ConnectKit
import { WagmiProvider } from "wagmi";
import wagmiConfig from "./utils/WagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";


const queryClient = new QueryClient();

const router = createHashRouter([ 
  { path: "/", element: <HomePage />, errorElement: <NotFoundPage />},
  { path: "/dashboard", element: <Dashboard />, children: [
      { path: "splitparty", element: <PartySplit />},
      { path: "deathmanswitch", element: <DeathmanSwitch />},
      { path: "paywithmetamask", element: <PayWithMetamask />},
      { path: "erc20", element: <ERC20 />},
      { path: "civic", element: <Civic />},
  ]},
]);
=======
// React
import React from "react";
import ReactDOM from "react-dom/client";
// ethers

// Providers: Wagmi, QueryClient, ConnectKit
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { RouterProvider } from "react-router-dom";
// Configs
import wagmiConfig from "./utils/WagmiConfig";
import queryClient from "./utils/QueryClient";
import router from "./utils/Router";
// Hooks
// Styles
import './styles/main.css';



>>>>>>> b72aae6 (Initial commit after bitdefender reset)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
        <ConnectKitProvider mode="light">
          
            <RouterProvider router={router} />
        
=======
        <ConnectKitProvider mode="dark">
            <RouterProvider router={router} />
>>>>>>> b72aae6 (Initial commit after bitdefender reset)
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);