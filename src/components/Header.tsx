@@ .. @@
 import React from 'react';
 import { Sparkles, User, LogIn } from 'lucide-react';
+import { User as UserType } from '../types';
 
 interface HeaderProps {
-  user: any;
+  user: UserType | null;
   onLoginClick: () => void;
   onProfileClick: () => void;
 }

export default React