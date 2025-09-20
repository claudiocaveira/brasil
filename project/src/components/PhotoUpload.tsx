import React, { useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhotoUploadProps {
  onAnalyze: (photos: { front: File; left: File; right: File; hair: File }) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onAnalyze }) => {
  const [photos, setPhotos] = useState<{
    front?: File;
    left?: File;
    right?: File;
    hair?: File;
  }>({});

  const [previews, setPreviews] = useState<{
    front?: string;
    left?: string;
    right?: string;
    hair?: string;
  }>({});

  const handleFileUpload = (type: 'front' | 'left' | 'right' | 'hair', file: File) => {
    setPhotos(prev => ({ ...prev, [type]: file }));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviews(prev => ({ ...prev, [type]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (type: 'front' | 'left' | 'right' | 'hair') => {
    setPhotos(prev => {
      const newPhotos = { ...prev };
      delete newPhotos[type];
      return newPhotos;
    });
    setPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[type];
      return newPreviews;
    });
  };

  const handleAnalyze = () => {
    if (photos.front && photos.left && photos.right && photos.hair) {
      onAnalyze({
        front: photos.front,
        left: photos.left,
        right: photos.right,
        hair: photos.hair
      });
    }
  };

  const isComplete = photos.front && photos.left && photos.right && photos.hair;

  const uploadAreas = [
    { key: 'front', label: 'Rosto de Frente', icon: '👤' },
    { key: 'left', label: 'Lado Esquerdo', icon: '👈' },
    { key: 'right', label: 'Lado Direito', icon: '👉' },
    { key: 'hair', label: 'Foto do Cabelo', icon: '💇‍♀️' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Envie suas fotos para análise
        </h2>
        <p className="text-gray-600">
          Nossa IA analisará suas fotos e fornecerá um relatório completo sobre o envelhecimento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {uploadAreas.map((area) => (
          <div key={area.key} className="relative">
            <input
              type="file"
              id={area.key}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(area.key as any, file);
                }
              }}
              className="hidden"
            />
            
            {previews[area.key as keyof typeof previews] ? (
              <div className="relative group">
                <img
                  src={previews[area.key as keyof typeof previews]}
                  alt={area.label}
                  className="w-full h-48 object-cover rounded-xl border-2 border-green-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <button
                    onClick={() => removePhoto(area.key as any)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Enviado
                </div>
              </div>
            ) : (
              <label
                htmlFor={area.key}
                className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 transition-colors cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center h-full text-gray-500 hover:text-purple-600 transition-colors">
                  <div className="text-3xl mb-2">{area.icon}</div>
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="font-medium">{area.label}</span>
                  <span className="text-sm">Clique para enviar</span>
                </div>
              </label>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: isComplete ? 1.05 : 1 }}
          whileTap={{ scale: isComplete ? 0.95 : 1 }}
          onClick={handleAnalyze}
          disabled={!isComplete}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
            isComplete
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isComplete ? '🔍 Analisar Envelhecimento' : 'Envie todas as 4 fotos'}
        </motion.button>
        
        {isComplete && (
          <p className="text-sm text-gray-500 mt-2">
            A análise levará alguns segundos...
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;