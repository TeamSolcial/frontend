import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export const MyPage: FC = () => {
  const { publicKey } = useWallet();
  
  // Utility function to format wallet address
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <h1 className="text-2xl font-bold">
              {publicKey ? formatAddress(publicKey.toString()) : 'Not Connected'}
            </h1>
            <p className="text-gray-600">0 hosted · 1 participated</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tables</h2>
          <div className="grid gap-4">
            <div className="text-center py-8 text-gray-500">
              No upcoming tables
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Past Tables</h2>
          <div className="grid gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg"></div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">One day Cursor Lesson</h3>
                    <span className="text-sm text-gray-500">3/5</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span>3/29 Sat 1:00 PM</span>
                    <span>·</span>
                    <span>Seoul</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">study</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};