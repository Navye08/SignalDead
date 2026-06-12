export interface CityData {
  name: string;
  lat: number;
  lng: number;
  currentRisk: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
  riskScore: number;
  satellites: number;
  kpIndex: number;
}

export interface MissionType {
  id: string;
  label: string;
  sensitivity: number;
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
  ionosphericDelay: number;
}

export interface TimelineForecastItem {
  time: string;
  kpIndex: number;
  satellites: number;
  riskScore: number;
  riskLevel: 'SAFE' | 'DEGRADED' | 'HIGH RISK';
}

// Fetch stations and configuration dynamically
export const fetchStationsData = async (): Promise<{ cities: CityData[]; missionTypes: MissionType[] }> => {
  const response = await fetch('/data/stations.json');
  if (!response.ok) {
    throw new Error('Failed to load dynamic station data from mock endpoints.');
  }
  return response.json();
};

// Custom dynamic 24h timeline forecast scaled by station risk
export const get24hForecast = (cityRiskScore: number): TimelineForecastItem[] => {
  const hours = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const riskFactor = cityRiskScore / 100;

  return hours.map((hour, idx) => {
    let kp = (1.5 + Math.sin((idx / 24) * Math.PI * 2) * 1.5) * (0.6 + riskFactor * 1.0);
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

// Calculate flight risk details dynamically
export const calculateMissionRisk = (
  city: CityData,
  mType: MissionType,
  date: string,
  time: string
): MissionRiskAssessment => {
  const timeHour = parseInt(time.split(':')[0]) || 12;
  const isAfternoonPeak = timeHour >= 13 && timeHour <= 18;
  const dateDay = parseInt(date.split('-')[2]) || 15;
  const dateSeedOffset = (dateDay % 3) - 1;

  let baseKp = city.kpIndex + dateSeedOffset * 0.5;
  if (isAfternoonPeak) {
    baseKp += 2.5;
  }
  baseKp = Math.max(1.0, Math.min(9.0, Number(baseKp.toFixed(1))));

  const sensitivity = mType.sensitivity;
  const baseSatellites = isAfternoonPeak ? Math.max(4, city.satellites - 3) : city.satellites;
  const pdop = Number((1.2 + (12 - baseSatellites) * 0.3).toFixed(1));

  const computedScore = Math.min(100, Math.max(0, Math.round((baseKp * 7 + pdop * 12) * sensitivity)));

  let riskLevel: 'SAFE' | 'DEGRADED' | 'HIGH RISK' = 'SAFE';
  if (computedScore >= 70) {
    riskLevel = 'HIGH RISK';
  } else if (computedScore >= 40) {
    riskLevel = 'DEGRADED';
  }

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
    recs.push('Enable dual-frequency L1+L5 NavIC systems if available.');
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
