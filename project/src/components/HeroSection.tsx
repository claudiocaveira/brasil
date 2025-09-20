import React from 'react';
import { TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6 rounded-2xl mb-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Organize suas dívidas e conquiste sua{' '}
          <span className="text-yellow-300">liberdade financeira</span>
        </h1>
        
        <p className="text-xl opacity-90 mb-8">
          Transforme sua vida financeira com nosso plano inteligente de quitação
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/20 rounded-full px-6 py-2">
            <span className="text-sm font-medium">🎯 Foco nas metas</span>
          </div>
          <div className="bg-white/20 rounded-full px-6 py-2">
            <span className="text-sm font-medium">💡 Plano inteligente</span>
          </div>
          <div className="bg-white/20 rounded-full px-6 py-2">
            <span className="text-sm font-medium">🏆 Gamificação</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;