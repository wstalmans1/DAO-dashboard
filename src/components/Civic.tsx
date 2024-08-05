import React from 'react';
import { IdentityButton } from '@civic/ethereum-gateway-react';


const Civic: React.FC = () => {

  return (
    <div className="flex grow w-full h-full flex-col p-4">
        <IdentityButton />  
    </div>
  );
};

export default Civic;