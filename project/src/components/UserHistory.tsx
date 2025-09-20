import React from 'react';
import { Calendar, Eye, Download, TrendingUp } from 'lucide-react';
import { AnalysisResult } from '../types';

interface UserHistoryProps {
  analyses: AnalysisResult[];
  onViewAnalysis: (analysis: AnalysisResult) => void;
}

const UserHistory: React.FC<UserHistoryProps> = ({ analyses, onViewAnalysis }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">📈 Minhas Análises</h2>
        <div className="text-sm text-gray-500">
          {analyses.length} análise{analyses.length !== 1 ? 's' : ''} realizadas
        </div>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma análise ainda
          </h3>
          <p className="text-gray-500">
            Faça sua primeira análise para começar a acompanhar sua jornada
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    {formatDate(analysis.date)}
                  </span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {analysis.analysis.apparentAge} anos
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <img
                  src={analysis.photos.front}
                  alt="Frente"
                  className="w-full h-20 object-cover rounded-lg"
                />
                <img
                  src={analysis.photos.left}
                  alt="Esquerda"
                  className="w-full h-20 object-cover rounded-lg"
                />
                <img
                  src={analysis.photos.right}
                  alt="Direita"
                  className="w-full h-20 object-cover rounded-lg"
                />
                <img
                  src={analysis.photos.hair}
                  alt="Cabelo"
                  className="w-full h-20 object-cover rounded-lg"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Rugas: {analysis.analysis.fineWrinkles}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Flacidez: {analysis.analysis.skinSagging}%</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewAnalysis(analysis)}
                    className="flex items-center space-x-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver Detalhes</span>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;