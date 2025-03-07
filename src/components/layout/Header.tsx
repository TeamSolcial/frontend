import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletContextProvider } from '../WalletContextProvider';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <img 
          src="https://cryptologos.cc/logos/solana-sol-logo.png" 
          alt="Logo" 
          className="w-8 h-8 cursor-pointer" 
          onClick={() => navigate('/')}
        />
      </div>
      <WalletContextProvider>
        <nav className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 text-base sm:text-lg">Discover</button>
          <WalletMultiButton />
        </nav>
      </WalletContextProvider>
    </header>
  );
};