import { useNavigate } from 'react-router-dom';
import { useWalletConnection } from '../../hooks/useWalletConnection';
import { Alert } from '../common/Alert';

export const Hero = () => {
  const navigate = useNavigate();
  const { showAlert, setShowAlert, handleWalletCheck } = useWalletConnection();

  return (
    <section className="flex flex-col justify-center min-h-screen px-4 sm:px-8 pt-16 sm:pt-20">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">
          <div>Trade Time,</div>
          <div>Connect at the Table</div>
        </h1>
        <button 
          onClick={() => {
            if (handleWalletCheck()) {
              navigate('/open-table');
            }
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