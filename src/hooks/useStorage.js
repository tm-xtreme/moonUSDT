import { useState, useEffect, useCallback } from 'react';

const useStorage = (user, onUpdateUser) => {
  const [storage, setStorage] = useState(user?.storageBalance || 0);

  const calculateStorage = useCallback(() => {
    if (!user) return 0;

    const now = Date.now();
    const timeSinceLastClaim = (now - user.lastClaimTime) / (1000 * 3600); // in hours
    const minedAmount = timeSinceLastClaim * user.miningRate;
    
    return Math.min(user.storageCapacity, user.storageBalance + minedAmount);
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStorage(calculateStorage());
    }, 1000); 

    return () => clearInterval(interval);
  }, [calculateStorage]);

  const claimStorage = () => {
    if (!user) return;
    
    const currentStorage = calculateStorage();
    const updatedUser = {
      ...user,
      totalBalance: user.totalBalance + currentStorage,
      storageBalance: 0,
      lastClaimTime: Date.now(),
    };
    onUpdateUser(updatedUser);
    setStorage(0);
  };
  
  return { storage, claimStorage };
};

export default useStorage;