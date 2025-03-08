import { FC, useState } from 'react';
import { EventCard, Event } from '../common/EventCard';

export const Discover: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Friday Random Beer Talk',
      capacity: '3/5',
      date: '3/29 Sat 1:00 PM',
      location: 'Seoul',
      category: 'Food',
      description: 'Join us for a casual beer talk session where we share stories and make new friends!',
      price: 3,
    }
  ]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase());
  };

  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-16">
      {/* Hot Tables Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Hot Tables</h2>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">Featured</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard event={events[0]} variant="featured" />
        </div>
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
        {/* Event cards */}
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};