import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { getTelegramUser, expandTelegramApp, configureTelegramHeader, hapticFeedback } from '@/lib/telegram';

import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import Dashboard from '@/pages/Dashboard';
import Tasks from '@/pages/Tasks';
import Boost from '@/pages/Boost';
import Friends from '@/pages/Friends';
import Mining from '@/pages/Mining';
import Deposit from '@/pages/Deposit';
import useStorage from '@/hooks/useStorage';

const AppLayout = ({ user }) => {
  const location = useLocation();
  const showHeader = location.pathname !== '/deposit';
  const showNav = location.pathname !== '/deposit';

  return (
    <div className="main-container min-h-screen flex flex-col">
      {showHeader && <Header user={user} />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {showNav && <BottomNavigation />}
      {showNav && <div className="h-16" />}
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = () => {
      expandTelegramApp();
      configureTelegramHeader();
      const telegramData = getTelegramUser();
      if (!telegramData.user) {
        setLoading(false);
        return;
      }

      const storedUser = localStorage.getItem(`moon_user_${telegramData.user.id}`);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const newUser = {
          id: telegramData.user.id,
          fullName: `${telegramData.user.firstName} ${telegramData.user.lastName || ''}`.trim(),
          username: telegramData.user.username || 'username',
          photoUrl: telegramData.user.photoUrl || '',
          totalBalance: 0.00000001,
          storageBalance: 0,
          storageCapacity: 0.00005000,
          miningRate: 0.0000027, // USDT per hour
          minerLevel: 1,
          storageLevel: 1,
          lastClaimTime: Date.now(),
          referrals: [],
          createdAt: Date.now()
        };
        
        if (telegramData.startParam && telegramData.startParam.startsWith('refTGID_')) {
          newUser.totalBalance += 0.2;
          toast({
            title: "Welcome Bonus!",
            description: "+0.2 USDT for joining via referral!",
            duration: 3000,
          });
        }
        
        setUser(newUser);
        localStorage.setItem(`moon_user_${newUser.id}`, JSON.stringify(newUser));
      }
      setLoading(false);
    };

    initializeApp();
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem(`moon_user_${updatedUser.id}`, JSON.stringify(updatedUser));
  };

  const { storage, claimStorage } = useStorage(user, updateUser);

  const handleClaim = () => {
    if(storage > 0){
        claimStorage();
        hapticFeedback('notification');
        toast({
            title: "💰 Claimed!",
            description: `You've successfully claimed your mined USDT.`,
            duration: 3000,
        });
    } else {
        toast({
            title: "🤔 Nothing to claim",
            description: "Your storage is empty. Keep mining!",
            variant: "destructive",
            duration: 3000,
        });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbeb]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<AppLayout user={user} />}>
          <Route path="/" element={<Dashboard user={user} storage={storage} />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/boost" element={<Boost user={user} />} />
          <Route path="/friends" element={<Friends user={user} />} />
          <Route path="/mining" element={<Mining user={user} storage={storage} onClaim={handleClaim} />} />
          <Route path="/deposit" element={<Deposit />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;