import { useState } from 'react';
import { StatusCard } from '../components/StatusCard';
import { Heatmap } from '../components/Heatmap';
import { PageHeader } from '../components/PageHeader';
import { MissionAdvisory } from '../components/MissionAdvisory';
import { indianCities } from '../services/mockData';
import type { CityData } from '../services/mockData';
import { 
  Satellite, 
  Sun, 
  Navigation,
  Search,
  Locate,
  AlertOctagon
} from 'lucide-react';

export const Dashboard = () => {
  const [activeCity, setActiveCity] = useState<CityData>(indianCities[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationStatus, setLocationStatus] = useState<'IDLE' | 'LOCKING' | 'LOCKED'>('LOCKED');
  const [searchResults, setSearchResults] = useState<CityData[]>([]);

  // Filter autocomplete results
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const matches = indianCities.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(matches);
    }
  };

  const handleSelectCity = (city: CityData) => {
    setActiveCity(city);
    setSearchQuery(city.name);
    setSearchResults([]);
    setLocationStatus('LOCKED');
  };

  // Mock navigator geo-location lock
  const handleCurrentLocationLock = () => {
    setLocationStatus('LOCKING');
    setTimeout(() => {
      // Lock onto Bengaluru (default geo location hub)
      const blr = indianCities.find(c => c.name === 'Bengaluru') || indianCities[0];
      setActiveCity(blr);
      setSearchQuery(blr.name);
      setLocationStatus('LOCKED');
    }, 600);
  };

  // Derive extra telemetry values from city data
  const accuracy = Number((1.5 + (activeCity.riskScore / 100) * 15).toFixed(1));
  const pdop = Number((1.2 + (12 - activeCity.satellites) * 0.3).toFixed(1));
  const lastUpdated = new Date().toLocaleTimeString();

  // Dynamic Ambient Page Theme classes based on the risk score
  const isHighRisk = activeCity.currentRisk === 'HIGH RISK';
  const isDegraded = activeCity.currentRisk === 'DEGRADED';
  
  let dashboardThemeClass = 'border-spaceBorder/50 shadow-[inset_0_0_30px_rgba(0,229,255,0.03)] ring-1 ring-spaceSafe/5';
  let scanlineBgClass = 'bg-spaceSafe';
  
  if (isHighRisk) {
    dashboardThemeClass = 'border-spaceDanger/40 shadow-[inset_0_0_50px_rgba(230,57,70,0.12)] ring-1 ring-spaceDanger/20';
    scanlineBgClass = 'bg-spaceDanger animate-pulse';
  } else if (isDegraded) {
    dashboardThemeClass = 'border-spaceWarning/30 shadow-[inset_0_0_40px_rgba(255,179,0,0.06)] ring-1 ring-spaceWarning/10';
    scanlineBgClass = 'bg-spaceWarning';
  }

  return (
    <div className={`space-y-8 p-4 sm:p-6 border transition-all duration-300 relative overflow-hidden rounded-none ${dashboardThemeClass}`}>
      {/* Dynamic Ambient Scanline Overlay */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.02] z-0 ${scanlineBgClass}`} style={{
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 4px, 6px 100%'
      }} />

      {/* Top Banner Warning if High Risk */}
      {isHighRisk && (
        <div className="bg-spaceDanger/15 border border-spaceDanger p-4 flex items-center gap-3 animate-pulse relative z-10">
          <AlertOctagon className="w-5 h-5 text-spaceDanger" />
          <span className="font-mono text-xs font-bold text-spaceDanger uppercase tracking-widest">
            CRITICAL EVENT ACTIVE: STATION {activeCity.name.toUpperCase()} SCINTILLATION RISK EXCEEDS 75%
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <PageHeader 
          title="Mission Telemetry" 
          subtitle="Real-time space weather data, satellite constellation configuration, and GNSS accuracy deviation indices over the Indian airspace."
          category="DASHBOARD COMMAND // TELEMETRY HUD"
        />

        {/* Top Search & Navigation Fields */}
        <div className="relative w-full md:w-80 flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search target station..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-spaceCard border border-spaceBorder p-2.5 pl-9 font-mono text-xs text-white focus:outline-none focus:border-sakuraPink focus:ring-1 focus:ring-sakuraPink rounded-none"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            
            {/* Search Dropdown Matches */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-spaceBg border border-spaceBorder z-50 font-mono text-xs divide-y divide-spaceBorder">
                {searchResults.map(match => (
                  <button
                    key={match.name}
                    onClick={() => handleSelectCity(match)}
                    className="w-full text-left p-2.5 hover:bg-spaceCard text-white transition-colors block"
                  >
                    {match.name} ({match.currentRisk})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Use GPS Location Button */}
          <button
            onClick={handleCurrentLocationLock}
            disabled={locationStatus === 'LOCKING'}
            className="bg-spaceCard border border-spaceBorder p-2.5 text-spaceSafe hover:text-sakuraPink hover:border-sakuraPink transition-all duration-200 cursor-pointer disabled:opacity-50"
            title="Lock Current Location"
          >
            <Locate className={`w-4 h-4 ${locationStatus === 'LOCKING' ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Status Panel */}
      <div className="relative z-10">
        <StatusCard 
          status={activeCity.currentRisk}
          kpIndex={activeCity.kpIndex}
          satellites={activeCity.satellites}
          pdop={pdop}
          accuracy={accuracy}
          lastUpdated={lastUpdated}
        />
      </div>

      {/* THREE-COLUMN TELEMETRY GRID (Raw Data Readout in JetBrains Mono) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono relative z-10">
        {/* Kp Index Telemetry box */}
        <div className="bg-spaceCard border border-spaceBorder p-5 relative">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-sakuraPink" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-sakuraPink" />
          
          <div className="flex justify-between items-start mb-4">
            <span className="text-[9px] text-gray-500 tracking-wider">GEOMAGNETIC_STATE // SEC_01</span>
            <Sun className="w-4 h-4 text-spaceAccent" />
          </div>
          
          <div className="my-2">
            <span className={`text-5xl font-bold tracking-tight block ${
              activeCity.kpIndex >= 7 ? 'glitch-text text-spaceDanger' : activeCity.kpIndex >= 5 ? 'text-spaceWarning' : 'text-white'
            }`} style={{
              textShadow: activeCity.kpIndex >= 7 
                ? '0 0 10px rgba(230, 57, 70, 0.6)' 
                : activeCity.kpIndex >= 5 
                ? '0 0 8px rgba(255, 179, 0, 0.5)' 
                : 'none'
            }}>
              {activeCity.kpIndex} <span className="text-xs text-gray-500 font-normal">KP</span>
            </span>
          </div>
          <span className="text-[9px] text-gray-400 block mt-2">// SOLAR FLUX CONSTANT RADAR</span>
        </div>

        {/* Satellites Overhead Telemetry box */}
        <div className="bg-spaceCard border border-spaceBorder p-5 relative">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-sakuraPink" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-sakuraPink" />

          <div className="flex justify-between items-start mb-4">
            <span className="text-[9px] text-gray-500 tracking-wider">VISIBLE_GNSS_ARRAY // SEC_02</span>
            <Satellite className="w-4 h-4 text-spaceSafe" />
          </div>

          <div className="my-2">
            <span className="text-5xl font-bold tracking-tight text-spaceSafe block">
              {activeCity.satellites} <span className="text-xs text-gray-500 font-normal">SATS</span>
            </span>
          </div>
          <span className="text-[9px] text-gray-400 block mt-2">// MULTI-CONSTELLATION OVERHEAD</span>
        </div>

        {/* Position Dilution Telemetry box */}
        <div className="bg-spaceCard border border-spaceBorder p-5 relative">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-sakuraPink" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-sakuraPink" />

          <div className="flex justify-between items-start mb-4">
            <span className="text-[9px] text-gray-500 tracking-wider">TRIANGULATION_GEOMETRY // SEC_03</span>
            <Navigation className="w-4 h-4 text-spaceAccent" />
          </div>

          <div className="my-2">
            <span className="text-5xl font-bold tracking-tight text-white block">
              {pdop} <span className="text-xs text-gray-500 font-normal">PDOP</span>
            </span>
          </div>
          <span className="text-[9px] text-gray-400 block mt-2">// POSITIONAL ACCURACY COEFFICIENT</span>
        </div>
      </div>

      {/* Main Grid: Metrics + Recommendations (Mission Advisory) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Mission Advisory (Data in Plain English) */}
        <div className="lg:col-span-2">
          <MissionAdvisory 
            currentRisk={activeCity.currentRisk} 
            cityName={activeCity.name} 
            lat={activeCity.lat} 
            lng={activeCity.lng} 
          />
        </div>

        {/* Telemetry Extra Metrics Grid */}
        <div className="bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between relative">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-sakuraPink" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-sakuraPink" />
          <div>
            <div className="border-b border-spaceBorder pb-3 mb-4">
              <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
                ATMOSPHERIC INDEX
              </span>
              <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider">
                Propelling Safety Constraints
              </h3>
            </div>

            <div className="space-y-3.5 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">ACCURACY DRIFT</span>
                <span className={`font-bold ${isHighRisk ? 'text-spaceDanger' : 'text-spaceSafe'}`}>
                  ~{accuracy} METERS
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">CO2 EXTRACTION ENVELOPE</span>
                <span className="text-spaceSafe font-bold">0.08% [NOMINAL]</span>
              </div>
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">THERMAL ENERGY</span>
                <span className="text-spaceWarning font-bold">96.4°C [STABLE]</span>
              </div>
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">MAGNETOPAUSE CONSTANT</span>
                <span className="text-gray-400">COMPRESSED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">BEACON NAVIGATION FREQ</span>
                <span className="text-spaceSafe font-bold">12 FREQ [LOCKED]</span>
              </div>
            </div>
          </div>

          <div className="border-t border-spaceBorder mt-6 pt-4 text-[9px] font-mono text-gray-600">
            SECURE DATUM LINK // WGS-84 ALIGNED
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="relative z-10">
        <Heatmap />
      </div>
    </div>
  );
};
