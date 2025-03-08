import { FC, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { web3 } from '@project-serum/anchor';
import { getProgram } from '../../utils/anchor';

export const OpenTable: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { connected } = wallet;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    seats: '1',
    price: '',
    startDate: '',
    category: '',
    imageUrl: ''
  });

  const [_selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
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
      
      // Generate a new account for the meetup
      const meetupKeypair = web3.Keypair.generate();
      
      const tx = await program.methods
        .createMeetup(
          formData.title,
          formData.description,
          Number(formData.seats),
          "Korea", // country
          "Seoul", // city
          formData.location,
          Number(formData.price),
          new Date(formData.startDate).getTime(), // convert to timestamp
          formData.category,
          formData.imageUrl
        )
        .accounts({
          meetup: meetupKeypair.publicKey,
          organizer: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([meetupKeypair])
        .rpc();

      console.log("Transaction signature", tx);
      navigate('/open-table/success');
    } catch (error) {
      console.error("Error creating meetup:", error);
      navigate('/open-table/failure');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-8">
      <h1 className="text-2xl font-bold mb-8">Create a Table</h1>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <div className="aspect-square w-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 relative">
            {imagePreview ? (
              <div className="w-full h-full relative">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview('');
                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 border border-gray-300">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="col-span-8 space-y-6">
          <div className="mb-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Category</option>
              <option value="Food">Food</option>
              <option value="Study">Study</option>
              <option value="Arts">Arts</option>
              <option value="Sports">Sports</option>
              <option value="Games">Games</option>
              <option value="Community">Community</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Table Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <select
                  name="timezone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="Asia/Seoul"
                >
                  <option value="Asia/Seoul">(GMT+9) Seoul</option>
                  <option value="Asia/Tokyo">(GMT+9) Tokyo</option>
                  <option value="America/New_York">(GMT-4) New York</option>
                  <option value="America/Los_Angeles">(GMT-7) Los Angeles</option>
                  <option value="Europe/London">(GMT+1) London</option>
                </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Table Location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Offline location or virtual link</p>
          </div>

          <div className="mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Table Options</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span>Ticket Price</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span>Require Approval</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <span>Total Seats</span>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  step="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className={`w-full px-6 py-3 ${connected ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-md`}
              disabled={!connected}
            >
              Create a Table
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};