import React from 'react';
import { Trophy, Star, Award, Target } from 'lucide-react';
import { User, Badge } from '../types';

interface GamificationProps {
  user: User;
  badges: Badge[];
}

const Gamification: React.FC<GamificationProps> = ({ user, badges }) => {
  const levelProgress = (user.points % 500) / 500 * 100;
  const nextLevelPoints = 500 - (user.points % 500);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'camera': return '📷';
      case 'heart': return '❤️';
      case 'share-2': return '📤';
      case 'trophy': return '🏆';
      case 'star': return '⭐';
      default: return '🎯';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🌟 Jornada da Juventude
        </h2>
        <p className="text-gray-600">
          Continue cuidando da sua pele e desbloqueie conquistas!
        </p>
      </div>

      {/* Progresso do Nível */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Nível {user.level}
          </span>
          <span className="text-sm text-purple-600 font-medium">
            {user.points} pontos
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center">
          Faltam {nextLevelPoints} pontos para o próximo nível
        </p>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🏅 Conquistas
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl text-center transition-all ${
                badge.earned
                  ? 'bg-gradient-to-b from-yellow-50 to-orange-50 border-2 border-yellow-200'
                  : 'bg-gray-50 border-2 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">
                {badge.earned ? getIcon(badge.icon) : '🔒'}
              </div>
              <h4 className={`font-semibold text-sm mb-1 ${
                badge.earned ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {badge.name}
              </h4>
              <p className={`text-xs ${
                badge.earned ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {badge.description}
              </p>
              {badge.earned && badge.earnedDate && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  ✓ {new Date(badge.earnedDate).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Próximas Conquistas */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center space-x-3 mb-3">
          <Target className="w-6 h-6 text-purple-600" />
          <h4 className="font-semibold text-gray-900">Próximas Metas</h4>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>• Realizar 5 análises</span>
            <span className="text-purple-600 font-medium">+100 pts</span>
          </div>
          <div className="flex items-center justify-between">
            <span>• Compartilhar resultado</span>
            <span className="text-purple-600 font-medium">+50 pts</span>
          </div>
          <div className="flex items-center justify-between">
            <span>• Usar app por 7 dias</span>
            <span className="text-purple-600 font-medium">+200 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;