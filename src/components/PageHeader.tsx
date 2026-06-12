import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  category?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, category = 'SYSTEM COMPONENT' }) => {
  return (
    <div className="border-b border-spaceBorder pb-6 mb-8 relative">
      {/* Absolute telemetry decoration */}
      <div className="absolute right-0 top-0 font-mono text-[9px] text-gray-600 text-right hidden md:block select-none">
        <div>ORBIT_REF: 5493-294</div>
        <div>SYS_TIME: {new Date().toISOString().split('T')[0]} Z</div>
      </div>
      
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-1.5 h-1.5 bg-spaceAccent animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-spaceAccent uppercase font-bold">
          {category}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white uppercase mb-2">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-gray-400 max-w-3xl">
        {subtitle}
      </p>
    </div>
  );
};
