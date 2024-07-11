import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useBlockNumber, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseUnits, Address } from 'viem';
import { BaseError } from 'viem';
import { ConnectKitButton } from "connectkit";

const contractAddress = '0x9EA598647A74039Cb9bcD79fcB05cB79F50AFa22';
const contractABI = [
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}
] as const;

export function ERC20(): React.ReactElement {
  const { address } = useAccount();
  const { data: balanceData, isLoading: isBalanceLoading, refetch: refetchBalance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
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
        functionName: 'balanceOf',
        args: [address as Address],
      },
      {
        address: contractAddress,
        abi: contractABI,
        functionName: 'name',
      },
      {
        address: contractAddress,
        abi: contractABI,
        functionName: 'symbol',
      }
    ],
  });

  const { writeContract, data: hash, error: writeError, isPending: isWritePending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const formattedBalance = balanceData 
    ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4) 
    : '0.0000';

  const tokenBalance = contractData?.[0]?.result ? Number(formatUnits(contractData[0].result, 18)).toFixed(4) : '0.0000';
  const tokenName = contractData?.[1]?.result ?? 'Unknown Token';
  const tokenSymbol = contractData?.[2]?.result ?? 'TOKEN';

  useEffect(() => {
    if (blockNumber) {
      refetchContractData();
      refetchBalance();
    }
  }, [blockNumber, refetchContractData, refetchBalance]);

  const handleRefresh = (): void => {
    refetchContractData();
    refetchBalance();
  };

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    if (!recipient || !amount) {
      setError('Please provide both recipient address and amount');
      return;
    }
    try {
      const value = parseUnits(amount, 18);
      writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'transfer',
        args: [recipient as Address, value],
      });
    } catch (err) {
      setError('Invalid amount');
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      refetchContractData();
      refetchBalance();
      setRecipient('');
      setAmount('');
    }
  }, [isConfirmed, refetchContractData, refetchBalance]);

  if (isContractDataPending) return <div>Loading contract data...</div>;

  if (contractError) {
    return <div>Error: {(contractError as BaseError).shortMessage || contractError.message}</div>;
  }

  return (
    <div className="flex grow w-full h-full flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">ERC20 Token Transfer</h1>
      <ConnectKitButton.Custom>
        {({
          isConnected,
          show,
          truncatedAddress,
          ensName
        }) => {
          return (
            <div onClick={show} className="cursor-pointer mb-4">
              {isConnected ? (
                <p>Connected Address: {ensName ?? truncatedAddress}</p>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Connect Wallet
                </button>
              )}
            </div>
          );
        }}
      </ConnectKitButton.Custom>
      {address ? (
        <div>
          {isBalanceLoading ? (
            <p>Loading balance...</p>
          ) : (
            <p>Your ETH Balance: {formattedBalance} {balanceData?.symbol}</p>
          )}
          <p>Your {tokenName} Balance: {tokenBalance} {tokenSymbol}</p>
          <button 
            onClick={handleRefresh} 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh Data
          </button>
          <form onSubmit={handleTransfer} className="mt-4">
            <input
              type="text"
              placeholder="Recipient address"
              value={recipient}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
              className="border p-2 mr-2 rounded-md text-gray-700"
            />
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              className="border p-2 mr-2 rounded-md text-gray-700"
            />
            <button 
              type="submit"
              disabled={isWritePending || isConfirming}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
              {isWritePending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Transfer'}
            </button>
          </form>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {(writeError || error) && (
            <div>Error: {(writeError as BaseError)?.shortMessage || writeError?.message || error}</div>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to view token details and transfer tokens.</p>
      )}
    </div>
  );
}

export default ERC20;