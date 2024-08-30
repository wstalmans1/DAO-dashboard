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



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="dark">
            <RouterProvider router={router} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);