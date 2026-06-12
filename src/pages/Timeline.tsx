import { PageHeader } from '../components/PageHeader';
import { TimelineChart } from '../components/TimelineChart';
import { get24hForecast } from '../services/mockData';
import { 
  AlertOctagon, 
  Clock 
} from 'lucide-react';

export const Timeline = () => {
  const forecastData = get24hForecast();

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
      <PageHeader 
        title="Predictive Timeline" 
        subtitle="24-hour ahead geomagnetic orbital forecast mapping ionospheric density variations and triangulation safety slots."
        category="FORECAST WINDOW // TIME ANALYTICS"
      />

      {/* Top Banner: Plain-English Alert */}
      <div className="bg-spaceDanger/10 border border-spaceDanger p-5 flex items-start gap-4">
        <div className="p-2.5 bg-spaceBg border border-spaceDanger/30 text-spaceDanger">
          <AlertOctagon className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <span className="font-mono text-[9px] text-spaceDanger font-bold tracking-widest block uppercase mb-1">
            CRITICAL GEOMAGNETIC WEATHER ALERT // FLUX DISSIPATION WINDOW
          </span>
          <p className="text-sm font-mono text-white leading-relaxed">
            Avoid GPS-dependent maneuvers and heavy propulsion burns <span className="text-spaceDanger font-bold underline">{dangerWindowString}</span> due to solar wind deflection and predicted signal scintillation.
          </p>
        </div>
      </div>

      {/* Recharts Timeline chart */}
      <TimelineChart data={forecastData} />

      {/* High-density Hourly Telemetry Grid */}
      <div className="bg-spaceCard border border-spaceBorder p-6">
        <div className="border-b border-spaceBorder pb-3 mb-6">
          <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
            ORBITAL SCHEDULE
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
    </div>
  );
};
