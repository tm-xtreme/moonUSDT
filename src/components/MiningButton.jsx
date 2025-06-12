
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const MiningButton = ({ onMine, disabled, energy }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <Button
        onClick={onMine}
        disabled={disabled || energy <= 0}
        className="mining-button w-48 h-48 rounded-full text-2xl font-bold text-black shadow-2xl border-0 relative overflow-hidden"
        size="lg"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Zap className="w-16 h-16" />
        </motion.div>
        <div className="relative z-10 flex flex-col items-center">
          <span>MINE</span>
          <span className="text-lg">USDT</span>
        </div>
      </Button>
    </motion.div>
  );
};

export default MiningButton;
