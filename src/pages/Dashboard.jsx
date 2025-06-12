import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle } from 'lucide-react';

const transactions = [
    { type: 'Claim Fee', amount: -0.000007, date: '2025-06-11 19:47:19', status: 'Claim Fee'},
    { type: 'Claim', amount: 0.00000001, date: '2025-06-11 19:47:19', status: 'Claim'},
    { type: 'Free', amount: 0.0000007, date: '2025-06-11 19:46:55', status: 'Free'},
];


const Dashboard = ({ user, storage }) => {
  const navigate = useNavigate();
  const storagePercentage = user ? (storage / user.storageCapacity) * 100 : 0;
  const isStorageFull = storagePercentage >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-4"
    >
      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
        <p className="text-sm text-gray-500">Total Balance</p>
        <p className="text-3xl font-bold my-2">{(user?.totalBalance || 0).toFixed(8)}</p>
        <div className="flex gap-2 justify-center">
          <Button className="action-button flex-1" onClick={() => navigate('/deposit')}>Deposit</Button>
          <Button className="action-button flex-1" onClick={() => navigate('/deposit')}>Withdraw</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm relative overflow-hidden cursor-pointer" onClick={() => navigate('/mining')}>
          <p className="text-sm text-gray-500">USDT Balance</p>
          <p className="font-bold text-lg mt-1">{(user?.totalBalance || 0).toFixed(8)}</p>
          <img  class="absolute -bottom-4 -right-4 w-20 h-20 opacity-20" alt="Planet with rings" src="https://images.unsplash.com/photo-1669935285402-cc80905a0cda" />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm cursor-pointer" onClick={() => navigate('/mining')}>
          <p className="text-sm text-gray-500">Storage</p>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle className={`w-5 h-5 ${isStorageFull ? 'text-red-500' : 'text-green-500'}`} />
            <span className={`font-bold ${isStorageFull ? 'text-red-500' : ''}`}>{isStorageFull ? 'Full' : 'Collecting'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
            <div className={`${isStorageFull ? 'bg-red-500' : 'storage-progress'} h-2.5 rounded-full`} style={{ width: `${storagePercentage}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 text-center">Collected {storage.toFixed(8)}</p>
        </div>
      </div>
      
      <Button className="action-button w-full justify-between" onClick={() => navigate('/boost')}>
        <span>EARN 0.1 USDT ON DAILY</span>
        <ArrowRight className="w-5 h-5" />
      </Button>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="tokens">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center text-gray-500">
                <p>No other tokens yet.</p>
            </div>
        </TabsContent>
        <TabsContent value="transactions">
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
                {transactions.map((tx, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                            <p className="font-bold">USDT</p>
                            <p className="text-xs text-gray-400">{tx.date}</p>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(8)}
                            </p>
                            <p className="text-xs text-gray-400">{tx.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;