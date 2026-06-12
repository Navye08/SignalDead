import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

interface MissionAdvisoryProps {
  currentRisk: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
  cityName: string;
  lat: number;
  lng: number;
}

export const MissionAdvisory: React.FC<MissionAdvisoryProps> = ({
  currentRisk,
  cityName,
  lat,
  lng
}) => {
  const isHighRisk = currentRisk === 'HIGH RISK';

  // Recommendations based on current state (Advisory)
  const getAdvisoryRecommendations = (risk: 'SAFE' | 'DEGRADED' | 'HIGH RISK') => {
    switch (risk) {
      case 'SAFE':
        return [
          { 
            category: 'DRONE OPERATIONS', 
            action: 'AUTHORIZED', 
            desc: 'Auto-pilot navigation margins are nominal. Horizontal drift is below 2.0 meters.', 
            color: 'text-spaceSafe border-spaceSafe bg-spaceSafe/5' 
          },
          { 
            category: 'LAND SURVEYING', 
            action: 'OPTIMAL', 
            desc: 'PDOP triangulation is ideal. Centimeter-level RTK measurements are validated.', 
            color: 'text-spaceSafe border-spaceSafe bg-spaceSafe/5' 
          },
          { 
            category: 'SYSTEM COMPENSATOR', 
            action: 'STABLE', 
            desc: 'Ionospheric scintillation is quiet. Standard single-band receiver lock ok.', 
            color: 'text-spaceSafe border-spaceSafe bg-spaceSafe/5' 
          }
        ];
      case 'DEGRADED':
        return [
          { 
            category: 'DRONE OPERATIONS', 
            action: 'CAUTION', 
            desc: 'Hold precision flight paths. Stand by for manual override due to potential vertical drift.', 
            color: 'text-spaceWarning border-spaceWarning bg-spaceWarning/5' 
          },
          { 
            category: 'LAND SURVEYING', 
            action: 'STANDBY', 
            desc: 'High-density signal noise. Precision RTK coordinate measurements are currently locked.', 
            color: 'text-spaceWarning border-spaceWarning bg-spaceWarning/5' 
          },
          { 
            category: 'SYSTEM COMPENSATOR', 
            action: 'DUAL BAND', 
            desc: 'Active ionospheric scintillation. Enable dual-frequency (L1+L5) NavIC tracking.', 
            color: 'text-spaceWarning border-spaceWarning bg-spaceWarning/5' 
          }
        ];
      case 'HIGH RISK':
        return [
          { 
            category: 'DRONE OPERATIONS', 
            action: 'GROUNDED', 
            desc: 'Geomagnetic storm blackout active. High probability of autonomous fly-aways.', 
            color: 'text-spaceDanger border-spaceDanger bg-spaceDanger/5' 
          },
          { 
            category: 'LAND SURVEYING', 
            action: 'BLACKOUT', 
            desc: 'Scintillation-induced signal dropouts. Do not proceed with positioning audits.', 
            color: 'text-spaceDanger border-spaceDanger bg-spaceDanger/5' 
          },
          { 
            category: 'SYSTEM COMPENSATOR', 
            action: 'CRITICAL', 
            desc: 'Magnetopause compression detected. GPS positioning offsets up to 80m predicted.', 
            color: 'text-spaceDanger border-spaceDanger bg-spaceDanger/5' 
          }
        ];
    }
  };

  const advisories = getAdvisoryRecommendations(currentRisk);

  return (
    <div className="bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between relative">
      {/* Physical control panel style decorative cherry blossom corners */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-sakuraPink" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-sakuraPink" />

      <div>
        <div className="border-b border-spaceBorder pb-3 mb-4 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
              OPERATIONAL LOG // STATION: {cityName.toUpperCase()}
            </span>
            <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider">
              Mission Advisory System
            </h3>
          </div>
          {isHighRisk ? (
            <ShieldAlert className="w-5 h-5 text-spaceDanger animate-pulse" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-spaceSafe" />
          )}
        </div>
        
        <div className="space-y-4">
          {advisories.map((advisory) => (
            <div 
              key={advisory.category} 
              className="border border-spaceBorder p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-spaceBg/35"
            >
              <div>
                <span className="font-mono text-[9px] text-gray-500 block">SYSTEM GATE</span>
                <span className="font-mono text-xs font-bold text-white uppercase">{advisory.category}</span>
              </div>
              <div className="flex-grow sm:px-4">
                <p className="text-xs text-gray-400 font-mono leading-relaxed">{advisory.desc}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block border text-[9px] font-mono font-bold px-2.5 py-0.5 uppercase ${advisory.color}`}>
                  {advisory.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-spaceBorder mt-6 pt-4 text-[9px] font-mono text-gray-600 flex justify-between">
        <span>STATION COORD: LAT {lat.toFixed(4)} / LNG {lng.toFixed(4)}</span>
        <span>SYSTEM ENVELOPE: 99.4%</span>
      </div>
    </div>
  );
};
