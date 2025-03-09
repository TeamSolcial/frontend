import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTable } from '../../hooks/useTable';

export const TableDetail: FC = () => {
  const { id } = useParams();
  const wallet = useWallet();
  const { table, loading, error, joining, showSuccess, joinTable } = useTable(id);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 mb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !table) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 mb-16">
        <div className="text-center text-red-600">{error || 'Table not found'}</div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-16 relative">
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
          Successfully joined the table!
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video w-full bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
          {table.imageUrl ? (
            <img src={table.imageUrl} alt={table.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-24 h-24 border-4 border-gray-300 transform rotate-45"></div>
          )}
        </div>

        <div className="flex flex-col items-start gap-3 mb-6">
          <h1 className="text-3xl font-bold">{table.title}</h1>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{table.category}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {table.organizer === wallet.publicKey?.toString() ? (
            <div className="md:col-span-2 space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-6">Host Information</h2>
                <p className="text-base text-gray-600 mb-6">You are the host of this table.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-6">About This Table</h2>
                <p className="text-base text-gray-600">{table.description}</p>
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 space-y-8">
              {table.participants.includes(wallet.publicKey?.toString() || '') ? (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold mb-6">You're In</h2>
                  <p className="text-base text-gray-600 mb-6">No longer able to attend? Notify the host by cancelling your registration.</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold mb-6">Registration</h2>
                  <p className="text-base text-gray-600 mb-6">Welcome! Sign up below to join this table.</p>
                  <button 
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-lg transition-colors text-lg ${wallet.connected ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    onClick={joinTable}
                    disabled={!wallet.connected || joining}
                  >
                    <span>{joining ? 'Joining...' : 'Reserve'}</span>
                    <span className="bg-gray-800 px-3 py-1 rounded">{table.price.toLocaleString()} STT</span>
                  </button>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-6">About This Table</h2>
                <p className="text-base text-gray-600">{table.description}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-base text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(table.date * 1000).toLocaleDateString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-base text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{table.location}</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-base text-gray-600">Seats Taken</span>
                    <span className="text-base font-medium">{table.currentParticipants + 1}/{table.maxParticipants + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="truncate">{table.organizer.slice(0, 4)}...{table.organizer.slice(-4)}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Host</span>
                    </div>
                    {table.participants.map((participant, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="truncate">{participant.slice(0, 4)}...{participant.slice(-4)}</span>
                      </div>
                    ))}
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