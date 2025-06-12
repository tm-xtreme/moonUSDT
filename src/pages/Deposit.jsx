import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Copy, ArrowLeft } from 'lucide-react';

const Deposit = () => {
    const navigate = useNavigate();
    const walletAddress = '0x10aDaB723498E5d6258542Ee6717458a1E3F6590';
  
    const copyAddress = () => {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: 'Address Copied!',
        description: 'The wallet address has been copied to your clipboard.',
        duration: 2000,
      });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-[#fffbeb] min-h-screen"
        >
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="font-bold text-lg">Deposit</h1>
                <div className="w-10"></div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-2 rounded-lg">
                    <img  width="200" height="200" alt="QR code for deposit address" src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf" />
                </div>
                <div className="flex items-center w-full max-w-sm p-2 rounded-lg bg-yellow-100 border border-yellow-200">
                    <span className="text-sm font-mono flex-1 overflow-x-auto whitespace-nowrap">
                        {walletAddress}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={copyAddress}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-2 mt-4 max-w-sm">
                    <li>We only accept USDT deposits through the BNB Smart Chain (BEP20).</li>
                    <li>The deposit amount will be credited to your account after the network confirmation is completed.</li>
                    <li>Please note that we are not responsible for any incorrect deposits involving other assets.</li>
                </ul>
            </div>
        </motion.div>
    );
};

export default Deposit;