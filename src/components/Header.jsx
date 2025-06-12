import React, { useState } from 'react';
import { QrCode, PocketKnife, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import WalletModal from '@/components/WalletModal';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Header = ({ user }) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const handleNotImplemented = () => {
    toast({
      title: "🚧 Feature not implemented",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="p-3 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between border-b border-yellow-200/50">
        <div className="flex items-center gap-2">
            <Avatar className="w-9 h-9 border-2 border-yellow-400/50">
              <AvatarImage src={user?.photoUrl} alt={user?.fullName} />
              <AvatarFallback className="bg-yellow-400 text-white font-bold">
                {user?.fullName ? getInitials(user.fullName) : <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-sm leading-tight">{user?.fullName || 'User'}</p>
                <p className="text-xs text-gray-500 leading-tight">@{user?.username || 'username'}</p>
            </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button className="claim-button h-9" onClick={handleNotImplemented}>
            <PocketKnife className="w-4 h-4 mr-2" />
            Claim
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsWalletModalOpen(true)}>
            <QrCode className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <WalletModal isOpen={isWalletModalOpen} setIsOpen={setIsWalletModalOpen} />
    </>
  );
};

export default Header;