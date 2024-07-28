import React, { useState } from 'react';
import { useAccount, useBalance, useBlockNumber, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, Address } from 'viem';
import { BaseError } from 'viem';
import { ConnectKitButton } from "connectkit";

const contractAddress = '0x36880A039feFD03F39d5348647D85a73d8A4E9eD';
const contractABI = [
  {"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"lastPingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"ping","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"recipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"}
] as const;

export function DeathmanSwitch() {
  const { isConnected, address } = useAccount();
  const { data: balanceData, isLoading: isBalanceLoading, refetch: refetchBalance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [error, setError] = useState<string | null>(null);

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
        functionName: 'getBalance',
      },
      {
        address: contractAddress,
        abi: contractABI,
        functionName: 'lastPingTime',
      },
      {
        address: contractAddress,
        abi: contractABI,
        functionName: 'owner',
      },
      {
        address: contractAddress,
        abi: contractABI,
        functionName: 'recipient',
      }
    ],
  });

  const { writeContract, data: hash, error: writeError, isPending: isWritePending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const formattedBalance = balanceData 
    ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4) 
    : '0.0000';

  const contractBalance = contractData?.[0]?.result ? Number(formatUnits(contractData[0].result, 18)).toFixed(4) : '0.0000';
  const lastPingTime = contractData?.[1]?.result ? new Date(Number(contractData[1].result) * 1000).toLocaleString() : 'N/A';
  const owner: Address | undefined = contractData?.[2]?.result;
  const recipient: Address | undefined = contractData?.[3]?.result;

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

  const handlePing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'ping',
    });
  };

  const handleWithdraw = async () => {
    setError(null);
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'withdraw',
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
      <h1 className="text-2xl font-bold mb-4">Ping Contract</h1>
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
          <p>Contract Balance: {contractBalance} ETH</p>
          <p>Last Ping Time: {lastPingTime}</p>
          <p>Contract Owner: {owner || 'Unknown'}</p>
          <p>Contract Recipient: {recipient || 'Unknown'}</p>
          <button 
            onClick={handleRefresh} 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh Data
          </button>
          <form onSubmit={handlePing} className="inline">
            <button 
              type="submit"
              disabled={isWritePending || isConfirming}
              className="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
              {isWritePending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Ping'}
            </button>
          </form>
          <button 
            onClick={handleWithdraw}
            disabled={isWritePending || isConfirming}
            className="mt-4 ml-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            {isWritePending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Withdraw'}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {(writeError || error) && (
            <div>Error: {(writeError as BaseError)?.shortMessage || writeError?.message || error}</div>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to view contract details and interact.</p>
      )}
    </div>
  );
}

export default DeathmanSwitch;