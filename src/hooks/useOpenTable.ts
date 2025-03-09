import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { BN, web3 } from '@project-serum/anchor';
import { getProgram } from '../utils/anchor';

interface FormData {
  title: string;
  description: string;
  location: string;
  seats: string;
  price: string;
  startDate: string;
  category: string;
  imageUrl: string;
}

export const useOpenTable = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { connected } = wallet;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    location: '',
    seats: '2',
    price: '',
    startDate: '',
    category: '',
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.publicKey) return;

    try {
      const program = getProgram(connection, wallet);
      
      // Generate a new account for the table
      const tableKeypair = web3.Keypair.generate();
      
      const tx = await program.methods
        .createTable(
          formData.title,
          formData.description,
          Number(formData.seats) - 1,
          "Korea", // country
          "Seoul", // city
          formData.location,
          new BN(Number(formData.price)),
          new BN(new Date(formData.startDate).getTime() / 1000),
          formData.category,
          formData.imageUrl
        )
        .accounts({
          table: tableKeypair.publicKey,
          organizer: wallet.publicKey
        })
        .signers([tableKeypair])
        .rpc();

      console.log("Transaction signature", tx);
      navigate('/open-table/success');
    } catch (error) {
      console.error("Error creating table:", error);
      navigate('/open-table/failure');
    }
  };

  const resetImagePreview = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  return {
    formData,
    imagePreview,
    connected,
    handleImageChange,
    handleChange,
    handleSubmit,
    resetImagePreview
  };
};