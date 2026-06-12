import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { TimelineChart } from '../components/TimelineChart';
import { get24hForecast, indianCities } from '../services/mockData';
import type { CityData } from '../services/mockData';
import { 
  AlertOctagon, 
  Clock,
  Search,
  Locate,
  Activity
} from 'lucide-react';

export const Timeline = () => {
  const [activeCity, setActiveCity] = useState<CityData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationStatus, setLocationStatus] = useState<'IDLE' | 'LOCKING' | 'LOCKED'>('IDLE');
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

  // Get active forecast data based on city risk score
  const forecastData = activeCity ? get24hForecast(activeCity.riskScore) : [];
  
  // Find peak danger periods
  const highRiskPeriods = forecastData.filter(d => d.riskLevel === 'HIGH RISK');
  
  // Format periods nicely (e.g. 2 PM to 5 PM)
  const formatTimeRange = () => {
    if (highRiskPeriods.length === 0) return 'No high-risk periods predicted.';
    
    const start = highRiskPeriods[0].time;
    const end = highRiskPeriods[highRiskPeriods.length - 1].time;
    
    // Helper to format e.g. "14:00" to "2 PM"
    const convert12h = (t: string) => {
      const hour = parseInt(t.split(':')[0]);
      if (hour === 0) return '12 AM';
      if (hour === 12) return '12 PM';
      return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
    };

    return `between ${convert12h(start)} and ${convert12h(end)}`;
  };

  const dangerWindowString = formatTimeRange();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <PageHeader 
          title="Predictive Timeline" 
          subtitle="24-hour ahead geomagnetic orbital forecast mapping ionospheric density variations and triangulation safety slots."
          category="FORECAST WINDOW // TIME ANALYTICS"
        />

        {/* Search Bar in Header */}
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

          {/* Geo Locate Button */}
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

      {activeCity ? (
        <>
          {/* Top Banner: Plain-English Alert */}
          <div className="bg-spaceDanger/10 border border-spaceDanger p-5 flex items-start gap-4">
            <div className="p-2.5 bg-spaceBg border border-spaceDanger/30 text-spaceDanger">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-spaceDanger font-bold tracking-widest block uppercase mb-1">
                CRITICAL GEOMAGNETIC WEATHER ALERT // FLUX DISSIPATION WINDOW // STATION: {activeCity.name.toUpperCase()}
              </span>
              <p className="text-sm font-mono text-white leading-relaxed">
                Avoid GPS-dependent maneuvers and heavy propulsion burns <span className="text-spaceDanger font-bold underline">{dangerWindowString}</span> due to solar wind deflection and predicted signal scintillation.
              </p>
            </div>
          </div>

          {/* DNA Sequencer Timeline chart */}
          <TimelineChart data={forecastData} />

          {/* High-density Hourly Telemetry Grid */}
          <div className="bg-spaceCard border border-spaceBorder p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-sakuraPink" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-sakuraPink" />

            <div className="border-b border-spaceBorder pb-3 mb-6">
              <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
                ORBITAL SCHEDULE // STATION: {activeCity.name.toUpperCase()}
              </span>
              <h3 className="text-lg font-mono font-bold text-white uppercase">
                24h Sat-Link Index Matrix
              </h3>
            </div>

            {/* Dense telemetry table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-spaceBorder text-gray-500 uppercase tracking-widest">
                    <th className="pb-3 font-semibold">Time (Z)</th>
                    <th className="pb-3 font-semibold">Risk Level</th>
                    <th className="pb-3 font-semibold">Kp Index</th>
                    <th className="pb-3 font-semibold">Visible Sats</th>
                    <th className="pb-3 font-semibold text-right">Operational Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-spaceBorder/50">
                  {forecastData.map((item) => {
                    let riskColor = 'text-spaceSafe';
                    let dotColor = 'bg-spaceSafe';
                    let opStatus = 'NOMINAL';
                    let opColor = 'border-spaceSafe/30 text-spaceSafe bg-spaceSafe/5';

                    if (item.riskLevel === 'DEGRADED') {
                      riskColor = 'text-spaceWarning';
                      dotColor = 'bg-spaceWarning';
                      opStatus = 'CAUTION ADVISED';
                      opColor = 'border-spaceWarning/30 text-spaceWarning bg-spaceWarning/5';
                    } else if (item.riskLevel === 'HIGH RISK') {
                      riskColor = 'text-spaceDanger';
                      dotColor = 'bg-spaceDanger';
                      opStatus = 'CRITICAL DANGER';
                      opColor = 'border-spaceDanger/30 text-spaceDanger bg-spaceDanger/5';
                    }

                    return (
                      <tr 
                        key={item.time} 
                        className="hover:bg-spaceBg/30 transition-colors duration-150 group"
                      >
                        <td className="py-3.5 flex items-center gap-2 font-bold text-white">
                          <Clock className="w-3.5 h-3.5 text-gray-500 group-hover:text-spaceAccent transition-colors" />
                          {item.time}
                        </td>
                        <td className={`py-3.5 uppercase font-bold ${riskColor}`}>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                            {item.riskLevel}
                          </div>
                        </td>
                        <td className={`py-3.5 ${item.kpIndex >= 7 ? 'glitch-text text-spaceDanger font-bold' : 'text-gray-300'}`}>{item.kpIndex} Kp</td>
                        <td className="py-3.5 text-gray-300">{item.satellites} SATS</td>
                        <td className="py-3.5 text-right">
                          <span className={`inline-block border text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase ${opColor}`}>
                            {opStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Standby state HUD placeholder panel when no city is selected */
        <div className="bg-spaceCard border border-spaceBorder p-12 text-center relative z-10 flex flex-col items-center justify-center min-h-[400px]">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sakuraPink" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sakuraPink" />

          {/* Standby icon */}
          <div className="w-16 h-16 border border-spaceBorder bg-spaceBg flex items-center justify-center mb-6 relative">
            <div className="absolute inset-1.5 border border-dashed border-sakuraPink/40 animate-spin" style={{ animationDuration: '10s' }} />
            <Activity className="w-8 h-8 text-spaceSafe animate-pulse" />
          </div>

          <span className="font-mono text-[10px] tracking-[0.25em] text-sakuraPink uppercase mb-2 font-bold animate-pulse">
            // FORECAST GRID STANDBY //
          </span>
          <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-wider mb-3">
            Awaiting Target Input
          </h2>
          <p className="text-xs font-mono text-gray-400 max-w-md leading-relaxed mb-6">
            The 24-hour predictive DNA reliability sequencer and index schedule table are offline. Select a target station or GPS coordinate in the header to load forecast telemetry.
          </p>
          
          <div className="font-mono text-[9px] text-gray-600 border-t border-spaceBorder/50 pt-4 w-full max-w-sm flex justify-between">
            <span>CHANNELS: LOCKED</span>
            <span>SEQUENCER: STANDBY</span>
          </div>
        </div>
      )}
    </div>
  );
};
