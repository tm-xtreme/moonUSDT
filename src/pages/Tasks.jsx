import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Send, UserPlus, DollarSign, Gift } from 'lucide-react';

const tasks = [
  { icon: Send, title: 'Join Channel', reward: '0.000005 USDT' },
  { icon: UserPlus, title: 'Invite 3 Friends', reward: '0.000005 USDT' },
  { icon: DollarSign, title: 'Earn 5 USDT', reward: '0.00001 USDT' },
  { icon: Gift, title: 'Daily Reward', reward: '0.000001 USDT' },
];

const Tasks = () => {
  const handleClaim = () => {
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
      <div>
        <h2 className="font-bold text-lg mb-2">Pending</h2>
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-yellow-500" />
                  <div className="flex-1">
                    <p className="font-semibold">{task.title}</p>
                    <Button className="action-button h-8 mt-2 w-full" onClick={handleClaim}>
                      Claim {task.reward}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="font-bold text-lg mb-2">Completed</h2>
        <div className="bg-white rounded-xl p-6 text-center text-gray-500 shadow-sm">
          No available task
        </div>
      </div>
    </motion.div>
  );
};

export default Tasks;