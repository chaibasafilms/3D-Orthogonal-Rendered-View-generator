
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { ImageGrid } from './components/ImageGrid';
import { Spinner } from './components/Spinner';
import { generateOrthographicView } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { AspectRatio } from './types';

const MAX_IMAGES = 9;

export default function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const handleGenerateClick = async () => {
    if (!uploadedFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { base64, mimeType } = await fileToBase64(uploadedFile);
      const newImage = await generateOrthographicView(base64, mimeType, aspectRatio);

      setGeneratedImages(prevImages => {
        const updatedImages = [...prevImages, `data:image/jpeg;base64,${newImage}`];
        if (updatedImages.length > MAX_IMAGES) {
          return updatedImages.slice(updatedImages.length - MAX_IMAGES);
        }
        return updatedImages;
      });
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please check the console for details and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isGenerateDisabled = !uploadedFile || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 xl:col-span-3 bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700 h-fit sticky top-8">
            <h2 className="text-2xl font-bold mb-6 text-teal-400">Controls</h2>
            
            <div className="space-y-6">
              <FileUpload onFileSelect={handleFileSelect} previewUrl={previewUrl} />
              <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
              
              <button
                onClick={handleGenerateClick}
                disabled={isGenerateDisabled}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span className="ml-2">Generating...</span>
                  </>
                ) : (
                  'Generate 3D View'
                )}
              </button>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
          </div>

          {/* Display Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700 min-h-[60vh]">
                <h2 className="text-2xl font-bold mb-6 text-teal-400 border-b border-gray-700 pb-4">Rendered Orthographic Views</h2>
                {generatedImages.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg">Your generated images will appear here.</p>
                        <p className="text-sm">Upload an image and click "Generate" to start.</p>
                    </div>
                )}
                {isLoading && generatedImages.length === 0 && (
                  <div className="flex items-center justify-center min-h-[40vh]">
                     <Spinner size="lg"/>
                  </div>
                )}
                <ImageGrid images={generatedImages} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
