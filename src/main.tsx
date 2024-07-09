import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import NotFoundPage from "./components/NotFoundPage";
import PartySplit from "./components/PartySplit";
import PayWithMetamask from "./components/PayWithMetamask";
import PayWithSigner from "./components/PayWithSigner";
import DeathmanSwitch from "./components/DeatmanSwitch";
import './styles/main.css';

import { WagmiProvider, createConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia, mainnet],
    walletConnectProjectId: 'default_project_id',
    appName: "TBA DAO",
  }),
);

const queryClient = new QueryClient();


const router = createHashRouter([ 
  { path: "/", element: <HomePage />, errorElement: <NotFoundPage />},
  { path: "/dashboard", element: <Dashboard />, children: [
      { path: "splitparty", element: <PartySplit />},
      { path: "deathmanswitch", element: <DeathmanSwitch />},
      { path: "paywithmetamask", element: <PayWithMetamask />},
      { path: "paywithsigner", element: <PayWithSigner />},
  ]},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="light">
          <RouterProvider router={router} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
