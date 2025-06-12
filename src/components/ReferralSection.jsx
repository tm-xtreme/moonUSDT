
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Users, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const ReferralSection = ({ user, referrals = [] }) => {
  const botUsername = 'your_bot_username'; // Replace with actual bot username
  const referralLink = `https://t.me/${botUsername}?start=refTGID_${user?.id}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
      duration: 2000,
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join USDT Mining Bot',
        text: 'Start mining USDT with me! Use my referral link:',
        url: referralLink,
      });
    } else {
      copyReferralLink();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Invite Friends</h3>
        <p className="text-muted-foreground">
          Earn +0.5 USDT and +0.001 mining power for each friend!
        </p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="referral-link rounded-xl p-4"
      >
        <div className="text-sm text-muted-foreground mb-2">Your referral link:</div>
        <div className="text-xs break-all mb-4 font-mono bg-black/20 p-2 rounded">
          {referralLink}
        </div>
        
        <div className="flex gap-2">
          <Button onClick={copyReferralLink} variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
          <Button onClick={shareReferralLink} className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
          <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold">{referrals.length}</div>
          <div className="text-sm text-muted-foreground">Friends Invited</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-yellow-500/10 rounded-xl">
          <Gift className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold">{(referrals.length * 0.5).toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">USDT Earned</div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
