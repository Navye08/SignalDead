import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureCard } from '../components/FeatureCard';
import { 
  Zap, 
  Activity, 
  Satellite, 
  Globe, 
  Lock, 
  Unlock, 
  Terminal, 
  ShieldAlert,
  Loader2
} from 'lucide-react';

export const Capabilities = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'SYSTEM: READY FOR SECURED GRID HANDSHAKE...',
    'WARNING: ENCRYPTION LAYER active // MULTI-BEACON CO-ALIGNMENT REQUIRED',
  ]);

  // Handle manual code entry
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '080808' || passcode.toLowerCase() === 'signaldead') {
      triggerUnlock();
    } else {
      setConsoleLogs(prev => [
        ...prev,
        `ACCESS DENIED: INVALID KEY PHRASE "${passcode}"`,
        'ERR: CRYPTO_KEY_MISMATCH'
      ]);
      setPasscode('');
    }
  };

  // Simulate decrypting/cracking
  const startDecryption = () => {
    setIsDecrypting(true);
    setDecryptProgress(0);
    setConsoleLogs(prev => [...prev, 'CRITICAL: BYPASS REQUESTED. INITIALIZING SHUNT ARRAYS...']);
  };

  useEffect(() => {
    if (!isDecrypting) return;

    const interval = setInterval(() => {
      setDecryptProgress(prev => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          triggerUnlock();
          return 100;
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isDecrypting]);

  // Update logs as progress advances
  useEffect(() => {
    if (!isDecrypting) return;

    if (decryptProgress > 0 && decryptProgress < 25) {
      setConsoleLogs(prev => [...prev, `[${decryptProgress}%] SHUNTING ORBITAL CO-ALIGNMENT PROTOCOLS...`]);
    } else if (decryptProgress >= 25 && decryptProgress < 50) {
      setConsoleLogs(prev => [...prev, `[${decryptProgress}%] INJECTING BUFFER EXPLOIT INTO NAV-IC PARSER...`]);
    } else if (decryptProgress >= 50 && decryptProgress < 75) {
      setConsoleLogs(prev => [...prev, `[${decryptProgress}%] SIGNAL TAMPER DETECTED - RE-ROUTING GATEWAY...`]);
    } else if (decryptProgress >= 75 && decryptProgress < 100) {
      setConsoleLogs(prev => [...prev, `[${decryptProgress}%] FLOODING SCINTILLATION CALIBRATION GRID...`]);
    }
  }, [decryptProgress, isDecrypting]);

  const triggerUnlock = () => {
    setIsDecrypting(false);
    setIsUnlocked(true);
    setConsoleLogs(prev => [
      ...prev,
      'AUTHENTICATION GRANTED.',
      'SYSTEMS DECLASSIFIED // LOADING CORE CAPABILITIES...'
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6 font-mono">
      {/* Page Header */}
      <div className="border-b border-spaceBorder pb-4">
        <span className="text-[10px] tracking-widest text-spaceAccent block uppercase">
          SECURE OPERATIONS DIVISION
        </span>
        <h2 className="text-2xl font-bold text-white uppercase flex items-center gap-2">
          {isUnlocked ? <Unlock className="w-5 h-5 text-spaceSafe" /> : <Lock className="w-5 h-5 text-spaceDanger" />}
          Systems Capabilities Terminal
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Terminal Gate Card */}
            <div className="lg:col-span-7 bg-spaceCard border border-spaceBorder p-6 relative flex flex-col justify-between min-h-[400px]">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sakuraPink" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sakuraPink" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-spaceWarning border-b border-spaceBorder/50 pb-3">
                  <ShieldAlert className="w-6 h-6 animate-pulse text-spaceWarning" />
                  <div className="text-xs uppercase leading-none">
                    <div className="font-bold text-white">RESTRICTED INTERFACE</div>
                    <div className="text-[9px] text-gray-500 mt-1">LEVEL-4 CRYPTOGRAPHIC ACCESS REQUIRED</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs leading-relaxed text-gray-400">
                  <p>
                    You are accessing the SignalDead core telemetry override dashboard. Unlocking this node gives authorization to simulate solar scintillation filters, mock regional beacon coordinates, and access spatial satellite sky-plot predictions.
                  </p>
                  <p className="text-[10px] text-sakuraPink">
                    * HINT: The passcode matches the Void Black color code hex string (6 digits, no hash: 080808) or the application title.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="pt-4 space-y-4">
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                      Enter Security Key Phrase
                    </label>
                    <input
                      type="password"
                      placeholder="HEXCODE OR KEY..."
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      disabled={isDecrypting}
                      className="w-full bg-[#111111] border border-spaceBorder focus:border-sakuraPink px-4 py-2 text-white text-sm focus:outline-none transition-colors rounded-none placeholder:text-gray-700"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isDecrypting}
                      className="px-6 py-2.5 bg-spaceAccent text-black font-bold tracking-widest text-xs uppercase hover:bg-transparent hover:text-spaceAccent border border-spaceAccent transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                      Authenticate
                    </button>
                    <button
                      type="button"
                      onClick={startDecryption}
                      disabled={isDecrypting}
                      className="px-6 py-2.5 bg-transparent text-sakuraPink font-bold tracking-widest text-xs uppercase hover:bg-sakuraPink hover:text-black border border-sakuraPink transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                      {isDecrypting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Cracking [{decryptProgress}%]</span>
                        </>
                      ) : (
                        <span>Force Decryption Bypass</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Progress indicator */}
              {isDecrypting && (
                <div className="mt-6 border border-spaceBorder bg-[#111111] p-2">
                  <div className="flex justify-between text-[9px] mb-1">
                    <span>OVERRIDING ACCESS SHUNT</span>
                    <span>{decryptProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-spaceBorder overflow-hidden">
                    <div 
                      className="h-full bg-sakuraPink transition-all duration-200" 
                      style={{ width: `${decryptProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Log Console */}
            <div className="lg:col-span-5 bg-spaceCard border border-spaceBorder p-4 flex flex-col h-[400px] text-[10px]">
              <div className="flex items-center gap-2 border-b border-spaceBorder pb-2 mb-3 text-gray-500">
                <Terminal className="w-3.5 h-3.5" />
                <span>TERMINAL_FEED // CRYPTO_DAEMON</span>
              </div>
              <div className="flex-grow overflow-y-auto space-y-1.5 text-gray-400 font-mono scrollbar-thin scrollbar-thumb-spaceBorder scrollbar-track-transparent">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-600 select-none">&gt;</span>
                    <span className={log.includes('DENIED') || log.includes('ERR:') ? 'text-spaceDanger' : log.includes('AUTHENTICATION') || log.includes('GRANTED') ? 'text-spaceSafe' : log.includes('BETA') || log.includes('WARNING') ? 'text-spaceWarning' : 'text-gray-400'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="capabilities-screen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Success banner */}
            <div className="bg-spaceSafe/10 border border-spaceSafe p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Unlock className="w-5 h-5 text-spaceSafe" />
                <div>
                  <div className="text-xs font-bold text-white uppercase">CONSOLE AUTHENTICATED SUCCESSFULLY</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">DYNAMIC SECURITY CORES DECRYPTED & ALIGNED</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsUnlocked(false);
                  setConsoleLogs([
                    'SYSTEM: CONNECTION RESET BY OPERATOR',
                    'SYSTEM: READY FOR SECURED GRID HANDSHAKE...'
                  ]);
                }}
                className="text-[9px] border border-spaceBorder hover:border-spaceDanger hover:text-spaceDanger px-2.5 py-1 uppercase transition-colors"
              >
                Lock Terminal
              </button>
            </div>

            {/* Feature Cards Grid */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
