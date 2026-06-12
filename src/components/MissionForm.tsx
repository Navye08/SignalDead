import { useState } from 'react';
import { indianCities, missionTypes } from '../services/mockData';
import { Crosshair, Calendar, Clock, MapPin, Shield } from 'lucide-react';

interface MissionFormProps {
  onSubmit: (city: string, missionType: string, date: string, time: string) => void;
  isLoading?: boolean;
}

export const MissionForm = ({ onSubmit, isLoading = false }: MissionFormProps) => {
  const [city, setCity] = useState(indianCities[0].name);
  const [missionType, setMissionType] = useState(missionTypes[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('14:00'); // Default to peak scintillation hour

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(city, missionType, date, time);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-spaceBorder pb-3 mb-6">
          <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
            FLIGHT COMMAND MODULE
          </span>
          <h3 className="text-lg font-mono font-bold text-white uppercase">
            Mission Input System
          </h3>
        </div>

        <div className="space-y-5">
          {/* Target Location */}
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-spaceAccent" /> Target Station (India Hub)
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-spaceBg border border-spaceBorder p-2.5 font-mono text-sm text-white focus:outline-none focus:border-spaceAccent rounded-none cursor-pointer"
            >
              {indianCities.map((c) => (
                <option key={c.name} value={c.name} className="bg-spaceCard">
                  {c.name} (LAT: {c.lat.toFixed(2)}, LNG: {c.lng.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Mission Category */}
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-spaceAccent" /> Mission Objective Type
            </label>
            <select
              value={missionType}
              onChange={(e) => setMissionType(e.target.value)}
              className="w-full bg-spaceBg border border-spaceBorder p-2.5 font-mono text-sm text-white focus:outline-none focus:border-spaceAccent rounded-none cursor-pointer"
            >
              {missionTypes.map((m) => (
                <option key={m.id} value={m.id} className="bg-spaceCard">
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-spaceAccent" /> Mission Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-spaceBg border border-spaceBorder p-2 font-mono text-sm text-white focus:outline-none focus:border-spaceAccent rounded-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-spaceAccent" /> Ignition Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-spaceBg border border-spaceBorder p-2 font-mono text-sm text-white focus:outline-none focus:border-spaceAccent rounded-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-spaceBorder pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-spaceAccent/10 hover:bg-spaceAccent border border-spaceAccent text-spaceAccent hover:text-black py-3 font-mono font-bold tracking-widest text-xs uppercase transition-all duration-200 flex items-center justify-center gap-2 rounded-none group disabled:opacity-50"
        >
          <Crosshair className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          {isLoading ? 'CALCULATING ORBITAL PATH...' : 'CALCULATE GPS RISK'}
        </button>
      </div>
    </form>
  );
};
