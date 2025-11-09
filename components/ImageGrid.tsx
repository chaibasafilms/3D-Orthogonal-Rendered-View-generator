
import React from 'react';
import { ImageCard } from './ImageCard';

interface ImageGridProps {
  images: string[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  if (images.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {images.map((imageSrc, index) => (
        <ImageCard key={index} src={imageSrc} />
      ))}
    </div>
  );
};
