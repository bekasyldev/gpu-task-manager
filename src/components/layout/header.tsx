import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 flex justify-between text-white p-4 sticky top-0 z-10">
            <h1 className="text-2xl font-bold">GPU Task Manager</h1>
            <nav className="mt-2">
            </nav>
        </header>
    );
};

export default Header;