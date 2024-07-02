import { useAccount, useBalance } from 'wagmi';
import { ConnectKitButton } from "connectkit";

import { formatUnits } from 'viem';



const ConnectionDot2 = () => {

  const { isConnected, address } = useAccount();
  const { data: balanceData } = useBalance({ address });

  const formattedBalance = balanceData ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(2) : '0.00';

  return (
    <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="ml-2 mr-3">{isConnected ? `Connected` : 'Not Connected'}</span>
              <ConnectKitButton />
    </div>
  );
};

export default ConnectionDot2;