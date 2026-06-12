import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MissionForm } from '../components/MissionForm';
import { PageHeader } from '../components/PageHeader';
import { RiskBadge } from '../components/RiskBadge';
import { calculateMissionRisk } from '../services/mockData';
import type { MissionRiskAssessment } from '../services/mockData';
import { 
  Terminal, 
  Satellite, 
  Cpu, 
  Activity, 
  Navigation,
  Compass,
  AlertTriangle
} from 'lucide-react';

export const MissionPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<MissionRiskAssessment | null>(null);
  const [missionInfo, setMissionInfo] = useState<{ city: string; type: string; date: string; time: string } | null>(null);

  const loadingSteps = [
    'INTERROGATING SPACE WEATHER DATABASE // METADATA SEARCH...',
    'QUERYING THERMAL CONSTANTS // SPECTRUM COMPARISON...',
    'SYNCHRONIZING WITH NAVIGATION BEACONS // ALIGNMENT ACTIVE...',
    'GENERATING FLIGHT CORRIDOR SUMMARY // PLOTTING COMPLETE...'
  ];

  const handleCalculate = (city: string, missionType: string, date: string, time: string) => {
    setLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Simulate real-time calculation sequence
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
        const riskResult = calculateMissionRisk(city, missionType, date, time);
        setResult(riskResult);
        setMissionInfo({ city, type: missionType, date, time });
        setLoading(false);
      }
    }, 450);
  };

  const getRiskTextColor = (level: 'SAFE' | 'DEGRADED' | 'HIGH RISK') => {
    switch (level) {
      case 'SAFE': return 'text-spaceSafe';
      case 'DEGRADED': return 'text-spaceWarning';
      case 'HIGH RISK': return 'text-spaceDanger';
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Mission Planner" 
        subtitle="Simulate GPS reliability along flight corridors, ground surveys, and autonomous drone paths using predictive ionospheric models."
        category="FLIGHT OPERATIONS // PATH SIMULATION"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Input Form Column */}
        <div className="lg:col-span-1 h-full">
          <MissionForm onSubmit={handleCalculate} isLoading={loading} />
        </div>

        {/* Output Assessment Screen */}
        <div className="lg:col-span-2 bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between min-h-[450px] relative">
          
          {/* Immersive grid crosshairs */}
          <div className="absolute top-2 right-2 text-gray-800 font-mono text-[8px] select-none pointer-events-none text-right">
            <div>RADAR_MODE: SIM_ACT</div>
            <div>SYS_FRAME: CL-8402</div>
          </div>

          <AnimatePresence mode="wait">
            {/* 1. Default State: Ready to plan */}
            {!loading && !result && (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center flex-grow text-center py-12"
              >
                <div className="p-4 bg-spaceBg border border-spaceBorder rounded-none mb-4 text-gray-500">
                  <Terminal className="w-10 h-10 animate-pulse text-spaceAccent" />
                </div>
                <h4 className="text-base font-mono font-bold text-white uppercase tracking-wider mb-2">
                  System Awaiting Input
                </h4>
                <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                  Enter mission variables in the Flight Command Module and execute calculation to run GPS reliability simulation.
                </p>
              </motion.div>
            )}

            {/* 2. Loading State: Simulating calculations */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center flex-grow py-12"
              >
                {/* Visual loading spinner */}
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border border-spaceBorder rounded-full" />
                  <div className="absolute inset-0 border-t-2 border-spaceAccent rounded-full animate-spin" style={{ animationDuration: '1s' }} />
                  <div className="absolute inset-2 border border-dashed border-spaceBorder rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-spaceAccent uppercase">
                    SIM_GRID
                  </div>
                </div>

                <h4 className="text-sm font-mono font-bold text-spaceAccent tracking-widest uppercase mb-1">
                  RUNNING ANALYTICS
                </h4>
                
                {/* Stepping notifications */}
                <div className="font-mono text-[10px] text-gray-400 h-4 mt-1">
                  {loadingSteps[loadingStep]}
                </div>
              </motion.div>
            )}

            {/* 3. Result State: Detailed Aerospace Risk Report */}
            {!loading && result && missionInfo && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between flex-grow space-y-6"
              >
                {/* Results Header */}
                <div className="border-b border-spaceBorder pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
                      SIMULATION COMPLETED // STATION: {missionInfo.city.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-mono font-bold text-white uppercase mt-0.5">
                      GPS Reliability Assessment Report
                    </h3>
                  </div>
                  <RiskBadge level={result.riskLevel} />
                </div>

                {/* Score Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center border-b border-spaceBorder pb-6">
                  <div className="md:col-span-1 border border-spaceBorder p-4 flex flex-col items-center justify-center bg-spaceBg h-32 relative text-center">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-widest absolute top-2">RISK INDEX</span>
                    <span className={`text-4xl font-mono font-bold ${getRiskTextColor(result.riskLevel)} mt-2`}>
                      {result.riskScore}%
                    </span>
                    <span className="text-[8px] font-mono text-gray-400 absolute bottom-2">MAX ENVELOPE</span>
                  </div>

                  <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
                    <div>
                      <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-spaceAccent" /> Accuracy Est.
                      </div>
                      <div className="text-white font-bold text-sm">~{result.estimatedAccuracy} meters</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-spaceAccent" /> Kp index
                      </div>
                      <div className={`font-bold text-sm ${result.kpIndex >= 7 ? 'glitch-text text-spaceDanger font-extrabold' : 'text-white'}`}>{result.kpIndex} Kp</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Satellite className="w-3.5 h-3.5 text-spaceAccent" /> Visible Sats
                      </div>
                      <div className="text-white font-bold text-sm">{result.visibleSatellites} / 12</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5 text-spaceAccent" /> Geometry PDOP
                      </div>
                      <div className="text-white font-bold text-sm">{result.pdop}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-spaceAccent" /> Occlusions
                      </div>
                      <div className="text-white font-bold text-sm">{result.occludedSatellites} Satellites</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-spaceAccent" /> Iono delay
                      </div>
                      <div className="text-white font-bold text-sm">{result.ionosphericDelay} ns</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-spaceAccent uppercase mb-2.5 font-bold">
                    FLIGHT OPERATIONS DIRECTIVE
                  </h4>
                  <ul className="space-y-2 font-mono text-xs">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 border border-spaceBorder bg-spaceBg p-2 text-gray-400">
                        <span className="text-spaceAccent font-bold">&gt;&gt;</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative status bar */}
                <div className="border-t border-spaceBorder pt-4 flex justify-between text-[9px] font-mono text-gray-600">
                  <span>DATUM: WGS-84</span>
                  <span>CALCULATION CONFIRM: 0x8FA49D2</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
