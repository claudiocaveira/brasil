import React from 'react';
import { Clock, AlertCircle, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { Debt } from '../types';

interface PaymentPlanProps {
  debts: Debt[];
  onToggleDebt: (id: string) => void;
}

const PaymentPlan: React.FC<PaymentPlanProps> = ({ debts, onToggleDebt }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const activeDebts = debts
    .filter(debt => !debt.isPaid)
    .sort((a, b) => b.interestRate - a.interestRate);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Plano de Pagamento</h3>
        <Clock className="w-6 h-6 text-purple-600" />
      </div>

      <div className="space-y-4">
        {activeDebts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">Parabéns! Todas as dívidas foram quitadas!</p>
          </div>
        ) : (
          activeDebts.map((debt, index) => (
            <div
              key={debt.id}
              className={`border rounded-lg p-4 ${
                debt.interestRate >= 15
                  ? 'border-red-200 bg-red-50'
                  : debt.interestRate >= 10
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{debt.institution}</h4>
                      <p className="text-sm text-gray-600">{debt.type}</p>
                    </div>
                    {index === 0 && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        PRIORIDADE
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Valor Total</span>
                      <div className="font-semibold">{formatCurrency(debt.amount)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Parcela Mensal</span>
                      <div className="font-semibold">{formatCurrency(debt.monthlyPayment)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Taxa de Juros</span>
                      <div className={`font-semibold ${
                        debt.interestRate >= 15 ? 'text-red-600' :
                        debt.interestRate >= 10 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {debt.interestRate}% a.m.
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Vencimento</span>
                      <div className="font-semibold flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(debt.dueDate)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progresso: {debt.paidInstallments}/{debt.installments} parcelas</span>
                      <span>{((debt.paidInstallments / debt.installments) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(debt.paidInstallments / debt.installments) * 100}%` }}
                      />
                    </div>
                  </div>

                  {debt.interestRate >= 15 && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">URGENTE - Taxa de juros muito alta!</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onToggleDebt(debt.id)}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Marcar como Paga
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {activeDebts.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">💡 Dica Inteligente</h4>
              <p className="text-sm text-blue-700">
                Priorize as dívidas com maiores juros para economizar mais dinheiro. 
                Considere renegociar condições para reduzir os custos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPlan;