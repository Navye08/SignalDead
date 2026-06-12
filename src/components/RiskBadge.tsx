import React from 'react';

interface RiskBadgeProps {
  level: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  let badgeColor = '';
  let dotColor = '';

  switch (level) {
    case 'SAFE':
      badgeColor = 'border-spaceSafe text-spaceSafe bg-spaceSafe/10';
      dotColor = 'bg-spaceSafe';
      break;
    case 'DEGRADED':
      badgeColor = 'border-spaceWarning text-spaceWarning bg-spaceWarning/10';
      dotColor = 'bg-spaceWarning';
      break;
    case 'HIGH RISK':
      badgeColor = 'border-spaceDanger text-spaceDanger bg-spaceDanger/10';
      dotColor = 'bg-spaceDanger';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold tracking-widest border uppercase rounded-none ${badgeColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      {level}
    </span>
  );
};
