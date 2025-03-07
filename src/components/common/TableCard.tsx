import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Table {
  id: string;
  title: string;
  capacity: string;
  date: string;
  location: string;
  category: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface TableCardProps {
  table: Table;
  variant?: 'featured' | 'default';
}

export const TableCard: FC<TableCardProps> = ({ table: table, variant = 'default' }) => {
  const isFeatured = variant === 'featured';
  const navigate = useNavigate();

  return (
    <div 
      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer" 
      onClick={() => navigate(`/table/${table.id}`)}
    >      <div className="relative">
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          {table.imageUrl ? (
            <img src={table.imageUrl} alt={table.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-12 h-12 border-2 border-gray-300 transform rotate-45"></div>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-medium mb-1">{table.title}</h3>
          <div className="text-sm text-gray-600">{table.date}</div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {table.capacity}
          </span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded flex items-center gap-1">{table.category}</span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded flex items-center gap-1">{table.location}</span>
        </div>
        {!isFeatured && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{table.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-medium">{table.price.toLocaleString()} STT</span>
          {!isFeatured && (
            <button className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};