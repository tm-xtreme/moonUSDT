
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { hapticFeedback } from '@/lib/telegram';

export const useMining = (user, onUpdateUser) => {
  const [energy, setEnergy] = useState(user?.energy || 20);
  const [rechargeTime, setRechargeTime] = useState(0);

  // Calculate current energy based on last mine time
  useEffect(() => {
    if (!user) return;

    const calculateEnergy = () => {
      const now = Date.now();
      const timeDiff = now - (user.lastMineTime || now);
      const minutesPassed = Math.floor(timeDiff / (1000 * 60));
      const energyToRestore = Math.floor(minutesPassed / 5); // 1 energy per 5 minutes
      
      const currentEnergy = Math.min(20, (user.energy || 20) + energyToRestore);
      setEnergy(currentEnergy);

      // Calculate time until next energy recharge
      if (currentEnergy < 20) {
        const nextRechargeIn = 300 - ((timeDiff / 1000) % 300); // 300 seconds = 5 minutes
        setRechargeTime(Math.ceil(nextRechargeIn));
      } else {
        setRechargeTime(0);
      }
    };

    calculateEnergy();
    const interval = setInterval(calculateEnergy, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const mine = useCallback(async () => {
    if (!user || energy <= 0) return;

    try {
      hapticFeedback('impact');
      
      const miningPower = user.miningPower || 0.01;
      const newEnergy = energy - 1;
      
      // Update local state immediately for better UX
      setEnergy(newEnergy);
      
      // Show mining toast
      toast({
        title: `+${miningPower.toFixed(4)} USDT mined!`,
        description: "Keep mining to earn more!",
        duration: 2000,
      });

      // Update user data
      const updatedUser = {
        ...user,
        totalMined: (user.totalMined || 0) + miningPower,
        energy: newEnergy,
        lastMineTime: Date.now()
      };

      onUpdateUser(updatedUser);

      // In a real app, you would also update the database here
      // await updateUserMining(user.id, miningPower, newEnergy);

    } catch (error) {
      console.error('Mining error:', error);
      toast({
        title: "Mining failed",
        description: "Please try again",
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [user, energy, onUpdateUser]);

  return {
    energy,
    rechargeTime,
    mine,
    canMine: energy > 0
  };
};
