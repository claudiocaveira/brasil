import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import PhotoUpload from './components/PhotoUpload';
import AnalysisModal from './components/AnalysisModal';
import UserHistory from './components/UserHistory';
import Gamification from './components/Gamification';
import DailyTip from './components/DailyTip';
import DetailedAnalysisModal from './components/DetailedAnalysisModal';
import { mockUser, mockAnalysis, mockBadges } from './data/mockData';
import { AnalysisResult } from './types';

function App() {
  const [user, setUser] = useState(mockUser);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [userAnalyses, setUserAnalyses] = useState<AnalysisResult[]>([mockAnalysis]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detailedAnalysisModal, setDetailedAnalysisModal] = useState<{
    isOpen: boolean;
    type: 'wrinkles' | 'skincare' | null;
  }>({ isOpen: false, type: null });

  const handleLogin = (email: string, password: string) => {
    // Simular login
    setUser(mockUser);
  };

  const handleAnalyze = async (photos: { front: File; left: File; right: File; hair: File }) => {
    setIsAnalyzing(true);
    
    // Simular análise da IA (3 segundos)
    setTimeout(() => {
      const newAnalysis: AnalysisResult = {
        ...mockAnalysis,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0]
      };
      
      setCurrentAnalysis(newAnalysis);
      setIsAnalysisModalOpen(true);
      setIsAnalyzing(false);
      
      // Adicionar pontos ao usuário
      setUser(prev => ({
        ...prev,
        points: prev.points + 100
      }));
    }, 3000);
  };

  const handleSaveReport = () => {
    if (currentAnalysis) {
      setUserAnalyses(prev => [currentAnalysis, ...prev]);
      setIsAnalysisModalOpen(false);
    }
  };

  const handleViewAnalysis = (analysis: AnalysisResult) => {
    setCurrentAnalysis(analysis);
    setIsAnalysisModalOpen(true);
  };

  const openDetailedAnalysis = (type: 'wrinkles' | 'skincare') => {
    setDetailedAnalysisModal({ isOpen: true, type });
  };

  const closeDetailedAnalysis = () => {
    setDetailedAnalysisModal({ isOpen: false, type: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onProfileClick={() => {}}
      />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
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
          </motion.div>

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  🤖 Analisando suas fotos...
                </h3>
                <p className="text-gray-600">
                  Nossa IA está processando suas imagens. Isso pode levar alguns segundos.
                </p>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PhotoUpload onAnalyze={handleAnalyze} />
              </motion.div>
              
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <UserHistory 
                    analyses={userAnalyses}
                    onViewAnalysis={handleViewAnalysis}
                  />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <DailyTip />
              </motion.div>
              
              {/* Botões de Análise Detalhada */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <button
                  onClick={() => openDetailedAnalysis('wrinkles')}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                >
                  📊 Análise de Linhas de Envelhecimento
                </button>
                <button
                  onClick={() => openDetailedAnalysis('skincare')}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  ✨ Rotina de Skincare Personalizada
                </button>
              </motion.div>
              
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Gamification user={user} badges={mockBadges} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {currentAnalysis && (
        <AnalysisModal
          isOpen={isAnalysisModalOpen}
          onClose={() => setIsAnalysisModalOpen(false)}
          analysis={currentAnalysis}
          onSaveReport={handleSaveReport}
        />
      )}

      {detailedAnalysisModal.type && (
        <DetailedAnalysisModal
          isOpen={detailedAnalysisModal.isOpen}
          onClose={closeDetailedAnalysis}
          analysisType={detailedAnalysisModal.type}
        />
      )}
    </div>
  );
}

export default App;