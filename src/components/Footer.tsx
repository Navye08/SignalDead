export const Footer = () => {
  return (
    <footer className="bg-spaceBg border-t border-spaceBorder py-6 mt-12 font-mono text-[10px] text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-spaceAccent border border-spaceAccent/40 px-1 py-0.2">SD</span>
            <span>&copy; {new Date().getFullYear()} SIGNALDEAD // COOPERATIVE SPACE NAVIGATION DATA</span>
          </div>

          <div className="flex gap-4">
            <span className="text-gray-600">// CO2_LEVEL: 0.08%</span>
            <span className="text-gray-600">THERMAL_GRID: NOMINAL</span>
            <span className="text-gray-600">BEACON: GRID_ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
