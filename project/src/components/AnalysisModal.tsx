import React, { useState } from 'react';
import { X, Share2, Download, ChevronRight, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '../types';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult;
  onSaveReport: () => void;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ 
  isOpen, 
  onClose, 
  analysis, 
  onSaveReport 
}) => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  const getScoreColor = (score: number) => {
    if (score <= 20) return 'text-green-600 bg-green-100';
    if (score <= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score <= 20) return <CheckCircle className="w-4 h-4" />;
    if (score <= 40) return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const analysisItems = [
    { label: 'Linhas de Expressão', value: analysis.analysis.expressionLines, icon: '😊' },
    { label: 'Rugas Finas', value: analysis.analysis.fineWrinkles, icon: '📏' },
    { label: 'Rugas Profundas', value: analysis.analysis.deepWrinkles, icon: '📐' },
    { label: 'Flacidez da Pele', value: analysis.analysis.skinSagging, icon: '⬇️' },
    { label: 'Olheiras/Manchas', value: analysis.analysis.darkCircles, icon: '👁️' },
    { label: 'Manchas na Pele', value: analysis.analysis.spots, icon: '🔍' }
  ];

  const hairAnalysis = [
    { label: 'Queda de Cabelo', value: analysis.analysis.hairCondition.hairLoss, icon: '💇‍♀️' },
    { label: 'Ressecamento', value: analysis.analysis.hairCondition.dryness, icon: '🌵' },
    { label: 'Fios Brancos', value: analysis.analysis.hairCondition.grayHair, icon: '⚪' }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Minha Análise de Envelhecimento - YouthAI',
        text: `Descobri minha idade aparente: ${analysis.analysis.apparentAge} anos! Confira sua análise também.`,
        url: window.location.href
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {!showRecommendations ? (
              // Análise Principal
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    📊 Relatório da IA
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Idade Aparente */}
                <div className="text-center mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {analysis.analysis.apparentAge}
                  </div>
                  <div className="text-xl text-gray-700">anos aparenta ter</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Baseado na análise das suas fotos
                  </div>
                </div>

                {/* Análise Facial */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    🔍 Análise Facial
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-medium text-gray-700">{item.label}</span>
                        </div>
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getScoreColor(item.value)}`}>
                          {getScoreIcon(item.value)}
                          <span className="font-semibold">{item.value}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Análise Capilar */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    💇‍♀️ Condição do Cabelo
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {hairAnalysis.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (analysisItems.length + index) * 0.1 }}
                        className="text-center p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="font-medium text-gray-700 mb-2">{item.label}</div>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${getScoreColor(item.value)}`}>
                          {getScoreIcon(item.value)}
                          <span className="font-semibold text-sm">{item.value}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowRecommendations(true)}
                    className="flex-1 flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    <Star className="w-5 h-5" />
                    <span>Ver Recomendações</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={onSaveReport}
                    className="flex-1 flex items-center justify-center space-x-2 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span>Salvar Relatório</span>
                  </button>
                </div>
              </div>
            ) : (
              // Recomendações
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowRecommendations(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-500 rotate-180" />
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900">
                      ✨ Recomendações Personalizadas
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {analysis.recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border-l-4 ${
                        rec.priority === 'high' 
                          ? 'bg-red-50 border-red-400' 
                          : rec.priority === 'medium'
                          ? 'bg-yellow-50 border-yellow-400'
                          : 'bg-green-50 border-green-400'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${
                          rec.category === 'skincare' ? 'bg-purple-100 text-purple-600' :
                          rec.category === 'lifestyle' ? 'bg-green-100 text-green-600' :
                          rec.category === 'aesthetic' ? 'bg-pink-100 text-pink-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Star className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {rec.title}
                          </h4>
                          <p className="text-gray-600">
                            {rec.description}
                          </p>
                          <div className="mt-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              rec.priority === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : rec.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {rec.priority === 'high' ? '🔥 Alta Prioridade' :
                               rec.priority === 'medium' ? '⚡ Média Prioridade' :
                               '✅ Baixa Prioridade'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center space-x-2 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Compartilhar Resultados</span>
                  </button>
                  
                  <button
                    onClick={onSaveReport}
                    className="flex-1 flex items-center justify-center space-x-2 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span>Salvar Relatório</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnalysisModal;