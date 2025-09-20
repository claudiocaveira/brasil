import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { dailyTips } from '../data/mockData';

const DailyTip: React.FC = () => {
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    // Seleciona uma dica baseada no dia atual
    const today = new Date().getDate();
    const tipIndex = today % dailyTips.length;
    setCurrentTip(dailyTips[tipIndex]);
  }, []);

  const getNewTip = () => {
    const randomIndex = Math.floor(Math.random() * dailyTips.length);
    setCurrentTip(dailyTips[randomIndex]);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            💡 Dica do Dia
          </h3>
        </div>
        <button
          onClick={getNewTip}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          title="Nova dica"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-gray-700 leading-relaxed">
        {currentTip}
      </p>
      
      <div className="mt-4 text-xs text-blue-600 font-medium">
        Gerado por IA • Atualizado diariamente
      </div>
    </div>
  );
};

export default DailyTip;