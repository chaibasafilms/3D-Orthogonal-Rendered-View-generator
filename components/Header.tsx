
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          <span className="text-teal-400">3D</span> Orthogonal View Generator
        </h1>
        <p className="text-gray-400 mt-1">AI-Powered 3D Model Rendering from 2D Images</p>
      </div>
    </header>
  );
};
