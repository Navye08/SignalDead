import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { MissionPlanner } from './pages/MissionPlanner';
import { Timeline } from './pages/Timeline';
import { Learn } from './pages/Learn';
import { Capabilities } from './pages/Capabilities';


function App() {
  // Generate a fixed number of falling cherry blossom petals with distinct parameters
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${10 + Math.random() * 8}s`,
    class: i % 2 === 0 ? 'animate-sakura-1' : 'animate-sakura-2',
    scale: 0.4 + Math.random() * 0.8,
  }));

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-spaceBg text-gray-200 relative overflow-hidden">
        {/* Cherry Blossom (Sakura) Particle Emitter Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {petals.map((p) => (
            <div
              key={p.id}
              className={`sakura-petal ${p.class}`}
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                transform: `scale(${p.scale})`,
              }}
            />
          ))}
        </div>

        {/* Global Application Layout */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/planner" element={<MissionPlanner />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/capabilities" element={<Capabilities />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
