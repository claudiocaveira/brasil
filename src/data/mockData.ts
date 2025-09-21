@@ .. @@
-import { User, AnalysisResult, Recommendation, Badge } from '../types';
+import { User, Badge } from '../types';
 
 export const mockUser: User = {
   id: '1',
@@ .. @@
   joinDate: '2024-01-15'
 };
 
-export const mockAnalysis: AnalysisResult = {
-  id: '1',
-  userId: '1',
-  date: '2024-12-20',
-  photos: {
-    front: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
-    left: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
-    right: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
-    hair: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'
-  },
-  analysis: {
-    expressionLines: 25,
-    fineWrinkles: 15,
-    deepWrinkles: 5,
-    skinSagging: 20,
-    darkCircles: 30,
-    spots: 10,
-    apparentAge: 32,
-    hairCondition: {
-      hairLoss: 15,
-      dryness: 25,
-      grayHair: 10
-    }
-  },
-  recommendations: [
-    {
-      id: '1',
-      category: 'skincare',
-      title: 'Protetor Solar FPS 60+',
-      description: 'Use diariamente para prevenir o envelhecimento precoce',
-      priority: 'high',
-      icon: 'sun'
-    },
-    {
-      id: '2',
-      category: 'skincare',
-      title: 'Sérum com Vitamina C',
-      description: 'Antioxidante poderoso para combater radicais livres',
-      priority: 'high',
-      icon: 'droplets'
-    },
-    {
-      id: '3',
-      category: 'lifestyle',
-      title: 'Hidratação Adequada',
-      description: 'Beba pelo menos 2L de água por dia',
-      priority: 'medium',
-      icon: 'glass-water'
-    }
-  ]
-};
-
 export const mockBadges: Badge[] = [
   {
     id: '1',