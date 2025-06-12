
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

const BalanceCard = ({ balance }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="balance-card rounded-2xl p-6 text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <DollarSign className="w-6 h-6 text-green-400" />
        <span className="text-lg font-semibold text-muted-foreground">Total Mined</span>
      </div>
      <motion.div
        key={balance}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-green-400"
      >
        {balance.toFixed(4)} USDT
      </motion.div>
    </motion.div>
  );
};

export default BalanceCard;
