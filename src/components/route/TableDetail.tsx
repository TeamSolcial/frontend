import { FC } from 'react';
import { Table } from '../common/TableCard';
// import { useParams } from 'react-router-dom';

export const TableDetail: FC = () => {
  // const { id } = useParams();

  // Mock event data - In a real app, this would come from an API or state management
  const table: Table = {
    id: '1',
    title: 'Friday Random Beer Talk',
    capacity: '3/5',
    date: '3/29 Sat 1:00 PM',
    location: 'Teheran-ro-1gil, Seoul',
    category: 'Food',
    description: 'Join us for a casual beer talk session where we share stories and make new friends!',
    price: 3,
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video w-full bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-gray-300 transform rotate-45"></div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{table.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span>{table.date}</span>
            <span>·</span>
            <span>{table.location}</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {table.capacity}
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
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Join Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};