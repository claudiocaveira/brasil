import React from 'react';
import { Trophy, Target, Users, Star, Lock } from 'lucide-react';
import { Badge } from '../types';

interface BadgesProps {
  badges: Badge[];
}

const Badges: React.FC<BadgesProps> = ({ badges }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'target': return Target;
      case 'users': return Users;
      case 'star': return Star;
      default: return Trophy;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Conquistas</h3>
        <Trophy className="w-6 h-6 text-yellow-600" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge) => {
          const IconComponent = getIcon(badge.icon);
          return (
            <div
              key={badge.id}
              className={`relative p-4 rounded-lg text-center transition-all ${
                badge.earned
                  ? 'bg-gradient-to-b from-yellow-50 to-orange-50 border-2 border-yellow-200'
                  : 'bg-gray-50 border-2 border-gray-200 opacity-60'
              }`}
            >
              {!badge.earned && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                badge.earned
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  : 'bg-gray-300'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  badge.earned ? 'text-white' : 'text-gray-500'
                }`} />
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

              {badge.earned && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 mb-2">🎯 Continue Progredindo!</h4>
          <p className="text-sm text-gray-600">
            Complete mais metas para desbloquear novas conquistas e benefícios exclusivos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Badges;