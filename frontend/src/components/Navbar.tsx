import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">VisionGuard</h1>
        <p className="text-blue-100">Real-time Object Detection</p>
      </div>
    </nav>
  );
};

export default Navbar;