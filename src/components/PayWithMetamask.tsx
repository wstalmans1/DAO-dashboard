import React from 'react';
import { useAccount, useBalance, useBlockNumber } from 'wagmi';
import { formatUnits } from 'viem';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const PayWithMetamask: React.FC = () => {
  const queryClient = useQueryClient();
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading, refetch, queryKey } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const formattedBalance = balanceData 
    ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4) 
    : '0.0000';

  // Effect to invalidate and refetch balance when block number changes
  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [blockNumber, queryClient, queryKey]);

  return (
    <div className="flex grow w-full h-full flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Pay with MetaMask</h1>
      {isConnected ? (
        <div>
          <p className="mb-2">Connected Address: {address}</p>
          {isLoading ? (
            <p>Loading balance...</p>
          ) : (
            <p>Balance: {formattedBalance} {balanceData?.symbol}</p>
          )}
          <button 
            onClick={() => refetch()} 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh Balance
          </button>
        </div>
      ) : (
        <p>Please connect your wallet to view your balance.</p>
      )}
    </div>
  );
};

export default PayWithMetamask;