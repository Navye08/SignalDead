import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: 'SAFE' | 'WARNING' | 'DANGER' | 'NEUTRAL';
  icon?: React.ReactNode;
  description?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  status = 'NEUTRAL',
  icon,
  description
}) => {
  let statusBorder = 'border-spaceBorder';
  let statusText = 'text-white';
  
  if (status === 'SAFE') {
    statusBorder = 'border-spaceSafe/30 border-l-spaceSafe border-l-2';
    statusText = 'text-spaceSafe';
  } else if (status === 'WARNING') {
    statusBorder = 'border-spaceWarning/30 border-l-spaceWarning border-l-2';
    statusText = 'text-spaceWarning';
  } else if (status === 'DANGER') {
    statusBorder = 'border-spaceDanger/30 border-l-spaceDanger border-l-2';
    statusText = 'text-spaceDanger';
  }

  return (
    <motion.div
      whileHover={{ y: -2, borderColor: '#FDA4AF' }}
      transition={{ duration: 0.2 }}
      className={`panel-grid-border p-4 bg-spaceCard ${statusBorder} flex flex-col justify-between h-32 relative`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
          {title}
        </span>
        {icon && <span className="text-spaceAccent">{icon}</span>}
      </div>

      <div className="my-2">
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-mono font-bold tracking-tight ${statusText}`}>
            {value}
          </span>
          {unit && (
            <span className="text-xs font-mono uppercase text-gray-500">
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className="text-[10px] font-mono text-gray-400 truncate">
        {description || '// SYS_NOMINAL'}
      </div>
    </motion.div>
  );
};
