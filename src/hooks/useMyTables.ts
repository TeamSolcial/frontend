import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../utils/anchor';

interface TableData {
  publicKey: string;
  account: {
    organizer: string;
    title: string;
    description: string;
    maxSeats: number;
    currentSeats: number;
    participants: string[];
    country: string;
    city: string;
    location: string;
    price: number;
    date: number;
    category: string;
    imageUrl: string;
  };
}

export const useMyTables = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const wallet = useWallet();
  const [upcomingTables, setUpcomingTables] = useState<TableData[]>([]);
  const [pastTables, setPastTables] = useState<TableData[]>([]);
  const [hostedCount, setHostedCount] = useState(0);
  const [participatedCount, setParticipatedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      if (!publicKey) {
        setLoading(false);
        return;
      }

      try {
        const program = getProgram(connection, wallet);
        const tables = await program.account.table.all();
        const now = Date.now();

        const upcoming: TableData[] = [];
        const past: TableData[] = [];
        let hosted = 0;
        let participated = 0;

        tables
          .filter((table: any) => 
            table.account.organizer.toString() === publicKey.toString() ||
            table.account.participants.includes(publicKey.toString())
          )
          .forEach((table: any) => {
            const tableData = {
              publicKey: table.publicKey.toString(),
              account: {
                organizer: table.account.organizer.toString(),
                title: table.account.title,
                description: table.account.description,
                maxSeats: (table.account.maxParticipants ?? 0) + 1,
                currentSeats: (table.account.participants.length ?? 0) + 1,
                participants: table.account.participants,
                country: table.account.country,
                city: table.account.city,
                location: table.account.location,
                price: table.account.price.toNumber(),
                date: table.account.date.toNumber() * 1000,
                category: table.account.category,
                imageUrl: table.account.imageUrl
              }
            };

            if (tableData.account.organizer === publicKey.toString()) {
              hosted++;
            } else {
              participated++;
            }

            if (tableData.account.date > now) {
              upcoming.push(tableData);
            } else {
              past.push(tableData);
            }
          });

        setUpcomingTables(upcoming);
        setPastTables(past);
        setHostedCount(hosted);
        setParticipatedCount(participated);
      } catch (error) {
        console.error('Error fetching tables:', error);
        setError('Failed to load tables');
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [publicKey, connection, wallet]);

  return {
    upcomingTables,
    pastTables,
    hostedCount,
    participatedCount,
    loading,
    error
  };
};