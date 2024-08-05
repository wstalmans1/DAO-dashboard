/*






import React, {useMemo} from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import NotFoundPage from "./components/NotFoundPage";
import PartySplit from "./components/PartySplit";
import PayWithMetamask from "./components/PayWithMetamask";
import ERC20 from "./components/ERC20";
import DeathmanSwitch from "./components/DeathmanSwitch";
import Civic from "./components/Civic";
import './styles/main.css';

import { WagmiProvider, createConfig, useWalletClient } from "wagmi";
import { sepolia, mainnet, polygon, polygonMumbai, linea, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { BrowserProvider, JsonRpcSigner, Signer } from 'ethers';
import {EthereumGatewayWallet, GatewayProvider } from "@civic/ethereum-gateway-react";



const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia, mainnet, polygon, polygonMumbai, linea, optimism],
    walletConnectProjectId: 'default_project_id',
    appName: "TBA DAO",
  }),
);

const queryClient = new QueryClient();


// Add your wallet and gatekeeperNetwork configuration
/*
const wallet = {
  address: undefined, // Update with actual wallet address
  signer: undefined,  // Update with actual signer instance
};
*/


/*
// Creating wallet and gatekeeper parameters for the GatewayProvider
const gatekeeperNetwork = process.env.REACT_APP_GATEKEEPER_NETWORK || "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6";

// Define a custom interface for the wallet client
interface WalletClient {
  account: { address: string };
  chain: {
    id: number;
    name: string;
    contracts?: {
      ensRegistry?: { address: string };
    };
  };
  transport: any; // Replace 'any' with the specific type if known
}

export function walletClientToSigner(walletClient: WalletClient): Signer {
  const { account, chain, transport } = walletClient;
  const network = {
      chainId: chain?.id,
      name: chain?.name,
      ensAddress: chain?.contracts?.ensRegistry?.address,
  };

  const provider = new BrowserProvider(transport, network);
  return new JsonRpcSigner(provider, account?.address);
}

const useWallet = (): EthereumGatewayWallet | undefined => {
  const { data: walletClient } = useWalletClient();

  const signer = useMemo(() => {
      // the wallet client chain is set asynchronously, so wait until
      // it's set before creating a signer
      if (!walletClient?.chain) return undefined;

      if (walletClient && walletClient?.account) {
        return walletClientToSigner(walletClient);
      }
    }, [walletClient]);

  return signer && {
      address: walletClient?.account?.address,
      signer: signer,
  };
}

const wallet = useWallet();

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="dark">
          <GatewayProvider wallet={wallet} gatekeeperNetwork={gatekeeperNetwork}>
            <RouterProvider router={router} />
          </GatewayProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

*/