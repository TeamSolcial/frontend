import { FC } from 'react';
import { Event } from '../common/EventCard';
// import { useParams } from 'react-router-dom';

export const TableDetail: FC = () => {
  // const { id } = useParams();

  // Mock event data - In a real app, this would come from an API or state management
  const event: Event = {
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
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span>{event.date}</span>
            <span>·</span>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{event.capacity}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{event.category}</span>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
        </div>

        <div className="border-t pt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">{event.price.toLocaleString()} STT</span>
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