import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { Footer } from './components/layout/Footer';
import { OpenTable } from './components/OpenTable';
import { Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './components/WalletContextProvider';
import { OpenTableSuccess } from './components/OpenTableSuccess';
import { OpenTableFailure } from './components/OpenTableFailure';
import { MyPage } from './components/MyPage';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

const endpoint = clusterApiUrl('devnet');
const wallets = [new PhantomWalletAdapter()];

function App() {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextProvider>
            <div className="flex flex-col min-h-screen bg-white">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/open-table" element={<OpenTable />} />
                  <Route path="/open-table/success" element={<OpenTableSuccess />} />
                  <Route path="/open-table/failure" element={<OpenTableFailure />} />
                  <Route path="/my-page" element={<MyPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WalletContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App