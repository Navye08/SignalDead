export interface TelemetryData {
  kpIndex: number;
  satellites: number;
  pdop: number;
  accuracy: number; // in meters
  riskScore: number; // 0 to 100
  riskLevel: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
  lastUpdated: string;
}

export interface CityData {
  name: string;
  lat: number;
  lng: number;
  currentRisk: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
  riskScore: number;
  satellites: number;
  kpIndex: number;
}

export interface MissionRiskAssessment {
  riskScore: number;
  riskLevel: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
  estimatedAccuracy: number;
  kpIndex: number;
  visibleSatellites: number;
  pdop: number;
  recommendations: string[];
  occludedSatellites: number;
  ionosphericDelay: number; // in ns
}

export interface TimelineForecastItem {
  time: string; // "14:00"
  kpIndex: number;
  satellites: number;
  riskScore: number;
  riskLevel: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
}

// Current system telemetry
export const getLiveTelemetry = (): TelemetryData => {
  return {
    kpIndex: 3.4,
    satellites: 9,
    pdop: 1.8,
    accuracy: 3.2,
    riskScore: 28,
    riskLevel: 'SAFE',
    lastUpdated: new Date().toLocaleTimeString(),
  };
};

// Cities mock database
export const indianCities: CityData[] = [
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, currentRisk: 'SAFE', riskScore: 18, satellites: 11, kpIndex: 3.1 },
  { name: 'New Delhi', lat: 28.6139, lng: 77.2090, currentRisk: 'SAFE', riskScore: 24, satellites: 10, kpIndex: 3.4 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, currentRisk: 'SAFE', riskScore: 20, satellites: 11, kpIndex: 3.2 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, currentRisk: 'DEGRADED', riskScore: 48, satellites: 7, kpIndex: 4.2 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, currentRisk: 'SAFE', riskScore: 22, satellites: 10, kpIndex: 3.1 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, currentRisk: 'SAFE', riskScore: 19, satellites: 10, kpIndex: 3.2 },
  { name: 'Srinagar', lat: 34.0837, lng: 74.7973, currentRisk: 'DEGRADED', riskScore: 55, satellites: 6, kpIndex: 5.1 },
  { name: 'Guwahati', lat: 26.1445, lng: 91.7362, currentRisk: 'HIGH RISK', riskScore: 78, satellites: 5, kpIndex: 6.4 },
  { name: 'Port Blair', lat: 11.6234, lng: 92.7265, currentRisk: 'HIGH RISK', riskScore: 82, satellites: 4, kpIndex: 6.8 },
  { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366, currentRisk: 'SAFE', riskScore: 25, satellites: 9, kpIndex: 3.0 },
];

// 24 Hour forecast generator based on city risk profile
export const get24hForecast = (cityRiskScore: number): TimelineForecastItem[] => {
  const hours = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const riskFactor = cityRiskScore / 100; // ranges from 0.18 to 0.82

  // Deterministic forecast with a peak of geomagnetic activity around 14:00 - 18:00, scaled by the city's risk profile
  return hours.map((hour, idx) => {
    let kp = (1.5 + Math.sin((idx / 24) * Math.PI * 2) * 1.5) * (0.6 + riskFactor * 1.0);
    // Add peak in afternoon
    if (idx >= 13 && idx <= 18) {
      kp += 3.5 * (0.8 + riskFactor * 0.4);
    }
    kp = Math.max(1.0, Math.min(9.0, Number(kp.toFixed(1))));

    let satellites = Math.round(11 - (kp - 1) * 0.8);
    satellites = Math.max(4, Math.min(14, satellites));

    const pdop = Number((1.2 + (12 - satellites) * 0.35).toFixed(1));
    const computedScore = Math.min(100, Math.round((kp / 9) * 55 + (pdop / 5) * 45));

    let riskLevel: 'SAFE' | 'DEGRADED' | 'HIGH RISK' = 'SAFE';
    if (computedScore >= 70) {
      riskLevel = 'HIGH RISK';
    } else if (computedScore >= 40) {
      riskLevel = 'DEGRADED';
    }

    return {
      time: hour,
      kpIndex: kp,
      satellites,
      riskScore: computedScore,
      riskLevel
    };
  });
};

// Mission types details
export const missionTypes = [
  { id: 'drone', label: 'Drone Delivery', sensitivity: 1.2 },
  { id: 'survey', label: 'Survey Mission', sensitivity: 1.0 },
  { id: 'trekking', label: 'Trekking & Search/Rescue', sensitivity: 0.8 },
  { id: 'logistics', label: 'Logistics Fleet', sensitivity: 0.7 },
  { id: 'aviation', label: 'Aviation Operations', sensitivity: 1.5 },
];

// Mission risk calculation algorithm
export const calculateMissionRisk = (
  cityName: string,
  missionType: string,
  date: string,
  time: string
): MissionRiskAssessment => {
  const city = indianCities.find(c => c.name.toLowerCase() === cityName.toLowerCase()) || indianCities[0];
  const mType = missionTypes.find(m => m.id === missionType) || missionTypes[0];

  // Deterministic seed based on city + date + time
  const timeHour = parseInt(time.split(':')[0]) || 12;
  const isAfternoonPeak = timeHour >= 13 && timeHour <= 18;
  const dateDay = parseInt(date.split('-')[2]) || 15;
  const dateSeedOffset = (dateDay % 3) - 1; // ranges from -1 to 1

  let baseKp = city.kpIndex + dateSeedOffset * 0.5;
  if (isAfternoonPeak) {
    baseKp += 2.5; // Scintillation peak
  }
  baseKp = Math.max(1.0, Math.min(9.0, Number(baseKp.toFixed(1))));

  const sensitivity = mType.sensitivity;
  const baseSatellites = isAfternoonPeak ? Math.max(4, city.satellites - 3) : city.satellites;
  const pdop = Number((1.2 + (12 - baseSatellites) * 0.3).toFixed(1));

  // Risk calculation
  const computedScore = Math.min(100, Math.max(0, Math.round((baseKp * 7 + pdop * 12) * sensitivity)));

  let riskLevel: 'SAFE' | 'DEGRADED' | 'HIGH RISK' = 'SAFE';
  if (computedScore >= 70) {
    riskLevel = 'HIGH RISK';
  } else if (computedScore >= 40) {
    riskLevel = 'DEGRADED';
  }

  // Generate recommendations based on risk and mission type
  const recs: string[] = [];
  if (riskLevel === 'SAFE') {
    recs.push('All systems nominal. GPS signal levels are optimal for operational activities.');
    recs.push('Standard multi-constellation (GPS + GLONASS + NavIC) receiver usage recommended.');
  } else if (riskLevel === 'DEGRADED') {
    recs.push('GPS accuracy is degraded. Recommend holding precision autonomous navigation.');
    recs.push('Ensure secondary optical/inertial sensors are calibrated and active.');
    recs.push('Avoid deep urban canyons or heavily forested corridors.');
  } else {
    recs.push('WARNING: Severe GPS reliability alert. High risk of satellite signal loss.');
    recs.push('DO NOT proceed with autonomous flight (Drones) without a manual fail-safe pilot.');
    recs.push('Expect signal dropouts up to 40 meters horizontally and 100 meters vertically.');
    recs.push('Enable dual-frequency L1+L5 NavIC systems if available to combat ionospheric scintillation.');
  }

  const estimatedAccuracy = Number((1.5 + (computedScore / 100) * 15).toFixed(1));
  const occludedSatellites = Math.max(0, 12 - baseSatellites);
  const ionosphericDelay = Math.round(15 + (baseKp * 12) + (computedScore * 0.5));

  return {
    riskScore: computedScore,
    riskLevel,
    estimatedAccuracy,
    kpIndex: baseKp,
    visibleSatellites: baseSatellites,
    pdop,
    recommendations: recs,
    occludedSatellites,
    ionosphericDelay
  };
};
