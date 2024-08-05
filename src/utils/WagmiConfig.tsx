import { createConfig } from "wagmi";
import { sepolia, mainnet, polygon, polygonMumbai, linea, optimism } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";


const wagmiConfig = createConfig(
    getDefaultConfig({
      // Your dApps chains
      chains: [sepolia, mainnet, polygon, polygonMumbai, linea, optimism],
      walletConnectProjectId: 'default_project_id',
      appName: "TBA DAO",
    }),
  );

export default wagmiConfig;