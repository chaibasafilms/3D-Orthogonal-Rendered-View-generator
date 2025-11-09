
import React from 'react';

interface ImageCardProps {
  src: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ src }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-900 aspect-square">
      <img
        src={src}
        alt="Generated 3D Orthographic View"
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <a
          href={src}
          download={`orthographic-view-${Date.now()}.jpeg`}
          className="bg-white/90 text-gray-900 hover:bg-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 transition-transform transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download</span>
        </a>
      </div>
    </div>
  );
};
