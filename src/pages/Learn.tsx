import { PageHeader } from '../components/PageHeader';
import { LearnCard } from '../components/LearnCard';
import { 
  Globe, 
  Satellite, 
  Sun, 
  Activity, 
  ShieldAlert 
} from 'lucide-react';

export const Learn = () => {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Theoretical Almanac" 
        subtitle="Understand the space weather mechanics, geomagnetic indices, and atmospheric physics governing GNSS reliability."
        category="KNOWLEDGE CENTER // THEORETICAL DATA"
      />

      <div className="space-y-6">
        {/* Card 1: What is GNSS */}
        <LearnCard
          title="What is GNSS?"
          shortDescription="Global Navigation Satellite Systems represent the collective name for satellite constellations providing global positioning data."
          fullDescription="GNSS includes the US's GPS, Russia's GLONASS, Europe's Galileo, China's BeiDou, and India's NavIC. Multiple constellations are tracked simultaneously by modern receivers to calculate precise coordinates. By measuring the flight time of signals from at least 4 satellites, a ground receiver solves for latitude, longitude, altitude, and precise clock time."
          icon={<Globe className="w-5 h-5" />}
          technicalDetails={[
            'Operational bands: L1 (1575.42 MHz), L2 (1227.60 MHz), L5 (1176.45 MHz)',
            'Standard triangulation requirements: Minimum 4 satellites visible',
            'Primary constellations: GPS (USA), GLONASS (RU), GALILEO (EU), BeiDou (CN)',
            'Regional systems: NavIC (India), QZSS (Japan)'
          ]}
          diagram={
            <div className="flex flex-col items-center p-4 border border-spaceBorder bg-spaceBg/60 w-full max-w-lg font-mono text-[9px] text-gray-500">
              <div className="text-spaceAccent uppercase font-bold mb-2">GNSS Triangulation Geometry</div>
              <div className="border border-spaceBorder p-2 w-full text-center">
                <code>
                  [SAT A]  *---------\<br />
                  [SAT B]  *----------&gt; [RECEIVER] (LAT, LNG, ALT, Time)<br />
                  [SAT C]  *---------/<br />
                  [SAT D]  * (Clock Correction Reference)
                </code>
              </div>
            </div>
          }
        />

        {/* Card 2: What is GPS */}
        <LearnCard
          title="What is GPS?"
          shortDescription="The Global Positioning System is the United States military constellation which pioneered civilian satellite navigation."
          fullDescription="GPS consists of at least 24 active satellites orbiting Earth twice a day. Each satellite transmits high-frequency radio codes containing orbital coordinates (almanac) and atomic clock timestamps. Although highly reliable in normal atmospheric conditions, its signals are vulnerable to attenuation and delay when passing through perturbed regions of Earth's atmosphere."
          icon={<Satellite className="w-5 h-5" />}
          technicalDetails={[
            'Developed by: United States Department of Defense',
            'Minimum constellation size: 24 active satellites',
            'Orbital altitude: ~20,200 km above Earth surface',
            'Civilian accuracy bounds: ~3.0m under nominal conditions'
          ]}
        />

        {/* Card 3: What is Kp Index */}
        <LearnCard
          title="What is Kp Index?"
          shortDescription="The Kp Index measures planetary geomagnetic activity, indicating the impact of solar wind storms on Earth's magnetosphere."
          fullDescription="Ranging from 0 to 9, the Kp index is a logarithmic scale calculated from ground-based magnetometers worldwide. Values below 4 indicate quiet/nominal geomagnetic states. Values of 5 or higher represent geomagnetic storms caused by solar flares or Coronal Mass Ejections (CMEs). These storms warp Earth's magnetic field and trigger ionospheric scintillation."
          icon={<Sun className="w-5 h-5" />}
          technicalDetails={[
            'Scale range: 0 (Quiet) to 9 (Extreme storm)',
            'Storm threshold: Kp >= 5.0',
            'Solar source: Coronal Mass Ejections (CMEs), Solar wind streams',
            'Magnetosphere indicator: Geomagnetic field deflection in nanoteslas'
          ]}
          diagram={
            <div className="w-full max-w-lg font-mono text-[9px] text-gray-500 p-2">
              <div className="text-spaceAccent uppercase font-bold mb-2 text-center">Kp Index Storm Levels</div>
              <div className="grid grid-cols-9 gap-1 text-center font-bold">
                <div className="bg-spaceSafe/10 border border-spaceSafe p-1.5 text-spaceSafe">1</div>
                <div className="bg-spaceSafe/10 border border-spaceSafe p-1.5 text-spaceSafe">2</div>
                <div className="bg-spaceSafe/10 border border-spaceSafe p-1.5 text-spaceSafe">3</div>
                <div className="bg-spaceWarning/10 border border-spaceWarning p-1.5 text-spaceWarning">4</div>
                <div className="bg-spaceWarning/20 border border-spaceWarning p-1.5 text-spaceWarning">5</div>
                <div className="bg-spaceDanger/10 border border-spaceDanger p-1.5 text-spaceDanger">6</div>
                <div className="bg-spaceDanger/20 border border-spaceDanger p-1.5 text-spaceDanger">7</div>
                <div className="bg-spaceDanger/30 border border-spaceDanger p-1.5 text-spaceDanger">8</div>
                <div className="bg-spaceDanger/40 border border-spaceDanger p-1.5 text-spaceDanger">9</div>
              </div>
              <div className="flex justify-between mt-1 text-[8px] text-gray-600">
                <span>QUIET</span>
                <span>MODERATE</span>
                <span>EXTREME STORM</span>
              </div>
            </div>
          }
        />

        {/* Card 4: What is Ionospheric Scintillation */}
        <LearnCard
          title="What is Ionospheric Scintillation?"
          shortDescription="Ionospheric scintillation describes rapid fluctuations in the amplitude and phase of radio waves passing through the upper atmosphere."
          fullDescription="The ionosphere is filled with charged particles (plasma). During solar storms, this layer develops dense blobs and depletion pockets (bubbles). When satellite signals cross these irregular structures, they scatter like light passing through turbulent air. This results in signal rapid fading, receiver cycle slips, and total loss-of-lock, preventing the receiver from computing coordinates."
          icon={<Activity className="w-5 h-5" />}
          technicalDetails={[
            'Atmosphere layer altitude: 60 km to 1,000 km',
            'Physics effect: Diffraction, scattering, refraction',
            'Key indicators: Amplitude scintillation (S4 index), Phase scintillation (Sigma-Phi)',
            'Worst case consequence: Loss of Lock (receiver tracking dropouts)'
          ]}
          diagram={
            <div className="flex flex-col items-center p-4 border border-spaceBorder bg-spaceBg/60 w-full max-w-lg font-mono text-[9px] text-gray-500">
              <div className="text-spaceAccent uppercase font-bold mb-2">Scintillation Signal Scatter</div>
              <div className="border border-spaceBorder p-2 w-full text-center">
                <code>
                  [SAT] ======= (Nominal Signal) ======&gt; [CLEAN IONOSPHERE] ====&gt; [RECEIVER: LOCK OK]<br />
                  <br />
                  [SAT] ====/ / / (Scattered Waves) / / /==&gt; [PLASMA BUBBLES] ====&gt; [RECEIVER: NO LOCK]
                </code>
              </div>
            </div>
          }
        />

        {/* Card 5: Why India is Uniquely Affected */}
        <LearnCard
          title="Why India is Uniquely Affected // GEOMAGNETIC CORRIDOR"
          shortDescription="India's geographic location directly beneath the Equatorial Ionization Anomaly (EIA) creates severe GPS propagation challenges."
          fullDescription="The geomagnetic equator crosses the southern tip of India. Solar heating lifts plasma at the equator, which then diffuses along magnetic field lines northward, settling directly over the Indian sub-continent (Equatorial Ionization Anomaly). This causes massive density peaks and equatorial plasma bubbles (EPBs), leading to severe scintillation even during periods of low global Kp storm activity."
          icon={<ShieldAlert className="w-5 h-5" />}
          technicalDetails={[
            'Critical region: Equatorial Ionization Anomaly (EIA)',
            'Local phenomenon: Equatorial Plasma Bubbles (EPBs)',
            'Vulnerable latitudes: 8°N to 25°N (covers major Indian hubs)',
            'Mitigation response: Dual-frequency receivers and NavIC L5/S-band deployment'
          ]}
        />

        {/* Card 6: LEO Thermal Scattering & Scintillation */}
        <LearnCard
          title="LEO Thermal Scattering & Scintillation // THERMAL INDICES"
          shortDescription="Understanding how upper-atmospheric temperature fluctuations and electron depletion zones impact LEO propagation pathways."
          fullDescription="Ionospheric scintillation is heavily driven by thermal dynamics in the thermosphere. High solar flux events trigger thermal expansion and ionization spikes, creating equatorial plasma depletions (bubbles). By correlating thermal constants and carbon dioxide concentrations in the upper atmosphere, we can model electron density fluctuations and predict GNSS signal lockouts. SignalDead maps these thermal-induced scattering indices to forecast operational flight margins."
          icon={<Sun className="w-5 h-5" />}
          technicalDetails={[
            'Energy absorption index: Solar constant correlation (flux density)',
            'Optimal boundary temperature: Nominal LEO thermosphere model',
            'Scintillation velocity: Logarithmic function of electron density',
            'Signature wavelength: 25.9 GHz (LEO communication link band)'
          ]}
        />
      </div>
    </div>
  );
};
