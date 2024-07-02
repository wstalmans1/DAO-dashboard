import { useAccount } from 'wagmi';
import { ConnectKitButton } from "connectkit";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 4px 16px;
  color: #ffffff;
  background: #1a88f8;
  font-size: 16px;
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
  const { isConnected } = useAccount();

  return (
    <div className="flex items-center">
      <ConnectKitButton.Custom>
        {({ show, truncatedAddress, ensName }) => (
          <>
            <div onClick={show} className="cursor-pointer flex items-center">
              {/* Connection status indicator */}
              <div className={`h-4 w-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {/* Optionally display "Connected" or "Not Connected" text */}
              <span className="ml-2 mr-3">{isConnected ? `Connected` : 'Not Connected'}</span>              
              <StyledButton>
                {isConnected ? (ensName ?? truncatedAddress) : "Connect Wallet"}
              </StyledButton>
            </div>
          </>
        )}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default ConnectionDot;