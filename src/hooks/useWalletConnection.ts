import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

export const useWalletConnection = () => {
  const { connected } = useWallet();
  const [showAlert, setShowAlert] = useState(false);

  const handleWalletCheck = () => {
    if (!connected) {
      setShowAlert(true);
      return false;
    }
    return true;
  };

  return {
    connected,
    showAlert,
    setShowAlert,
    handleWalletCheck,
  };
};