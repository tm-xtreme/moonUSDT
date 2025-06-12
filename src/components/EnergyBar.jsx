
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Battery } from 'lucide-react';

const EnergyBar = ({ energy, maxEnergy = 20, rechargeTime }) => {
  const energyPercentage = (energy / maxEnergy) * 100;
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-blue-400" />
          <span>Energy</span>
        </div>
        <span className="text-muted-foreground">
          {energy}/{maxEnergy}
        </span>
      </div>
      
      <div className="relative">
        <Progress value={energyPercentage} className="h-3" />
        <div 
          className="energy-bar absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${energyPercentage}%` }}
        />
      </div>
      
      {energy < maxEnergy && rechargeTime > 0 && (
        <div className="text-xs text-center text-muted-foreground">
          Next energy in {formatTime(rechargeTime)}
        </div>
      )}
    </div>
  );
};

export default EnergyBar;
