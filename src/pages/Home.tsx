import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FeatureCard } from '../components/FeatureCard';
import { 
  Activity, 
  Satellite, 
  Zap, 
  Globe
} from 'lucide-react';

export const Home = () => {
  // Stats data
  const stats = [
    { label: 'SYSTEM THERMAL CONSTANT', value: '96.4', unit: '°C', desc: 'STABLE CONTAINER TEMP' },
    { label: 'BEACON FREQUENCY CHANNELS', value: '12', unit: 'FREQ', desc: 'GRID CO-ALIGNMENT ACTIVE' },
    { label: 'CARBON DIOXIDE EXTRACTION', value: '0.08', unit: '%', desc: 'SCRUBBERS NOMINAL' },
    { label: 'AMBIENT RAD SHIELDING', value: '0.14', unit: 'RAD', desc: 'LEAD ABSORPTION OK' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-between overflow-hidden border-b border-spaceBorder py-12 md:py-20">
        {/* Background aerospace grids */}
        <div className="absolute inset-0 bg-spaceBg opacity-40 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #222222 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-spaceAccent/30 bg-spaceAccent/5 font-mono text-[10px] tracking-widest text-spaceAccent uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-spaceAccent animate-pulse" />
              COOPERATIVE SPACE SAFETY NETWORK
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-white leading-tight uppercase">
              Know When GPS <br />
              <span className="text-spaceAccent">Will Fail</span> Before <br />
              You Depend On It
              <span className="text-xs text-gray-500 font-normal tracking-wide block uppercase font-mono mt-2">
                ORBITAL PROPAGATION MONITOR // MISSION PREDICTION
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
              SignalDead predicts GPS degradation windows using real-time space weather indices, multi-beacon tracking arrays, and solar wind measurements synchronized across tracking grids.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/planner"
                className="bg-spaceAccent border border-spaceAccent text-black font-mono font-bold tracking-widest text-xs uppercase px-6 py-3.5 hover:bg-transparent hover:text-spaceAccent transition-colors duration-200"
              >
                Check GPS Risk
              </Link>
              <Link
                to="/dashboard"
                className="bg-transparent border border-spaceBorder text-white hover:border-spaceAccent font-mono font-bold tracking-widest text-xs uppercase px-6 py-3.5 transition-colors duration-200"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Animated Orbital Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center h-[350px] sm:h-[450px]"
          >
            {/* Spinning Radar Scan Line */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] border border-spaceBorder rounded-full flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-spaceAccent/20 origin-center animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute w-[1px] h-full bg-spaceAccent/10 origin-center animate-spin" style={{ animationDuration: '8s' }} />
              
              {/* Inner Rings */}
              <div className="absolute w-3/4 h-3/4 border border-dashed border-spaceBorder rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute w-1/2 h-1/2 border border-spaceBorder rounded-full" />
              <div className="absolute w-1/4 h-1/4 border border-dashed border-spaceBorder rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
              
              {/* Central Planet (India focus) */}
              <div className="absolute w-12 h-12 bg-[#111111] border border-spaceAccent flex items-center justify-center rounded-full">
                <Globe className="w-6 h-6 text-spaceAccent animate-pulse" />
              </div>

              {/* Orbiting Satellite 1 */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                className="absolute w-full h-full"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-spaceBg border border-spaceAccent p-1">
                  <Satellite className="w-4 h-4 text-spaceAccent" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-spaceAccent whitespace-nowrap">CONSTELLATION // LEO</span>
                </div>
              </motion.div>

              {/* Orbiting Satellite 2 */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                className="absolute w-full h-full"
              >
                <div className="absolute bottom-1/4 right-0 translate-x-1/2 bg-spaceBg border border-spaceSafe p-1">
                  <Satellite className="w-4 h-4 text-spaceSafe" />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-spaceSafe whitespace-nowrap">BEACON GRID // ALIGN</span>
                </div>
              </motion.div>

              {/* Disturbance / Solar Flare indicator */}
              <div className="absolute top-1/4 left-1/4 w-3.5 h-3.5 bg-spaceDanger border border-black rounded-full animate-ping pointer-events-none" />
              <div className="absolute top-1/4 left-1/4 w-3.5 h-3.5 bg-spaceDanger/40 border border-spaceDanger rounded-full pointer-events-none" />
            </div>

            {/* Immersive HUD Details */}
            <div className="absolute bottom-2 right-2 border border-spaceBorder bg-spaceCard/90 p-2 text-[8px] font-mono text-gray-500 space-y-0.5 leading-none">
              <div>GEO_ORBIT: STABLE</div>
              <div>SAT_VIS: 12 / GPS+NavIC</div>
              <div>IONO_DRFT: NOMINAL</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics section */}
      <section className="space-y-6">
        <div className="border-b border-spaceBorder pb-3">
          <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
            SATELLITE DATA LINK
          </span>
          <h3 className="text-lg font-mono font-bold text-white uppercase">
            Live Ionospheric Telemetry
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-spaceCard border border-spaceBorder p-5 font-mono text-center relative"
            >
              {/* Corner decorative bracket */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-spaceAccent/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-spaceAccent/50" />
              
              <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5">{stat.label}</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-[10px] text-spaceAccent uppercase">{stat.unit}</span>
              </div>
              <div className="text-[8px] text-gray-400 mt-2 border-t border-spaceBorder/50 pt-2">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="space-y-6">
        <div className="border-b border-spaceBorder pb-3">
          <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
            OPERATIONAL MODULES
          </span>
          <h3 className="text-lg font-mono font-bold text-white uppercase">
            Core Security Capabilities
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="24h Prediction Window"
            description="Anticipate solar winds, Kp index disturbances, and geomagnetic storm phases with hourly resolution."
            icon={<Zap className="w-5 h-5" />}
            tag="FORECAST"
          />
          <FeatureCard
            title="Real-Time Risk Analysis"
            description="Instantaneous correlation of current ionospheric scintillation indices with GNSS signal tracking databases."
            icon={<Activity className="w-5 h-5" />}
            tag="ANALYSIS"
          />
          <FeatureCard
            title="Satellite Visibility"
            description="Geospatial satellite sky-plot predictions. Spot when mountains, buildings, or horizon occlusion drops visibility."
            icon={<Satellite className="w-5 h-5" />}
            tag="CONSTELLATION"
          />
          <FeatureCard
            title="India Focused Calibration"
            description="Engineered specifically to solve low-latitude ionospheric anomalies and equatorial plasma bubbles affecting India."
            icon={<Globe className="w-5 h-5" />}
            tag="NAV-IC INTEGRATION"
          />
        </div>
      </section>
    </div>
  );
};
