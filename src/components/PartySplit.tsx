import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSimulateContract } from 'wagmi';
import { formatUnits } from 'viem';

const contractAddress = '0xd34CF2A413c29B058Fd2634d170180cEF38A92Ec';
const contractABI = [{"inputs":[{"internalType":"uint256","name":"_cost","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"members","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_venue","type":"address"},{"internalType":"uint256","name":"_billAmount","type":"uint256"}],"name":"payBill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"payments","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rsvp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

const PartySplit: React.FC = () => {
  const { isConnected } = useAccount();

  const [cost, setCost] = useState<number>(0);
  const [totalDeposits, setTotalDeposits] = useState<string>('0');

  // Read contract state
  const { data: costData } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'cost',
  }) as { data: bigint | undefined };

  const { data: totalDepositsData } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'totalDeposits',
  }) as { data: bigint | undefined };

  // Prepare and write to contract
  const { data: simulationResult, error: simulationError } = useSimulateContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'rsvp',
    args: [],
    value: costData,
  });

  useEffect(() => {
    if (simulationError) {
      console.error('Simulation error:', simulationError);
    }
    if (simulationResult) {
      console.log('Simulation result:', simulationResult);
    }
  }, [simulationResult, simulationError]);

  const { writeContract, data: rsvpHash, status } = useWriteContract();

  const isRsvpLoading = status === 'pending';

  useEffect(() => {
    if (costData !== undefined) {
      setCost(Number(formatUnits(costData, 18)));
    }
    if (totalDepositsData !== undefined) {
      setTotalDeposits(formatUnits(totalDepositsData, 18));
    }
  }, [costData, totalDepositsData]);

  useEffect(() => {
    if (costData !== undefined) {
      console.log('Cost data:', costData);
      setCost(Number(formatUnits(costData, 18)));
    } else {
      console.log('Cost data is undefined');
    }
  }, [costData]);


  const handleRSVP = async () => {
    console.log('RSVP button clicked');
    if (!isConnected) {
      console.log('Wallet not connected');
      return;
    }
    console.log('Wallet connected, proceeding with RSVP');
    if (simulationError) {
      console.error('Simulation error:', simulationError);
      return;
    }
    if (!simulationResult) {
      console.error('No simulation result');
      return;
    }
    if (costData === undefined) {
      console.error('Cost data is not available');
      return;
    }
    try {
      console.log('Attempting to write contract');
      console.log('Simulation result request:', simulationResult.request);
      const hash = await writeContract(simulationResult.request);
      console.log('Transaction sent:', hash);
    } catch (error) {
      console.error('Error during RSVP:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      console.dir(error);
    }
  };

    // Wait for the transaction to complete
    const { isLoading: isWaitingForTransaction } = useWaitForTransactionReceipt({
      hash: rsvpHash,
    });

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="text-center">
        <h1>Split the Party</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>This is the content for PartySplit.</p>
        <p>Cost: {cost} ETH</p>
        <p>Total Deposits: {totalDeposits} ETH</p>
        <button
          onClick={handleRSVP}
          disabled={isRsvpLoading || isWaitingForTransaction}
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          {isRsvpLoading || isWaitingForTransaction ? 'Processing...' : 'RSVP'}
        </button>
      </div>
    </div>
  );
};

export default PartySplit;
