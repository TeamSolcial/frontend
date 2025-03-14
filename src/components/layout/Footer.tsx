export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-end items-center px-8 py-4 bg-white">
      <nav className="flex items-center gap-4 mr-1">
        <a href="https://github.com/TeamSolcial" className="text-gray-600 hover:text-gray-900">About us</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Help</a>
      </nav>
      <div className="w-16 h-8 ml-4">
        <img
          src="/images/symbol.png"
          alt="Footer Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </footer>
  );
};