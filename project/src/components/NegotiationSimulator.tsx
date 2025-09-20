import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

const NegotiationSimulator: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Simulação de Renegociação</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-red-900">💳 Cenário Atual</h4>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Valor mensal médio:</span>
              <span className="font-semibold">{formatCurrency(890)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Juros médio:</span>
              <span className="font-semibold text-red-600">12,2% a.m.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tempo estimado:</span>
              <span className="font-semibold">38 meses</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-green-900">🎯 Após Renegociação</h4>
            <TrendingDown className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Valor mensal médio:</span>
              <span className="font-semibold">{formatCurrency(650)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Juros médio:</span>
              <span className="font-semibold text-green-600">7,8% a.m.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tempo estimado:</span>
              <span className="font-semibold">28 meses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
        <h5 className="font-semibold text-blue-900 mb-1">💰 Economia Estimada</h5>
        <div className="text-2xl font-bold text-blue-700">{formatCurrency(8420)}</div>
        <p className="text-sm text-blue-600">Você pode economizar esse valor renegociando suas dívidas</p>
      </div>

      <button className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
        Iniciar Renegociação Inteligente
      </button>
    </div>
  );
};

export default NegotiationSimulator;