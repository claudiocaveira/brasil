import React from 'react';
import { User, Mail } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  completionPercentage: number;
  totalDebts: number;
  paidDebts: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  completionPercentage, 
  totalDebts, 
  paidDebts 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <Mail className="w-4 h-4 mr-1" />
            {user.email}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-sm font-semibold text-blue-600">
              {completionPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalDebts}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{paidDebts}</div>
            <div className="text-sm text-gray-600">Quitadas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;