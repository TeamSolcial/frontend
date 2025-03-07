import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Alert } from '../common/Alert';

export const Hero = () => {
  const navigate = useNavigate();
  const { connected } = useWallet();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <section className="flex flex-col justify-center min-h-screen px-4 sm:px-8 pt-16 sm:pt-20">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">Token connects people</h1>
        <button 
          onClick={() => {
            if (!connected) {
              setShowAlert(true);
              return;
            }
            navigate('/open-table');
          }}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg"
        >
          Open a new table
        </button>
      </div>
      <Alert
        isOpen={showAlert}
        message="Please connect your wallet first"
        onClose={() => setShowAlert(false)}
      />
    </section>
  );
};