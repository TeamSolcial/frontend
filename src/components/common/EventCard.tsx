import { FC } from 'react';

export interface Event {
  id: string;
  title: string;
  capacity: string;
  date: string;
  location: string;
  category: string;
  description: string;
  price: number;
}

interface EventCardProps {
  event: Event;
  variant?: 'featured' | 'default';
}

export const EventCard: FC<EventCardProps> = ({ event, variant = 'default' }) => {
  const isFeatured = variant === 'featured';

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">      <div className="relative">
        <div className={`${isFeatured ? 'aspect-video' : 'w-full h-48'} bg-gray-100 flex items-center justify-center`}>
          <div className="w-12 h-12 border-2 border-gray-300 transform rotate-45"></div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      <div className={isFeatured ? 'p-6' : 'p-4'}>
        <div className="mb-3">
          <h3 className="text-lg font-medium mb-1">{event.title}</h3>
          <div className="text-sm text-gray-600">{event.date}</div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">{event.capacity}</span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">{event.category}</span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">{event.location}</span>
        </div>
        {!isFeatured && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-medium">{event.price.toLocaleString()} STT</span>
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