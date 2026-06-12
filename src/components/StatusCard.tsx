import { RiskBadge } from './RiskBadge';
import { Activity, ShieldCheck, AlertTriangle, Radio } from 'lucide-react';

interface StatusCardProps {
  status: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
  kpIndex: number;
  satellites: number;
  pdop: number;
  accuracy: number;
  lastUpdated: string;
}

export const StatusCard = ({
  status,
  kpIndex,
  satellites,
  pdop,
  accuracy,
  lastUpdated
}: StatusCardProps) => {
  let mainIcon = <ShieldCheck className="w-12 h-12 text-spaceSafe" />;
  let cardTitle = 'SYSTEM NOMINAL';
  let cardDesc = 'GPS reliability is high across India. Scintillation activity is low.';
  let borderHighlight = 'border-l-spaceSafe border-l-4';

  if (status === 'DEGRADED') {
    mainIcon = <Activity className="w-12 h-12 text-spaceWarning" />;
    cardTitle = 'DEGRADED ACCURACY';
    cardDesc = 'Minor geomagnetic disturbance detected. GPS degradation possible in high elevation/forested areas.';
    borderHighlight = 'border-l-spaceWarning border-l-4';
  } else if (status === 'HIGH RISK') {
    mainIcon = <AlertTriangle className="w-12 h-12 text-spaceDanger" />;
    cardTitle = 'HIGH OPERATIONAL RISK';
    cardDesc = 'Active solar event/high Kp index. Risk of major GNSS positioning offsets or dropouts.';
    borderHighlight = 'border-l-spaceDanger border-l-4';
  }

  return (
    <div className={`bg-spaceCard border border-spaceBorder ${borderHighlight} p-6 relative overflow-hidden`}>
      {/* Visual radar grid lines background */}
      <div className="absolute right-0 top-0 w-32 h-32 opacity-10 pointer-events-none">
        <Radio className="w-full h-full text-spaceAccent animate-pulse" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-spaceBg border border-spaceBorder">
            {mainIcon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-mono tracking-widest text-spaceAccent uppercase">
                MISSION TELEMETRY STATE
              </span>
              <RiskBadge level={status} />
            </div>
            <h2 className="text-xl font-mono font-bold tracking-tight text-white uppercase">
              {cardTitle}
            </h2>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              {cardDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 border-t md:border-t-0 md:border-l border-spaceBorder pt-4 md:pt-0 md:pl-8 font-mono text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">KP INDEX:</span>
            <span className={`font-bold ${kpIndex >= 7 ? 'glitch-text text-spaceDanger font-extrabold' : 'text-white'}`}>
              {kpIndex}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">ACCURACY:</span>
            <span className="text-white font-bold">~{accuracy}m</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">GNSS SATS:</span>
            <span className="text-white font-bold">{satellites}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">PDOP:</span>
            <span className="text-white font-bold">{pdop}</span>
          </div>
          <div className="col-span-2 text-[10px] text-gray-500 mt-2 text-right">
            SECURE LINK // UPDATED: {lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
};
