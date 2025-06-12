import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WalletModal = ({ isOpen, setIsOpen }) => {
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

  const handleDepositClick = () => {
    setIsOpen(false);
    navigate('/deposit');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-[#fffbeb]">
        <DialogHeader>
          <DialogTitle className="text-center">Deposit Wallet</DialogTitle>
          <DialogDescription className="text-center">
            Scan the QR code to deposit USDT.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex flex-col items-center gap-4">
            <div className="bg-white p-2 rounded-lg">
                <img  width="200" height="200" alt="QR code for deposit address" src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf" />
            </div>
            <div className="flex items-center w-full p-2 rounded-lg bg-yellow-100 border border-yellow-200">
                <span className="text-xs font-mono flex-1 overflow-x-auto">
                    {walletAddress}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyAddress}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </div>
            <ul className="text-xs text-gray-500 list-disc list-inside space-y-1 mt-2">
                <li>We only accept USDT deposits through the BNB Smart Chain (BEP20).</li>
                <li>The deposit will be credited after network confirmation.</li>
                <li>We are not responsible for incorrect deposits.</li>
            </ul>
        </div>
        <Button className="action-button w-full" onClick={handleDepositClick}>Deposit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;