import React, { useState } from 'react';
import { Share2, Copy, Gift, Users } from 'lucide-react';

const ReferralCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'ANA2024';
  const referralBalance = 275.50;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-sm p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Indique e Ganhe</h3>
        <Gift className="w-6 h-6" />
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">{formatCurrency(referralBalance)}</div>
          <div className="text-sm opacity-90">Saldo de Comissões</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Seu Código</div>
              <div className="text-lg font-bold">{referralCode}</div>
            </div>
            <button
              onClick={handleCopyCode}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              {copied ? (
                <div className="w-5 h-5 flex items-center justify-center">✓</div>
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold">R$ 50 para cada indicação</div>
              <div className="text-sm opacity-90">Receba quando seu amigo se cadastrar</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold">Seu amigo ganha desconto</div>
              <div className="text-sm opacity-90">20% off no primeiro mês</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Compartilhar Código</span>
          </button>
          
          <button className="w-full py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all">
            Resgatar Saldo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;