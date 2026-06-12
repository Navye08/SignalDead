import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, tag }) => {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: '#66FCF1' }}
      transition={{ duration: 0.2 }}
      className="panel-grid-border bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between h-56 relative"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-spaceBg border border-spaceBorder text-spaceAccent">
            {icon}
          </div>
          {tag && (
            <span className="font-mono text-[9px] text-spaceAccent border border-spaceAccent/30 px-1.5 py-0.5 tracking-wider uppercase">
              {tag}
            </span>
          )}
        </div>
        
        <h4 className="text-base font-mono font-bold text-white mb-2 uppercase tracking-wide">
          {title}
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Immersive design grid detail */}
      <div className="border-t border-spaceBorder pt-3 flex justify-between items-center text-[9px] font-mono text-gray-600">
        <span>NOMINAL LOGIC LAYER</span>
        <span>0x00A4FF</span>
      </div>
    </motion.div>
  );
};
