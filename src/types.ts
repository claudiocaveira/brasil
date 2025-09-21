export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  level: number;
  joinDate: string;
}

export interface AnalysisResult {
  id: string;
  userId: string;
  date: string;
  photos: {
    front: string;
    left: string;
    right: string;
    hair: string;
  };
  analysis: {
    expressionLines: number;
    fineWrinkles: number;
    deepWrinkles: number;
    skinSagging: number;
    darkCircles: number;
    spots: number;
    apparentAge: number;
    hairCondition: {
      hairLoss: number;
      dryness: number;
      grayHair: number;
    };
  };
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  category: 'skincare' | 'lifestyle' | 'aesthetic' | 'hair';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}