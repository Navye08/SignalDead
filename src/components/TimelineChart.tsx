import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import type { TimelineForecastItem } from '../services/mockData';

interface TimelineChartProps {
  data: TimelineForecastItem[];
}

export const TimelineChart = ({ data }: TimelineChartProps) => {
  // Custom Tooltip component to match aerospace theme
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: TimelineForecastItem = payload[0].payload;
      let riskColor = 'text-spaceSafe';
      if (item.riskLevel === 'DEGRADED') riskColor = 'text-spaceWarning';
      if (item.riskLevel === 'HIGH RISK') riskColor = 'text-spaceDanger';

      return (
        <div className="bg-[#111111] border border-spaceBorder p-3 font-mono text-xs shadow-2xl">
          <div className="text-spaceAccent border-b border-spaceBorder pb-1 mb-2 font-bold">
            TIME STATUS: {item.time}
          </div>
          <div className="flex justify-between gap-6 mb-1">
            <span className="text-gray-500">RISK SCORE:</span>
            <span className={`${riskColor} font-bold`}>{item.riskScore}%</span>
          </div>
          <div className="flex justify-between gap-6 mb-1">
            <span className="text-gray-500">KP INDEX:</span>
            <span className="text-white font-bold">{item.kpIndex}</span>
          </div>
          <div className="flex justify-between gap-6 mb-1">
            <span className="text-gray-500">GNSS SATS:</span>
            <span className="text-white font-bold">{item.satellites}</span>
          </div>
          <div className="flex justify-between gap-6 border-t border-spaceBorder/50 pt-1.5 mt-1.5">
            <span className="text-gray-500">LEVEL:</span>
            <span className={`${riskColor} font-bold uppercase`}>{item.riskLevel}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[380px] bg-spaceCard border border-spaceBorder p-6 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-spaceBorder pb-4 mb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase">
            24-HOUR FORECAST RADAR
          </span>
          <h3 className="text-lg font-mono font-bold text-white uppercase">
            GPS Degradation Variance
          </h3>
        </div>
        
        {/* Aerospace Legend */}
        <div className="flex gap-4 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceSafe/20 border border-spaceSafe" />
            <span className="text-gray-400">SAFE (&lt;40%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceWarning/20 border border-spaceWarning" />
            <span className="text-gray-400">DEGRADED (40-70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-spaceDanger/20 border border-spaceDanger" />
            <span className="text-gray-400 font-bold">CRITICAL (&gt;70%)</span>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66FCF1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#66FCF1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#555555" 
              tick={{ fill: '#777777', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#1F2937' }}
              axisLine={{ stroke: '#1F2937' }}
            />
            <YAxis 
              stroke="#555555" 
              domain={[0, 100]}
              tick={{ fill: '#777777', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#1F2937' }}
              axisLine={{ stroke: '#1F2937' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1F2937', strokeWidth: 1 }} />
            
            {/* Horizontal warning levels */}
            <ReferenceLine y={40} stroke="#F59E0B" strokeDasharray="3 3" strokeOpacity={0.5} />
            <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="3 3" strokeOpacity={0.5} />
            
            <Area
              type="monotone"
              dataKey="riskScore"
              stroke="#66FCF1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#riskGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
