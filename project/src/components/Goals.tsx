import React from 'react';
import { Target, Calendar, TrendingUp } from 'lucide-react';

interface GoalsProps {
  targetDate: string;
  completionPercentage: number;
}

const Goals: React.FC<GoalsProps> = ({ targetDate, completionPercentage }) => {
  const targetYear = new Date(targetDate).getFullYear();
  const currentDate = new Date();
  const target = new Date(targetDate);
  const daysRemaining = Math.max(0, Math.ceil((target.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
  const monthsRemaining = Math.max(0, Math.ceil(daysRemaining / 30));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Metas</h3>
        <Target className="w-6 h-6 text-green-600" />
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-white" />
          </div>
          
          <h4 className="text-2xl font-bold text-gray-900 mb-2">
            Quitar até {targetYear}
          </h4>
          <p className="text-gray-600">Sua meta de liberdade financeira</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso da Meta</span>
            <span className="text-sm font-semibold text-green-600">
              {completionPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{monthsRemaining}</div>
            <div className="text-sm text-gray-600">Meses Restantes</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{daysRemaining}</div>
            <div className="text-sm text-gray-600">Dias Restantes</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          <div className="text-center">
            <h5 className="font-semibold text-gray-900 mb-2">🚀 Você está indo bem!</h5>
            <p className="text-sm text-gray-600">
              {completionPercentage >= 75
                ? 'Quase lá! Continue focado na sua meta.'
                : completionPercentage >= 50
                ? 'Metade do caminho percorrido! Continue assim.'
                : completionPercentage >= 25
                ? 'Bom progresso! Mantenha o ritmo.'
                : 'Cada passo conta. Você consegue!'
              }
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all">
            Revisar Meta
          </button>
          <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all">
            Simular Cenários
          </button>
        </div>
      </div>
    </div>
  );
};

export default Goals;