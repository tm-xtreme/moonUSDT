import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Copy, Share2, Users, Gift } from 'lucide-react';

const Friends = ({ user }) => {
  const botUsername = 'your_bot_username_here'; // IMPORTANT: Replace with your bot username
  const referralLink = `https://t.me/${botUsername}?start=refTGID_${user?.id}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Your referral link is copied to the clipboard.",
      duration: 2000,
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join MOONUSDT Bot',
        text: 'Start mining USDT with me! Use my referral link to get a bonus!',
        url: referralLink,
      }).catch(() => copyReferralLink());
    } else {
      copyReferralLink();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold">Invite & Earn More</h1>
        <p className="text-muted-foreground mt-2">Build your network! The more friends you invite, the more you earn.</p>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-200">
        <h3 className="font-bold text-lg mb-3 text-center">Referral Bonuses</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
                <p className="font-bold text-green-500">+0.5 USDT</p>
                <p className="text-xs text-gray-500">For you</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
                <p className="font-bold text-green-500">+0.2 USDT</p>
                <p className="text-xs text-gray-500">For your friend</p>
            </div>
        </div>
        <p className="text-xs text-center text-gray-500 mt-3">+ You get a permanent mining speed boost for every referral!</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-400 p-3 rounded-full">
            <Share2 className="w-6 h-6 text-white"/>
          </div>
          <div className="flex-1">
            <Button className="action-button w-full justify-center text-lg h-12" onClick={shareReferralLink}>
              Invite a Friend
            </Button>
          </div>
        </div>
         <p className="text-xs text-center text-gray-400 mt-3">... or copy your personal link</p>
         <div className="flex items-center w-full p-2 mt-2 rounded-lg bg-yellow-50 border border-yellow-200">
            <span className="text-xs font-mono flex-1 overflow-x-auto whitespace-nowrap">
                {referralLink}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={copyReferralLink}>
                <Copy className="h-4 w-4"/>
            </Button>
        </div>
      </div>

       <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
          <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{user?.referrals?.length || 0}</div>
          <div className="text-sm text-muted-foreground">Friends Invited</div>
        </div>
        
        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
          <Gift className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <div className="text-2xl font-bold">{((user?.referrals?.length || 0) * 0.5).toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">Bonus USDT Earned</div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">Your Friends</h3>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 min-h-[100px]">
          {user?.referrals && user.referrals.length > 0 ? (
             <p className="text-sm text-center text-gray-500 py-4">Full list of friends coming soon!</p>
          ) : (
            <p className="text-sm text-center text-gray-500 py-4">You haven't invited any friends yet. Share your link to start earning!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Friends;