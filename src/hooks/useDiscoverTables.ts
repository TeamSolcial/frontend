import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../utils/anchor';
import { Table } from '../components/common/TableCard';

export const useDiscoverTables = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const program = getProgram(connection, wallet);
        const allTables = await program.account.table.all();
        const now = Date.now();
        
        const formattedTables = allTables
          .filter(table => table.account.date.toNumber() * 1000 > now)
          .map(table => ({
            id: table.publicKey.toString(),
            title: table.account.title,
            capacity: `${table.account.participants.length + 1}/${table.account.maxParticipants + 1}`,
            date: new Date(table.account.date.toNumber() * 1000).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            location: table.account.location,
            category: table.account.category,
            description: table.account.description,
            price: table.account.price.toNumber(),
            imageUrl: table.account.imageUrl
          }));
  
        setTables(formattedTables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
  
    fetchTables();
  }, [connection, wallet]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase());
  };

  const filteredTables = tables.filter(table => 
    selectedCategory === 'all' || table.category.toLowerCase() === selectedCategory
  );

  const hotTables = tables
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return {
    tables,
    hotTables,
    filteredTables,
    selectedCategory,
    handleCategoryClick
  };
};