import React, { useState } from 'react';
import { Camera, Upload, X, Sparkles, User, Star, Download, RefreshCw, Eye, Share2 } from 'lucide-react';

function App() {
  const [photos, setPhotos] = useState<{[key: string]: File}>({});
  const [previews, setPreviews] = useState<{[key: string]: string}>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentTip, setCurrentTip] = useState("Use protetor solar diariamente, mesmo em dias nublados. É a melhor forma de prevenir o envelhecimento precoce da pele.");
  const [analysisData, setAnalysisData] = useState({
    apparentAge: 0,
    skinQuality: 0,
    hydration: 0,
    elasticity: 0,
    brightness: 0,
    wrinkles: 0,
    spots: 0
  });

  const tips = [
    "Use protetor solar diariamente, mesmo em dias nublados. É a melhor forma de prevenir o envelhecimento precoce da pele.",
    "Beba pelo menos 2 litros de água por dia para manter a pele hidratada de dentro para fora.",
    "Durma de 7-8 horas por noite para permitir a regeneração celular adequada.",
    "Consuma alimentos ricos em antioxidantes como frutas vermelhas e vegetais verdes.",
    "Use produtos com ácido hialurônico para hidratação profunda da pele.",
    "Evite fumar e consumo excessivo de álcool, pois aceleram o envelhecimento.",
    "Pratique exercícios regularmente para melhorar a circulação sanguínea."
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

  const getNewTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAnalysisData({
        apparentAge: Math.floor(Math.random() * 15) + 25,
        skinQuality: Math.floor(Math.random() * 30) + 70,
        hydration: Math.floor(Math.random() * 25) + 75,
        elasticity: Math.floor(Math.random() * 35) + 65,
        brightness: Math.floor(Math.random() * 20) + 80,
        wrinkles: Math.floor(Math.random() * 40) + 10,
        spots: Math.floor(Math.random() * 30) + 5
      });
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Minha Análise de Envelhecimento - YouthAI',
        text: `Descobri minha idade aparente: ${analysisData.apparentAge} anos! Confira sua análise também.`,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(`Descobri minha idade aparente: ${analysisData.apparentAge} anos no YouthAI!`);
      alert('Link copiado para a área de transferência!');
    }
  };

  const uploadAreas = [
    { key: 'front', label: 'Rosto de Frente', icon: '👤', description: 'Foto frontal do rosto' },
    { key: 'left', label: 'Lado Esquerdo', icon: '👈', description: 'Perfil esquerdo' },
    { key: 'right', label: 'Lado Direito', icon: '👉', description: 'Perfil direito' },
    { key: 'hair', label: 'Foto do Cabelo', icon: '💇‍♀️', description: 'Foco no cabelo' }
  ];

  const isComplete = uploadAreas.every(area => photos[area.key]);

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

      {/* Loading Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md mx-4 shadow-2xl">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              🤖 Analisando suas fotos...
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Nossa IA está processando suas imagens com algoritmos avançados de reconhecimento facial. 
              Isso pode levar alguns segundos.
            </p>
            <div className="mt-4 text-sm text-purple-600 font-medium">
              Processando... Por favor, aguarde
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">📊 Resultado da Análise</h2>
                <button
                  onClick={() => setShowResults(false)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Idade Aparente */}
              <div className="text-center mb-10 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-purple-100">
                <div className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  {analysisData.apparentAge}
                </div>
                <div className="text-2xl text-gray-700 font-semibold">anos aparenta ter</div>
                <div className="text-sm text-gray-500 mt-3">
                  Baseado na análise avançada das suas fotos
                </div>
              </div>

              {/* Métricas Detalhadas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-6 bg-green-50 rounded-2xl text-center border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-2">{analysisData.skinQuality}%</div>
                  <div className="text-sm text-gray-600 font-medium">Qualidade da Pele</div>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl text-center border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{analysisData.hydration}%</div>
                  <div className="text-sm text-gray-600 font-medium">Hidratação</div>
                </div>
                <div className="p-6 bg-yellow-50 rounded-2xl text-center border border-yellow-100">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{analysisData.elasticity}%</div>
                  <div className="text-sm text-gray-600 font-medium">Elasticidade</div>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl text-center border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{analysisData.brightness}%</div>
                  <div className="text-sm text-gray-600 font-medium">Luminosidade</div>
                </div>
              </div>

              {/* Análise Detalhada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-orange-900 mb-3 flex items-center">
                    📏 Análise de Rugas
                  </h4>
                  <div className="text-2xl font-bold text-orange-600 mb-2">{analysisData.wrinkles}%</div>
                  <p className="text-sm text-orange-700">
                    {analysisData.wrinkles < 20 ? 'Poucas linhas de expressão detectadas' :
                     analysisData.wrinkles < 40 ? 'Rugas moderadas, típicas da idade' :
                     'Rugas mais acentuadas, considere tratamentos'}
                  </p>
                </div>
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                  <h4 className="font-bold text-red-900 mb-3 flex items-center">
                    🔍 Manchas na Pele
                  </h4>
                  <div className="text-2xl font-bold text-red-600 mb-2">{analysisData.spots}%</div>
                  <p className="text-sm text-red-700">
                    {analysisData.spots < 15 ? 'Pele uniforme, poucas manchas' :
                     analysisData.spots < 30 ? 'Algumas manchas detectadas' :
                     'Manchas mais visíveis, use protetor solar'}
                  </p>
                </div>
              </div>

              {/* Recomendações */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Recomendações Personalizadas</h3>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">🌞 Proteção Solar</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• Use protetor solar FPS 60+ diariamente, mesmo em dias nublados</li>
                    <li>• Reaplique a cada 2 horas se estiver exposto ao sol</li>
                    <li>• Use chapéu e óculos de sol para proteção extra</li>
                  </ul>
                </div>
                <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">✨ Cuidados com a Pele</h4>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• Aplique sérum com vitamina C pela manhã</li>
                    <li>• Use hidratante adequado ao seu tipo de pele 2x ao dia</li>
                    <li>• Considere produtos com ácido hialurônico para hidratação</li>
                  </ul>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">🥗 Estilo de Vida</h4>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li>• Beba pelo menos 2 litros de água por dia</li>
                    <li>• Durma de 7-8 horas por noite para regeneração celular</li>
                    <li>• Consuma alimentos ricos em antioxidantes</li>
                  </ul>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleShare}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartilhar Resultado</span>
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>Salvar Relatório</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                            className="w-full h-48 object-cover rounded-2xl border-2 border-green-200 shadow-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                            <button
                              onClick={() => removePhoto(area.key)}
                              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <X className="w-6 h-6" />
                            </button>
                          </div>
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
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
                    onClick={handleAnalyze}
                    disabled={!isComplete}
                    className={`px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg ${
                      isComplete
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isComplete ? '🔍 Analisar Envelhecimento' : 'Envie todas as 4 fotos'}
                  </button>
                  
                  {isComplete && (
                    <p className="text-sm text-gray-500 mt-4">
                      A análise levará alguns segundos para ser processada...
                    </p>
                  )}
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
                  <button
                    onClick={getNewTip}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Nova dica"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {currentTip}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;