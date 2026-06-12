import { useState } from 'react';
import type { TimelineForecastItem } from '../services/api';

interface TimelineChartProps {
  data: TimelineForecastItem[];
}

export const TimelineChart = ({ data }: TimelineChartProps) => {
  const [hoveredHour, setHoveredHour] = useState<TimelineForecastItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getRiskColor = (level: 'SAFE' | 'DEGRADED' | 'HIGH RISK') => {
    switch (level) {
      case 'SAFE':
        return '#00E5FF'; // Tokyo Cyan
      case 'DEGRADED':
        return '#FFB300'; // Astrophage Amber
      case 'HIGH RISK':
        return '#E63946'; // Crimson Sun
    }
  };

  const getRiskClass = (level: 'SAFE' | 'DEGRADED' | 'HIGH RISK') => {
    switch (level) {
      case 'SAFE':
        return 'bg-spaceSafe border-spaceSafe shadow-[0_0_8px_rgba(0,229,255,0.4)]';
      case 'DEGRADED':
        return 'bg-spaceWarning border-spaceWarning shadow-[0_0_8px_rgba(255,179,0,0.4)]';
      case 'HIGH RISK':
        return 'bg-spaceDanger border-spaceDanger shadow-[0_0_8px_rgba(230,57,70,0.5)]';
    }
  };

  const getRiskTextClass = (level: 'SAFE' | 'DEGRADED' | 'HIGH RISK') => {
    switch (level) {
      case 'SAFE': return 'text-spaceSafe';
      case 'DEGRADED': return 'text-spaceWarning';
      case 'HIGH RISK': return 'text-spaceDanger';
    }
  };

  return (
    <div className="w-full bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between relative overflow-hidden">
      {/* HUD Details */}
      <div className="absolute right-3 top-3 font-mono text-[8px] text-gray-600 hidden md:block">
        <div>SEQ_MODE: CONTINUOUS</div>
        <div>CONSTELLATION: NavIC+GPS</div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-spaceBorder pb-4 mb-6 gap-2">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
            24-HOUR SEQUENCER RADAR
          </span>
          <h3 className="text-lg font-sans font-bold text-white uppercase tracking-wider">
            GPS Reliability DNA Sequence
          </h3>
        </div>
        
        {/* Sequencer Legend */}
        <div className="flex gap-4 font-mono text-[9px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceSafe/20 border border-spaceSafe" />
            <span className="text-gray-400">NOMINAL (CYAN)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceWarning/20 border border-spaceWarning" />
            <span className="text-gray-400">DEGRADED (AMBER)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceDanger/20 border border-spaceDanger" />
            <span className="text-gray-400 font-bold">BLACKOUT (CRIMSON)</span>
          </div>
        </div>
      </div>

      {/* DNA Sequencer Horizontal Lane */}
      <div className="relative py-12 px-4 border border-spaceBorder bg-spaceBg/60 overflow-x-auto min-w-full">
        {/* Decorative double-helix strands and continuous glowing shifting strip */}
        <svg className="absolute w-[95%] h-24 top-1/2 -translate-y-1/2 left-[2.5%] pointer-events-none" style={{ minWidth: '800px' }}>
          <defs>
            <linearGradient id="dna-glow-strip" x1="0%" y1="0%" x2="100%" y2="0%">
              {data.map((item, idx) => {
                const percentage = (idx / (data.length - 1)) * 100;
                const color = getRiskColor(item.riskLevel);
                return <stop key={idx} offset={`${percentage}%`} stopColor={color} />;
              })}
            </linearGradient>
            <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sine wave strand A */}
          <path
            d={`M 0 48 ${Array.from({ length: 24 }).map((_, i) => `Q ${i * 36 + 18} ${i % 2 === 0 ? 12 : 84} ${i * 36 + 36} 48`).join(' ')}`}
            fill="none"
            stroke="#2D2E32"
            strokeWidth="1.5"
            className="opacity-40"
          />
          {/* Sine wave strand B */}
          <path
            d={`M 0 48 ${Array.from({ length: 24 }).map((_, i) => `Q ${i * 36 + 18} ${i % 2 === 0 ? 84 : 12} ${i * 36 + 36} 48`).join(' ')}`}
            fill="none"
            stroke="#FDA4AF"
            strokeWidth="1"
            strokeDasharray="2, 2"
            className="opacity-30"
          />

          {/* Continuous Glowing Strip: Blur Layer */}
          <line
            x1="0"
            y1="48"
            x2="100%"
            y2="48"
            stroke="url(#dna-glow-strip)"
            strokeWidth="8"
            opacity="0.3"
            filter="url(#glow-blur)"
          />
          {/* Continuous Glowing Strip: Core Light Layer */}
          <line
            x1="0"
            y1="48"
            x2="100%"
            y2="48"
            stroke="url(#dna-glow-strip)"
            strokeWidth="2.5"
            opacity="0.85"
          />
        </svg>

        <div className="flex justify-between items-center relative z-10 gap-2 h-24" style={{ minWidth: '800px' }}>
          {data.map((item, idx) => {
            const riskColor = getRiskColor(item.riskLevel);
            const isHovered = hoveredIndex === idx;
            
            return (
              <div
                key={item.time}
                onMouseEnter={() => {
                  setHoveredHour(item);
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => {
                  setHoveredHour(null);
                  setHoveredIndex(null);
                }}
                className="flex flex-col items-center flex-1 cursor-pointer group relative"
              >
                {/* Time tag above */}
                <span className="font-mono text-[9px] text-gray-500 mb-2 group-hover:text-white transition-colors">
                  {item.time.split(':')[0]}
                </span>

                {/* Base Pair Rung (Top node) */}
                <div className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                  isHovered ? 'scale-150' : ''
                }`} style={{
                  backgroundColor: isHovered ? riskColor : 'transparent',
                  borderColor: riskColor,
                  boxShadow: isHovered ? `0 0 10px ${riskColor}` : 'none'
                }} />

                {/* Connecting core vertical bar */}
                <div className="w-[1.5px] h-8 my-1 bg-spaceBorder relative">
                  <div 
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-40'
                    } ${getRiskClass(item.riskLevel)}`}
                  />
                </div>

                {/* Base Pair Rung (Bottom node) */}
                <div className={`w-2.5 h-2.5 transition-all duration-300 ${getRiskClass(item.riskLevel)} ${
                  isHovered ? 'scale-125' : ''
                }`} />

                {/* Hourly Status Indicator Block */}
                <div className="mt-3 w-4 h-1 bg-spaceBorder rounded-none">
                  <div className={`h-full ${getRiskClass(item.riskLevel)}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Sequencer Readout Dashboard */}
      <div className="mt-6 border border-spaceBorder bg-spaceBg p-4 min-h-[75px] flex items-center justify-between font-mono text-xs">
        {hoveredHour ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2 w-full">
            <div>
              <span className="text-gray-500 block text-[9px] tracking-wider">SEQUENCE ADDR</span>
              <span className="text-white font-bold text-sm">HOUR_{hoveredHour.time.replace(':', '')}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px] tracking-wider">KP CONSTANT</span>
              <span className={`font-bold text-sm ${
                hoveredHour.kpIndex >= 7 ? 'glitch-text text-spaceDanger' : 'text-white'
              }`}>
                {hoveredHour.kpIndex} Kp
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px] tracking-wider">SATS TRACE</span>
              <span className="text-white font-bold text-sm">{hoveredHour.satellites} SATS</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px] tracking-wider">RISK RATIO</span>
              <span className={`font-bold text-sm uppercase ${getRiskTextClass(hoveredHour.riskLevel)}`}>
                {hoveredHour.riskScore}% [{hoveredHour.riskLevel}]
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-gray-500 py-2 text-[10px] tracking-widest animate-pulse">
            // HOVER BASE PAIR RUNGS TO SEQUENCE LOCAL ACCURACY COEFFICIENTS
          </div>
        )}
      </div>
    </div>
  );
};
