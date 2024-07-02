import { useAccount, useBalance } from 'wagmi';
import { ConnectKitButton } from "connectkit";
import styled from "styled-components";
import { formatUnits } from 'viem';

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 4px 16px;
  color: #ffffff;
  background: #1a88f8;
  font-size: 14px;
  font-weight: 200;
  border-radius: 10rem;
  box-shadow: 0 4px 4px -6px #1a88f8;

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 6px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 6px -6px #1a88f8;
  }
`;

const ConnectionDot = () => {

  const { isConnected, address } = useAccount();
  const { data: balanceData } = useBalance({ address });

  const formattedBalance = balanceData ? Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(2) : '0.00';

  return (
    <div className="flex items-center">
      <ConnectKitButton.Custom>
        {({ show, truncatedAddress, ensName, chain }) => (
          <>
            <div onClick={show} className="cursor-pointer flex items-center">
              <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="ml-2 mr-3 text-l">{isConnected ? `Connected` : 'Not Connected'}</span>
              <StyledButton>
                {isConnected ?(
                <>
                  {ensName ?? truncatedAddress}
                  <span className="bg-blue-800 text-center rounded-md p-1 ml-2 mr-1"> {formattedBalance} {balanceData?.symbol}</span>
                  <span className="bg-blue-800 text-center rounded-md p-1 pr-3 ml-1 mr-1"> {chain?.name}</span>
                </>
              ) : (
                "Connect Wallet"
              )}
              </StyledButton>
            </div>
          </>
        )}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default ConnectionDot;