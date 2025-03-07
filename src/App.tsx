import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { Footer } from './components/layout/Footer';
import { OpenTable } from './components/OpenTable';
import { Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './components/WalletContextProvider';
import { OpenTableSuccess } from './components/OpenTableSuccess';
import { MyPage } from './components/MyPage';

function App() {
  return (
    <WalletContextProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/open-table" element={<OpenTable />} />
            <Route path="/open-table/success" element={<OpenTableSuccess />} />
            <Route path="/my-page" element={<MyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </WalletContextProvider>
  )
}

export default App