import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const OpenTableFailure: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-2xl font-bold mb-4">Failed to Open Table</h1>
        <p className="text-gray-600 mb-6">Something went wrong while creating your table. Please try again.</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/open-table')}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};