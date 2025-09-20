import React, { useState } from 'react';
import { X, CreditCard, DollarSign, Percent, Calendar } from 'lucide-react';
import { Debt } from '../types';

interface AddDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDebt: (debt: Omit<Debt, 'id'>) => void;
}

const AddDebtModal: React.FC<AddDebtModalProps> = ({ isOpen, onClose, onAddDebt }) => {
  const [formData, setFormData] = useState({
    institution: '',
    type: '',
    amount: '',
    interestRate: '',
    installments: '',
    paidInstallments: '',
    monthlyPayment: '',
    dueDate: ''
  });

  const debtTypes = [
    'Cartão de Crédito',
    'Empréstimo Pessoal',
    'Financiamento',
    'Crédito Consignado',
    'Cheque Especial',
    'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const debt: Omit<Debt, 'id'> = {
      institution: formData.institution,
      type: formData.type,
      amount: parseFloat(formData.amount),
      interestRate: parseFloat(formData.interestRate),
      installments: parseInt(formData.installments),
      paidInstallments: parseInt(formData.paidInstallments),
      monthlyPayment: parseFloat(formData.monthlyPayment),
      dueDate: formData.dueDate,
      isPaid: false
    };

    onAddDebt(debt);
    setFormData({
      institution: '',
      type: '',
      amount: '',
      interestRate: '',
      installments: '',
      paidInstallments: '',
      monthlyPayment: '',
      dueDate: ''
    });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Adicionar Nova Dívida</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 inline mr-2" />
                Instituição
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Banco do Brasil"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Dívida
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione o tipo</option>
                {debtTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Valor Total
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 3500.00"
              />
            </div>

            <div>
              <label htmlFor="monthlyPayment" className="block text-sm font-medium text-gray-700 mb-2">
                Parcela Mensal
              </label>
              <input
                type="number"
                id="monthlyPayment"
                name="monthlyPayment"
                value={formData.monthlyPayment}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 350.00"
              />
            </div>

            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                <Percent className="w-4 h-4 inline mr-2" />
                Taxa de Juros (% a.m.)
              </label>
              <input
                type="number"
                id="interestRate"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInputChange}
                required
                step="0.1"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 15.2"
              />
            </div>

            <div>
              <label htmlFor="installments" className="block text-sm font-medium text-gray-700 mb-2">
                Total de Parcelas
              </label>
              <input
                type="number"
                id="installments"
                name="installments"
                value={formData.installments}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 12"
              />
            </div>

            <div>
              <label htmlFor="paidInstallments" className="block text-sm font-medium text-gray-700 mb-2">
                Parcelas Pagas
              </label>
              <input
                type="number"
                id="paidInstallments"
                name="paidInstallments"
                value={formData.paidInstallments}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 4"
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Próximo Vencimento
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Adicionar Dívida
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDebtModal;