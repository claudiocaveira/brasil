import { User, Badge } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@example.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  age: 28,
  joinDate: '2024-01-15'
};

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Primeira Análise',
    description: 'Completou sua primeira análise facial',
    icon: 'camera',
    earned: true,
    earnedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Consistente',
    description: 'Realizou análises por 7 dias consecutivos',
    icon: 'calendar-check',
    earned: true,
    earnedDate: '2024-01-22'
  },
  {
    id: '3',
    name: 'Cuidado Completo',
    description: 'Seguiu todas as recomendações por uma semana',
    icon: 'heart',
    earned: false
  }
];