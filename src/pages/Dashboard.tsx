import React from 'react';
import { StatusCard } from '../components/StatusCard';
import { MetricCard } from '../components/MetricCard';
import { Heatmap } from '../components/Heatmap';
import { PageHeader } from '../components/PageHeader';
import { getLiveTelemetry } from '../services/mockData';
import { 
  Compass, 
  Satellite, 
  Activity, 
  Gauge, 
  Sun, 
  Navigation 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const telemetry = getLiveTelemetry();

  // Recommendations based on current state
  const getDashboardRecommendations = (risk: 'SAFE' | 'DEGRADED' | 'HIGH RISK') => {
    switch (risk) {
      case 'SAFE':
        return [
          { category: 'DRONE FLIGHTS', action: 'AUTHORIZED', desc: 'GPS accuracy is within nominal tolerances. Auto-return home and precision hover functions functional.', color: 'text-spaceSafe border-spaceSafe' },
          { category: 'LAND SURVEYS', action: 'RECOMMENDED', desc: 'Optimal time for high-precision surveying. PDOP levels are at baseline minimums.', color: 'text-spaceSafe border-spaceSafe' },
          { category: 'NavIC RECEIVERS', action: 'NOMINAL', desc: 'Equatorial plasma delay is fully compensated by dual-band receivers.', color: 'text-spaceSafe border-spaceSafe' }
        ];
      case 'DEGRADED':
        return [
          { category: 'DRONE FLIGHTS', action: 'CAUTION', desc: 'Increased drift probability. Maintain manual line of sight and disable autonomous waypoint tracking.', color: 'text-spaceWarning border-spaceWarning' },
          { category: 'LAND SURVEYS', action: 'DELAY ADVISED', desc: 'Satellite triangulation accuracy degraded. Postpone centimeter-level RTK measurements if possible.', color: 'text-spaceWarning border-spaceWarning' },
          { category: 'SYSTEM LINK', action: 'CHECK CALIBRATION', desc: 'Confirm multi-constellation fallback tracking is enabled to mitigate signal noise.', color: 'text-spaceWarning border-spaceWarning' }
        ];
      case 'HIGH RISK':
        return [
          { category: 'DRONE FLIGHTS', action: 'NO-GO', desc: 'High risk of fly-aways due to geomagnetic storm scintillation. Ground all autonomous operations.', color: 'text-spaceDanger border-spaceDanger' },
          { category: 'AVIATION & RTK', action: 'WARNING', desc: 'Severe ionospheric disturbances. GPS signal lockouts are occurring over coastal and southern sectors.', color: 'text-spaceDanger border-spaceDanger' },
          { category: 'SOLAR RADIATION', action: 'ACTIVE STORM', desc: 'Geomagnetic Kp > 6. Expect absolute signal loss or positioning offsets up to 100 meters.', color: 'text-spaceDanger border-spaceDanger' }
        ];
    }
  };

  const dashboardRecs = getDashboardRecommendations(telemetry.riskLevel);

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Mission Telemetry" 
        subtitle="Real-time space weather data, satellite constellation configuration, and GNSS accuracy deviation indices over the Indian airspace."
        category="DASHBOARD COMMAND // TELEMETRY HUD"
      />

      {/* Main Status Panel */}
      <StatusCard 
        status={telemetry.riskLevel}
        kpIndex={telemetry.kpIndex}
        satellites={telemetry.satellites}
        pdop={telemetry.pdop}
        accuracy={telemetry.accuracy}
        lastUpdated={telemetry.lastUpdated}
      />

      {/* Telemetry Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <MetricCard
          title="ACCURACY DRIFT"
          value={`~${telemetry.accuracy}`}
          unit="MTRS"
          status="SAFE"
          icon={<Compass className="w-4 h-4" />}
          description="GPS L1 NOMINAL ACCURACY"
        />
        <MetricCard
          title="GEOMAGNETIC INDEX"
          value={telemetry.kpIndex}
          unit="KP"
          status={telemetry.kpIndex >= 5 ? 'DANGER' : telemetry.kpIndex >= 4 ? 'WARNING' : 'SAFE'}
          icon={<Sun className="w-4 h-4" />}
          description="SOLAR STORM MAGNITUDE"
        />
        <MetricCard
          title="VISIBLE SATS"
          value={telemetry.satellites}
          unit="SATS"
          status={telemetry.satellites <= 6 ? 'WARNING' : 'SAFE'}
          icon={<Satellite className="w-4 h-4" />}
          description="GPS + NavIC CONSTELLATION"
        />
        <MetricCard
          title="POSITION DILUTION"
          value={telemetry.pdop}
          unit="PDOP"
          status={telemetry.pdop >= 3.0 ? 'WARNING' : 'SAFE'}
          icon={<Navigation className="w-4 h-4" />}
          description="TRIANGULATION GEOMETRY"
        />
        <MetricCard
          title="ELECTRON FLUX FLOW"
          value="48.2"
          unit="TECU"
          status="NEUTRAL"
          icon={<Activity className="w-4 h-4" />}
          description="IONOSPHERIC CHARGE"
        />
        <MetricCard
          title="THERMAL ENERGY CONSTANT"
          value="412"
          unit="ppm"
          status="NEUTRAL"
          icon={<Gauge className="w-4 h-4" />}
          description="IONIZED PROPULSION PARTICLES"
        />
      </div>

      {/* Middle Section: Recommendations + Telemetry Status Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Recommendations Column */}
        <div className="lg:col-span-2 bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-spaceBorder pb-3 mb-4">
              <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
                FLIGHT DIRECTORY LOG
              </span>
              <h3 className="text-base font-mono font-bold text-white uppercase">
                Operational Recommendations
              </h3>
            </div>
            
            <div className="space-y-4">
              {dashboardRecs.map((rec) => (
                <div key={rec.category} className="border border-spaceBorder p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-gray-500 block">MISSION AREA</span>
                    <span className="font-mono text-xs font-bold text-white uppercase">{rec.category}</span>
                  </div>
                  <div className="flex-1 sm:px-4">
                    <p className="text-xs text-gray-400">{rec.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block border text-[10px] font-mono font-bold px-2 py-0.5 uppercase ${rec.color}`}>
                      {rec.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-spaceBorder mt-6 pt-4 text-[9px] font-mono text-gray-600 flex justify-between">
            <span>SECURE CRYPTO LINK VALIDATED</span>
            <span>SYSTEM ENVELOPE: 99.4%</span>
          </div>
        </div>

        {/* Telemetry Status Feed */}
        <div className="bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-spaceBorder pb-3 mb-4">
              <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
                SPACE ENVIRONMENT
              </span>
              <h3 className="text-base font-mono font-bold text-white uppercase">
                Constellation Status
              </h3>
            </div>

            <div className="space-y-3.5 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">GPS CONSTELLATION</span>
                <span className="text-spaceSafe font-bold">ACTIVE (31/31)</span>
              </div>
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">NavIC STATION LINK</span>
                <span className="text-spaceSafe font-bold">NOMINAL (7/7)</span>
              </div>
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">GLONASS DUAL-BAND</span>
                <span className="text-spaceSafe font-bold">ONLINE (24/24)</span>
              </div>
              <div className="flex justify-between items-center border-b border-spaceBorder/50 pb-2">
                <span className="text-gray-500">SOLAR ECLIPSE STATE</span>
                <span className="text-gray-400">NO SHADOW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">MAGNETOPAUSE</span>
                <span className="text-spaceWarning font-bold">COMPRESSED</span>
              </div>
            </div>
          </div>

          <div className="border-t border-spaceBorder mt-6 pt-4 text-[9px] font-mono text-gray-600">
            WARNING: IONOSPHERIC SCINTILLATION VARIES HOURLY.
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <Heatmap />
    </div>
  );
};
