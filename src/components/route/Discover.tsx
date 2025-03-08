import { FC, useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TableCard, Table } from '../common/TableCard';
import { getProgram } from '../../utils/anchor';

export const Discover: FC = () => {
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
            capacity: `${table.account.participants.length}/${table.account.maxParticipants}`,
            date: new Date(table.account.date.toNumber() * 1000).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            location: `${table.account.city}, ${table.account.country}`,
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

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-16">
      {/* Hot Tables Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Hot Tables</h2>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">Featured</span>
        </div>
        {hotTables.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotTables.map((table) => (
              <TableCard key={table.id} table={table} variant="featured" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-600">No hot tables available at the moment</p>
          </div>
        )}
      </div>

      {/* Discover Section */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Discover</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button 
            className={`px-4 py-2 ${selectedCategory === 'all' ? 'bg-gray-100' : 'hover:bg-gray-100'} rounded-full`}
            onClick={() => handleCategoryClick('all')}
          >
            All
          </button>
          {['Food', 'Study', 'Arts', 'Sports', 'Games', 'Community'].map(category => (
            <button
              key={category}
              className={`px-4 py-2 ${selectedCategory === category.toLowerCase() ? 'bg-gray-100' : 'hover:bg-gray-100'} rounded-full`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTables.length > 0 ? (
          filteredTables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))
        ) : (
          <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-600">No tables found for the selected category</p>
          </div>
        )}
      </div>
    </div>
  );
};