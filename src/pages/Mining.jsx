import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Mining = ({ user, storage, onClaim }) => {
  
  const calculateTimeToFill = () => {
    if (!user || !storage) return { hours: 0, minutes: 0 };

    const remainingCapacity = user.storageCapacity - storage;
    if (remainingCapacity <= 0) return { hours: 0, minutes: 0 };
    
    const timeInHours = remainingCapacity / user.miningRate;
    const hours = Math.floor(timeInHours);
    const minutes = Math.floor((timeInHours - hours) * 60);

    return { hours, minutes };
  };

  const { hours, minutes } = calculateTimeToFill();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 flex flex-col items-center justify-center text-center h-full"
    >
      <div className="space-y-2">
        <p className="text-lg text-gray-500">In storage:</p>
        <p className="text-5xl font-bold">{(storage || 0).toFixed(8)}</p>
        <p className="text-sm text-gray-500">USDT Balance: {(user?.totalBalance || 0).toFixed(8)}</p>
      </div>

      <div className="w-full max-w-sm my-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <img  class="w-20 h-20" alt="Mining Cart" src="https://images.unsplash.com/photo-1466619538343-ecdf110c35b2" />
                <div className="flex-1 text-left">
                    <p className="font-bold">Level {user?.minerLevel || 1}</p>
                    <p className="text-sm text-gray-500">{hours}h {minutes}m to fill</p>
                    <p className="text-sm text-gray-500">{(user?.miningRate || 0).toFixed(8)} USDT/hour</p>
                </div>
                <Button className="action-button" onClick={onClaim}>Claim</Button>
            </div>
        </div>
      </div>

      <p className="text-sm font-semibold">Claim USDT from storage to keep mining</p>
      <div className="flex justify-between w-full max-w-xs mt-4 text-sm text-gray-500">
        <span>Claim fee</span>
        <span>0.000007 USDT</span>
      </div>
    </motion.div>
  );
};

export default Mining;