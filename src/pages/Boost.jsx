import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Shovel as Pickaxe, Archive } from 'lucide-react';

const Boost = ({ user }) => {
  const handleUpgrade = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-4"
    >
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Pickaxe className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="font-bold">Miner: Level {user?.minerLevel || 1}</p>
              <p className="text-sm text-gray-500">Pay 0.05 USDT to upgrade miner</p>
            </div>
          </div>
          <Button className="action-button" onClick={handleUpgrade}>Upgrade</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-full">
                <Archive className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="font-bold">Storage: Level {user?.storageLevel || 1}</p>
              <p className="text-sm text-gray-500">Pay 0.005 USDT to upgrade storage</p>
            </div>
          </div>
          <Button className="action-button" onClick={handleUpgrade}>Upgrade</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Boost;