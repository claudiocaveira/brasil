import React, { useState } from 'react';
import { Camera, Upload, X, Sparkles, User, Star } from 'lucide-react';

function App() {
  const [photos, setPhotos] = useState<{[key: string]: File}>({});
  const [previews, setPreviews] = useState<{[key: string]: string}>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [apparentAge, setApparentAge] = useState(0);

  const handleFileUpload = (type: string, file: File) => {
    setPhotos(prev => ({ ...prev, [type]: file }));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviews(prev => ({ ...prev, [type]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (type: string) => {
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
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setApparentAge(Math.floor(Math.random() * 20) + 25);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const uploadAreas = [
    { key: 'front', label: 'Rosto de Frente', icon: '👤' },
    { key: 'left', label: 'Lado Esquerdo', icon: '👈' },
    { key: 'right', label: 'Lado Direito', icon: '👉' },
    { key: 'hair', label: 'Foto do Cabelo', icon: '💇‍♀️' }
  ];

  const isComplete = uploadAreas.every(area => photos[area.key]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  YouthAI
                </h1>
                <p className="text-xs text-gray-500">Análise de Envelhecimento</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-full">
              <User className="w-8 h-8 text-gray-400" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Maria Silva</div>
                <div className="text-xs text-purple-600">1250 pontos</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Loading Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🤖 Analisando suas fotos...
            </h3>
            <p className="text-gray-600">
              Nossa IA está processando suas imagens. Isso pode levar alguns segundos.
            </p>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📊 Resultado da Análise</h2>
              <button
                onClick={() => setShowResults(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="text-center mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {apparentAge}
              </div>
              <div className="text-xl text-gray-700">anos aparenta ter</div>
              <div className="text-sm text-gray-500 mt-2">
                Baseado na análise das suas fotos
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Qualidade da Pele</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-600">Hidratação</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">78%</div>
                <div className="text-sm text-gray-600">Elasticidade</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">88%</div>
                <div className="text-sm text-gray-600">Luminosidade</div>
              </div>
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Fechar Relatório
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Descubra sua{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                idade aparente
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa IA analisa suas fotos e fornece um relatório completo sobre sua aparência
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Envie suas fotos para análise
                  </h2>
                  <p className="text-gray-600">
                    Faça upload de 4 fotos diferentes para uma análise completa
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {uploadAreas.map((area) => (
                    <div key={area.key} className="relative">
                      <input
                        type="file"
                        id={area.key}
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(area.key, file);
                          }
                        }}
                        className="hidden"
                      />
                      
                      {previews[area.key] ? (
                        <div className="relative group">
                          <img
                            src={previews[area.key]}
                            alt={area.label}
                            className="w-full h-40 object-cover rounded-xl border-2 border-green-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <button
                              onClick={() => removePhoto(area.key)}
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
                          className="block w-full h-40 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 transition-colors cursor-pointer"
                        >
                          <div className="flex flex-col items-center justify-center h-full text-gray-500 hover:text-purple-600 transition-colors">
                            <div className="text-2xl mb-2">{area.icon}</div>
                            <Upload className="w-5 h-5 mb-2" />
                            <span className="font-medium text-sm">{area.label}</span>
                            <span className="text-xs">Clique para enviar</span>
                          </div>
                        </label>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={!isComplete}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      isComplete
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isComplete ? '🔍 Analisar Fotos' : 'Envie todas as 4 fotos'}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Daily Tip */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">💡 Dica do Dia</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Use protetor solar diariamente, mesmo em dias nublados. É a melhor forma de prevenir o envelhecimento precoce.
                </p>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">📊 Suas Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Análises realizadas</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Pontos acumulados</span>
                    <span className="font-semibold text-purple-600">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Nível atual</span>
                    <span className="font-semibold text-green-600">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;