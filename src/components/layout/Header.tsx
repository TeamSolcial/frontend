import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

export const Header = () => {
  const navigate = useNavigate();
  const { connected } = useWallet();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <img 
          src="/images/logo.png"
          alt="Logo"
          className="w-8 h-8 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <nav className="flex items-center gap-4">
          <button
            onClick={() => navigate('/discover')}
            className="text-gray-600 hover:text-gray-900 text-base sm:text-lg"
          >
            Discover
          </button>
          {connected && (
            <button
              onClick={() => navigate('/my-page')}
              className="text-gray-600 hover:text-gray-900 text-base sm:text-lg"
            >
              My Table
            </button>
          )}
        </nav>
      </div>
      <div>
        <WalletMultiButton />
      </div>
    </header>
  );
};