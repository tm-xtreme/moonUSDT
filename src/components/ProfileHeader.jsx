
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <Avatar className="w-16 h-16 profile-avatar">
        <AvatarImage src={user?.photoUrl} alt={user?.fullName} />
        <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white text-lg font-bold">
          {user?.fullName ? getInitials(user.fullName) : <User className="w-8 h-8" />}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h2 className="text-xl font-bold">{user?.fullName || 'Anonymous'}</h2>
        {user?.username && (
          <p className="text-muted-foreground">@{user.username}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
