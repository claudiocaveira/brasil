import React, { useState } from 'react';
import { Camera, Upload, Sparkles, User, Star, RefreshCw, Eye, Share2 } from 'lucide-react';

function App() {
  const [photos, setPhotos] = useState<{[key: string]: File}>({});
  const [previews, setPreviews] = useState<{[key: string]: string}>({});

  const uploadAreas = [
    { key: 'front', label: 'Rosto de Frente', icon: '👤', description: 'Foto frontal do rosto' },
    { key: 'left', label: 'Lado Esquerdo', icon: '👈', description: 'Perfil esquerdo' },
    { key: 'right', label: 'Lado Direito', icon: '👉', description: 'Perfil direito' },
    { key: 'hair', label: 'Foto do Cabelo', icon: '💇‍♀️', description: 'Foco no cabelo' }
  ];

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

  const isComplete = Object.keys(photos).length === 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  YouthAI
                </h1>
                <p className="text-xs text-gray-500">Análise Inteligente de Envelhecimento</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-100">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">Maria Silva</div>
                <div className="text-xs text-purple-600 font-medium">⭐ 1,250 pontos • Nível 3</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Descubra sua{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                idade aparente
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nossa IA analisa suas fotos e fornece um relatório completo sobre sua aparência, 
              com recomendações personalizadas para manter sua pele jovem e saudável
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white/20">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Envie suas fotos para análise
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Faça upload de 4 fotos diferentes para uma análise completa e precisa
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
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
                            className="w-full h-48 object-cover rounded-2xl border-2 border-green-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                            <button
                              onClick={() => removePhoto(area.key)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ✓ Enviado
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor={area.key}
                          className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl hover:border-purple-400 transition-colors cursor-pointer group"
                        >
                          <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-purple-600 transition-colors">
                            <div className="text-4xl mb-3">{area.icon}</div>
                            <Upload className="w-6 h-6 mb-3" />
                            <span className="font-semibold text-lg">{area.label}</span>
                            <span className="text-sm text-gray-400 mt-1">{area.description}</span>
                          </div>
                        </label>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    disabled={!isComplete}
                    className={`px-12 py-5 rounded-2xl font-bold text-xl shadow-lg transition-all ${
                      isComplete
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 cursor-pointer'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isComplete ? '🔍 Analisar Envelhecimento' : 'Envie todas as 4 fotos'}
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    {isComplete ? 'Clique para iniciar a análise' : 'Faça upload das fotos para habilitar a análise'}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Daily Tip */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">💡 Dica do Dia</h3>
                  </div>
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Use protetor solar diariamente, mesmo em dias nublados. É a melhor forma de prevenir o envelhecimento precoce da pele.
                </p>
                <div className="mt-3 text-xs text-blue-600 font-medium">
                  Gerado por IA • Atualizado diariamente
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                  📊 Suas Estatísticas
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Análises realizadas</span>
                    <span className="font-bold text-purple-600 text-lg">3</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Pontos acumulados</span>
                    <span className="font-bold text-pink-600 text-lg">1,250</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Nível atual</span>
                    <span className="font-bold text-green-600 text-lg">Nível 3</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Progresso do nível</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Faltam 250 pontos para o próximo nível
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-6">⚡ Ações Rápidas</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all font-semibold flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Ver Histórico</span>
                  </button>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 rounded-xl hover:from-pink-100 hover:to-pink-200 transition-all font-semibold flex items-center justify-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar</span>
                  </button>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all font-semibold flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Dicas Personalizadas</span>
                  </button>
                </div>
              </div>

              {/* Gamification Card */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  🏆 Conquistas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">📷</div>
                    <div className="text-xs font-semibold text-gray-700">Primeira Análise</div>
                    <div className="text-xs text-green-600">✓ Conquistado</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-xs font-semibold text-gray-700">Influenciador</div>
                    <div className="text-xs text-green-600">✓ Conquistado</div>
                  </div>
                  <div className="bg-white/30 rounded-lg p-3 text-center opacity-60">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-xs font-semibold text-gray-500">Cuidador</div>
                    <div className="text-xs text-gray-400">Bloqueado</div>
                  </div>
                  <div className="bg-white/30 rounded-lg p-3 text-center opacity-60">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-xs font-semibold text-gray-500">Expert</div>
                    <div className="text-xs text-gray-400">Bloqueado</div>
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