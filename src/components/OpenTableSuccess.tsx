import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const OpenTableSuccess: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold mb-4">Table Opened!</h1>
        <button
          onClick={() => navigate('/my-page')}
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Check the table
        </button>
      </div>
    </div>
  );
};