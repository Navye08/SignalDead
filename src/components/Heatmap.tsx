import { Fragment, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Circle, useMap } from 'react-leaflet';
import type { CityData } from '../services/api';
import 'leaflet/dist/leaflet.css';

interface HeatmapProps {
  activeCity?: CityData | null;
}

// Sub-component to smoothly pan map on activeCity changes
const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 5.5, { animate: true });
  }, [center, map]);
  return null;
};

export const Heatmap = ({ activeCity }: HeatmapProps) => {
  // Coordinates to center on India by default
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const activeCenter: [number, number] = activeCity ? [activeCity.lat, activeCity.lng] : defaultCenter;
  const defaultZoom = 5;

  const getRiskColor = (risk: 'SAFE' | 'DEGRADED' | 'HIGH RISK') => {
    switch (risk) {
      case 'SAFE':
        return '#00E5FF'; // Tokyo Cyan
      case 'DEGRADED':
        return '#FFB300'; // Astrophage Amber
      case 'HIGH RISK':
        return '#E63946'; // Crimson Sun
      default:
        return '#00E5FF';
    }
  };

  return (
    <div className="bg-spaceCard border border-spaceBorder p-6 relative w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-spaceBorder pb-4 mb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
            GEOSPATIAL SCINTILLATION OVERLAY
          </span>
          <h3 className="text-lg font-mono font-bold text-white uppercase">
            India GNSS Reliability Map
          </h3>
        </div>
        
        {/* Risk Level Monospace Indicator */}
        <div className="flex flex-wrap gap-4 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceSafe rounded-full" />
            <span className="text-gray-400">NOMINAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceWarning rounded-full" />
            <span className="text-gray-400">SCINTILLATION ALERT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceDanger rounded-full shadow-[0_0_8px_#E63946]" />
            <span className="text-gray-400 font-bold">SIGNAL LOSS DANGER</span>
          </div>
        </div>
      </div>

      <div className="h-[450px] w-full border border-spaceBorder relative z-10">
        <MapContainer 
          center={defaultCenter} 
          zoom={defaultZoom} 
          scrollWheelZoom={false}
          className="h-full w-full"
          zoomControl={true}
        >
          {/* Recenter helper */}
          <MapRecenter center={activeCenter} />

          {/* CartoDB Dark Matter tile layer for premium dark theme */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {activeCity && (
            <Fragment key={activeCity.name}>
              {/* Visual halo representing scintillation coverage */}
              <Circle
                center={[activeCity.lat, activeCity.lng]}
                radius={activeCity.currentRisk === 'HIGH RISK' ? 180000 : activeCity.currentRisk === 'DEGRADED' ? 100000 : 50000}
                pathOptions={{
                  color: getRiskColor(activeCity.currentRisk),
                  fillColor: getRiskColor(activeCity.currentRisk),
                  fillOpacity: activeCity.currentRisk === 'SAFE' ? 0.02 : 0.08,
                  weight: 1,
                  dashArray: '5, 5'
                }}
              />

              {/* City target blip */}
              <CircleMarker
                center={[activeCity.lat, activeCity.lng]}
                radius={activeCity.currentRisk === 'HIGH RISK' ? 8 : 6}
                pathOptions={{
                  color: '#111111',
                  fillColor: getRiskColor(activeCity.currentRisk),
                  fillOpacity: 1,
                  weight: 1.5,
                }}
              >
                <Popup>
                  <div className="font-mono text-xs p-1">
                    <div className="text-spaceAccent border-b border-spaceBorder pb-1 mb-2 font-bold uppercase">
                      STATION: {activeCity.name}
                    </div>
                    <div className="flex justify-between gap-4 mb-1">
                      <span className="text-gray-400">RISK STATE:</span>
                      <span style={{ color: getRiskColor(activeCity.currentRisk) }} className="font-bold uppercase">{activeCity.currentRisk}</span>
                    </div>
                    <div className="flex justify-between gap-4 mb-1">
                      <span className="text-gray-400">RISK INDEX:</span>
                      <span className="text-white font-bold">{activeCity.riskScore}%</span>
                    </div>
                    <div className="flex justify-between gap-4 mb-1">
                      <span className="text-gray-400">KP INDEX:</span>
                      <span className="text-white font-bold">{activeCity.kpIndex}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400">SATELLITES:</span>
                      <span className="text-white font-bold">{activeCity.satellites}</span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            </Fragment>
          )}
        </MapContainer>
        
        {/* Technical Coordinate Overlay Grid info (decorative but immersive) */}
        <div className="absolute bottom-2 left-2 z-[1000] bg-spaceBg/80 border border-spaceBorder p-2 text-[9px] font-mono text-gray-500 pointer-events-none hidden sm:block">
          <div>ANTENNA ID: SG-IND-GRID</div>
          <div>DATUM: WGS-84 / GRS-80</div>
          <div>SWEEP FREQ: 1575.42 MHz (L1)</div>
        </div>
      </div>
    </div>
  );
};
