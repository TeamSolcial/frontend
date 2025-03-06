import { WalletContextProvider } from './components/WalletContextProvider';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function App() {
  return (
    <WalletContextProvider>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h1>Welcome to Solcial</h1>
        <WalletMultiButton />
      </div>
    </WalletContextProvider>
  )
}

export default App