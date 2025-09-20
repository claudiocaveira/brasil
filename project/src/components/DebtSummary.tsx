import React from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

interface DebtSummaryProps {
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  completionPercentage: number;
}

const DebtSummary: React.FC<DebtSummaryProps> = ({
  totalAmount,
  paidAmount,
  remainingAmount,
  completionPercentage
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Resumo das Dívidas</h3>
        <DollarSign className="w-6 h-6 text-blue-600" />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
            <span className="text-sm font-semibold text-blue-600">
              {completionPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
            <div>
              <div className="text-sm text-red-600 font-medium">Total Devido</div>
              <div className="text-xl font-bold text-red-700">
                {formatCurrency(totalAmount)}
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-red-500" />
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
            <div>
              <div className="text-sm text-green-600 font-medium">Já Pago</div>
              <div className="text-xl font-bold text-green-700">
                {formatCurrency(paidAmount)}
              </div>
            </div>
            <TrendingDown className="w-6 h-6 text-green-500" />
          </div>

          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
            <div>
              <div className="text-sm text-orange-600 font-medium">Resta Pagar</div>
              <div className="text-xl font-bold text-orange-700">
                {formatCurrency(remainingAmount)}
              </div>
            </div>
            <DollarSign className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtSummary;