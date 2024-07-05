import React, { useState } from 'react';
import { useAccount, useBalance, useBlockNumber, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import { BaseError } from 'viem';
import { ConnectKitButton } from "connectkit";

const contractAddress = '0xd34CF2A413c29B058Fd2634d170180cEF38A92Ec';
const contractABI = [
  {"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"rsvp","outputs":[],"stateMutability":"payable","type":"function"}
];

export function PartySplit() {
  const { isConnected, address } = useAccount();
  const { data: balanceData, isLoading: isBalanceLoading, refetch: refetchBalance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const { 
    data: contractData,
    error: contractError,
    isPending: isContractDataPending,
    refetch: refetchContractData
  } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: contractABI,
        functionName: 'cost',
      },
      {
        address: contractAddress,
        abi: contractABI,
        functionName: 'totalDeposits',
      }
    ],
  });

  const { 
    data: hash, 
    error: writeError,
    isPending: isWritePending,
    writeContract
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({ hash });

  const formattedBalance = balanceData 
    ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4) 
    : '0.0000';

  const cost = contractData?.[0]?.result ? Number(formatUnits(contractData[0].result as bigint, 18)).toFixed(4) : '0.0000';
  const totalDeposits = contractData?.[1]?.result ? Number(formatUnits(contractData[1].result as bigint, 18)).toFixed(4) : '0.0000';

  React.useEffect(() => {
    if (blockNumber) {
      refetchContractData();
      refetchBalance();
    }
  }, [blockNumber, refetchContractData, refetchBalance]);

  const handleRefresh = () => {
    refetchContractData();
    refetchBalance();
  };

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRsvpError(null);
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'rsvp',
      value: parseEther(cost),
    });
  };

  React.useEffect(() => {
    if (isConfirmed) {
      refetchContractData();
      refetchBalance();
    }
  }, [isConfirmed, refetchContractData, refetchBalance]);

  if (isContractDataPending) return <div>Loading contract data...</div>;

  if (contractError) {
    return <div>Error: {(contractError as BaseError).shortMessage || contractError.message}</div>;
  }

  return (
    <div className="flex grow w-full h-full flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Party Split</h1>
      <ConnectKitButton.Custom>
        {({ show, ensName }) => (
          <div onClick={show} className="cursor-pointer mb-4">
            {isConnected ? (
              <p>Connected Address: {ensName ? `${ensName} (${address})` : address}</p>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </ConnectKitButton.Custom>
      {isConnected ? (
        <div>
          {isBalanceLoading ? (
            <p>Loading balance...</p>
          ) : (
            <p>Your Balance: {formattedBalance} {balanceData?.symbol}</p>
          )}
          <p>Event Cost: {cost} ETH</p>
          <p>Total Deposits: {totalDeposits} ETH</p>
          <button 
            onClick={handleRefresh} 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh Data
          </button>
          <form onSubmit={handleRSVP}>
            <button 
              type="submit"
              disabled={isWritePending || isConfirming}
              className="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
              {isWritePending ? 'Confirming...' : isConfirming ? 'Processing...' : 'RSVP'}
            </button>
          </form>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {(writeError || rsvpError) && (
            <div>Error: {(writeError as BaseError)?.shortMessage || writeError?.message || rsvpError}</div>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to view event details and RSVP.</p>
      )}
    </div>
  );
}

export default PartySplit;