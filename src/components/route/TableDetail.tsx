import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../../utils/anchor';
import { PublicKey } from '@solana/web3.js';

interface TableData {
  title: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  location: string;
  price: number;
  date: number;
  category: string;
  imageUrl: string;
}

export const TableDetail: FC = () => {
  const { id } = useParams();
  const { connection } = useConnection();
  const wallet = useWallet();
  const [table, setTable] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      if (!id) return;

      try {
        const program = getProgram(connection, wallet);
        const tablePubkey = new PublicKey(id);
        const table = await program.account.table.fetch(tablePubkey);

        setTable({
          title: table.title,
          description: table.description,
          maxParticipants: table.maxParticipants,
          currentParticipants: table.participants.length,
          location: `${table.city}, ${table.country}`,
          price: table.price.toNumber(),
          date: table.date.toNumber(),
          category: table.category,
          imageUrl: table.imageUrl
        });
      } catch (err) {
        console.error('Error fetching table data:', err);
        setError('Failed to load table data');
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [id, connection, wallet]);

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{table.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span>{new Date(table.date).toLocaleString()}</span>
            <span>·</span>
            <span>{table.location}</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {table.currentParticipants}/{table.maxParticipants}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{table.category}</span>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">{table.description}</p>
        </div>

        <div className="border-t pt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">{table.price.toLocaleString()} STT</span>
            </div>
            <button 
              className={`px-6 py-3 rounded-lg transition-colors ${wallet.connected ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={async () => {
                if (!wallet.connected || !id || !table || joining || !wallet.publicKey) return;
                
                try {
                  setJoining(true);
                  const program = getProgram(connection, wallet);
                  const tablePubkey = new PublicKey(id);

                  await program.methods
                    .joinTable()
                    .accounts({
                      table: tablePubkey,
                      participant: wallet.publicKey
                    })
                    .rpc();

                  // Refresh table data
                  const updatedTable = await program.account.table.fetch(tablePubkey);
                  setTable(prev => prev ? {
                    ...prev,
                    currentParticipants: updatedTable.participants.length
                  } : null);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);

                } catch (err: any) {
                  console.error('Error joining table:', err);
                  if (err.message.includes('The table is full')) {
                    setError('This table is already full');
                  } else if (err.message.includes('The table date has passed')) {
                    setError('This table has already ended');
                  } else {
                    setError('Failed to join table');
                  }
                } finally {
                  setJoining(false);
                }
              }}
              disabled={!wallet.connected || joining}
            >
              {joining ? 'Joining...' : 'Join Table'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};