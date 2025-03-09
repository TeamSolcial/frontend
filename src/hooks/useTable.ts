import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getProgram } from '../utils/anchor';

interface TableData {
  title: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  participants: string[];
  organizer: string;
  location: string;
  price: number;
  date: number;
  category: string;
  imageUrl: string;
}

export const useTable = (tableId: string | undefined) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [table, setTable] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      if (!tableId) return;

      try {
        const program = getProgram(connection, wallet);
        const tablePubkey = new PublicKey(tableId);
        const tableData = await program.account.table.fetch(tablePubkey);

        setTable({
          title: tableData.title,
          description: tableData.description,
          maxParticipants: tableData.maxParticipants,
          currentParticipants: tableData.participants.length,
          participants: tableData.participants.map(p => p.toString()),
          organizer: tableData.organizer.toString(),
          location: `${tableData.location}`,
          price: tableData.price.toNumber(),
          date: tableData.date.toNumber(),
          category: tableData.category,
          imageUrl: tableData.imageUrl
        });
      } catch (err) {
        console.error('Error fetching table data:', err);
        setError('Failed to load table data');
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [tableId, connection, wallet]);

  const joinTable = async () => {
    if (!wallet.connected || !tableId || !table || joining || !wallet.publicKey) return;
    
    try {
      setJoining(true);
      const program = getProgram(connection, wallet);
      const tablePubkey = new PublicKey(tableId);
  
      await program.methods
        .joinTable()
        .accounts({
          table: tablePubkey,
          participant: wallet.publicKey
        })
        .rpc();
  
      const updatedTable = await program.account.table.fetch(tablePubkey);
      setTable(prev => prev ? {
        ...prev,
        currentParticipants: updatedTable.participants.length,
        participants: updatedTable.participants.map(p => p.toString())
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
  };

  return {
    table,
    loading,
    error,
    joining,
    showSuccess,
    joinTable,
    setShowSuccess
  };
};