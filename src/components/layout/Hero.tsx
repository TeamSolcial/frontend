export const Hero = () => {
  return (
    <section className="flex flex-col justify-center min-h-screen px-4 sm:px-8 pt-16 sm:pt-20">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">Token connects people</h1>
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg">
          Open new event
        </button>
      </div>
    </section>
  );
};