import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-6 px-8 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">LogoAI</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="text-lg font-medium"><a href="https://bento.me/halilibrahim">İletişim</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
