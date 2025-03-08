import { FC, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getAvatarUrl, formatAddress } from '../../utils/profile';
import { getProgram } from '../../utils/anchor';

interface Meetup {
  publicKey: string;
  account: {
    organizer: string;
    title: string;
    description: string;
    maxParticipants: number;
    currentParticipants: number;
    country: string;
    city: string;
    location: string;
    price: number;
    date: number;
    category: string;
    imageUrl: string;
  };
}

export const MyPage: FC = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const wallet = useWallet();
  const [upcomingTables, setUpcomingTables] = useState<Meetup[]>([]);
  const [pastTables, setPastTables] = useState<Meetup[]>([]);
  const [hostedCount, setHostedCount] = useState(0);
  const [participatedCount, setParticipatedCount] = useState(0);

  useEffect(() => {
    const fetchMeetups = async () => {
      if (!publicKey) return;

      try {
        const program = getProgram(connection, wallet);
        const meetups = await program.account.meetup.all();
        const now = Date.now();

        const upcoming: Meetup[] = [];
        const past: Meetup[] = [];
        let hosted = 0;
        let participated = 0;

        meetups.forEach((meetup: any) => {
          const meetupData = {
            publicKey: meetup.publicKey.toString(),
            account: {
              organizer: meetup.account.organizer.toString(),
              title: meetup.account.title,
              description: meetup.account.description,
              maxParticipants: meetup.account.maxParticipants,
              currentParticipants: meetup.account.currentParticipants,
              country: meetup.account.country,
              city: meetup.account.city,
              location: meetup.account.location,
              price: meetup.account.price.toNumber(),
              date: meetup.account.date.toNumber(),
              category: meetup.account.category,
              imageUrl: meetup.account.imageUrl
            }
          };

          // Count hosted and participated tables
          if (meetupData.account.organizer === publicKey.toString()) {
            hosted++;
          } else {
            participated++;
          }

          if (meetupData.account.date > now) {
            upcoming.push(meetupData);
          } else {
            past.push(meetupData);
          }
        });

        setUpcomingTables(upcoming);
        setPastTables(past);
        setHostedCount(hosted);
        setParticipatedCount(participated);
      } catch (error) {
        console.error('Error fetching meetups:', error);
      }
    };

    fetchMeetups();
  }, [publicKey, connection, wallet]);

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          {publicKey ? (
            <img
              src={getAvatarUrl(publicKey.toString())}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4 bg-gray-200 object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
          )}
          <div>
            <h1 className="text-2xl font-bold">
              {publicKey ? formatAddress(publicKey.toString()) : 'Not Connected'}
            </h1>
            <p className="text-gray-600">{hostedCount} hosted · {participatedCount} participated</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tables</h2>
          <div className="grid gap-4">
            {upcomingTables.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No upcoming tables
              </div>
            ) : (
              upcomingTables.map((table) => (
                <div key={table.publicKey} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg">
                      {table.account.imageUrl && (
                        <img src={table.account.imageUrl} alt={table.account.title} className="w-full h-full object-cover rounded-lg" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{table.account.title}</h3>
                        <span className="text-sm text-gray-500">{table.account.currentParticipants}/{table.account.maxParticipants}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>{new Date(table.account.date).toLocaleString()}</span>
                        <span>·</span>
                        <span>{table.account.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm">{table.account.category.toLowerCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Past Tables</h2>
          <div className="grid gap-4">
            {pastTables.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No past tables
              </div>
            ) : (
              pastTables.map((table) => (
                <div key={table.publicKey} className="border rounded-lg p-4 hover:shadow-md transition-shadow opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg">
                      {table.account.imageUrl && (
                        <img src={table.account.imageUrl} alt={table.account.title} className="w-full h-full object-cover rounded-lg" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{table.account.title}</h3>
                        <span className="text-sm text-gray-500">{table.account.currentParticipants}/{table.account.maxParticipants}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>{new Date(table.account.date).toLocaleString()}</span>
                        <span>·</span>
                        <span>{table.account.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm">{table.account.category.toLowerCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};