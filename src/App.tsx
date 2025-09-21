import React, { useState } from 'react';
import { Camera, Upload, X, Sparkles, LogIn, Star } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  level: number;
}

interface AnalysisResult {
  id: string;
  date: string;
  apparentAge: number;
  analysis: {
    expressionLines: number;
    fineWrinkles: number;
    deepWrinkles: number;
    skinSagging: number;
    darkCircles: number;
    spots: number;
  };
}

const mockUser: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@email.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  points: 1250,
  level: 3
};

function App() {
  const [user, setUser] = useState<User | null>(mockUser);
  const [photos, setPhotos] = useState<{[key: string]: File}>({});
  const [previews, setPreviews] = useState<{[key: string]: string}>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);

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
      const analysis: AnalysisResult = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        apparentAge: 32,
        analysis: {
          expressionLines: 25,
          fineWrinkles: 15,
          deepWrinkles: 5,
          skinSagging: 20,
          darkCircles: 30,
          spots: 10
        }
      };
      
      setCurrentAnalysis(analysis);
      setIsAnalyzing(false);
      setShowResults(true);
      
      if (user) {
        setUser(prev => prev ? { ...prev, points: prev.points + 100 } : null);
      }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-full">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-purple-600">{user.points} pontos</div>
                  </div>
                </div>
              ) : (
                <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Loading Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
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
      {showResults && currentAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">📊 Relatório da IA</h2>
              <button
                onClick={() => setShowResults(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Idade Aparente */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {currentAnalysis.apparentAge}
              </div>
              <div className="text-xl text-gray-700">anos aparenta ter</div>
              <div className="text-sm text-gray-500 mt-2">
                Baseado na análise das suas fotos
              </div>
            </div>

            {/* Análise Detalhada */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(currentAnalysis.analysis).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    value <= 20 ? 'text-green-600 bg-green-100' :
                    value <= 40 ? 'text-yellow-600 bg-yellow-100' :
                    'text-red-600 bg-red-100'
                  }`}>
                    <span className="font-semibold">{value}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Fechar Relatório
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Descubra sua{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                idade aparente
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa IA analisa suas fotos e fornece recomendações personalizadas 
              para manter sua pele jovem e saudável
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2">
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
                            className="w-full h-48 object-cover rounded-xl border-2 border-green-200"
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
                  <button
                    onClick={handleAnalyze}
                    disabled={!isComplete}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      isComplete
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isComplete ? '🔍 Analisar Envelhecimento' : 'Envie todas as 4 fotos'}
                  </button>
                  
                  {isComplete && (
                    <p className="text-sm text-gray-500 mt-2">
                      A análise levará alguns segundos...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Daily Tip */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">💡 Dica do Dia</h3>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  💧 Beba água logo ao acordar para hidratar a pele de dentro para fora
                </p>
                
                <div className="mt-4 text-xs text-blue-600 font-medium">
                  Gerado por IA • Atualizado diariamente
                </div>
              </div>

              {/* Gamification */}
              {user && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      🌟 Jornada da Juventude
                    </h2>
                    <p className="text-gray-600">
                      Continue cuidando da sua pele e desbloqueie conquistas!
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Nível {user.level}
                      </span>
                      <span className="text-sm text-purple-600 font-medium">
                        {user.points} pontos
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${(user.points % 500) / 500 * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Faltam {500 - (user.points % 500)} pontos para o próximo nível
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                    <div className="flex items-center space-x-3 mb-3">
                      <Star className="w-6 h-6 text-purple-600" />
                      <h4 className="font-semibold text-gray-900">Próximas Metas</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>• Realizar 5 análises</span>
                        <span className="text-purple-600 font-medium">+100 pts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Compartilhar resultado</span>
                        <span className="text-purple-600 font-medium">+50 pts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Usar app por 7 dias</span>
                        <span className="text-purple-600 font-medium">+200 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;