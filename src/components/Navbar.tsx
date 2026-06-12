import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Mission Planner', path: '/planner' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Learn', path: '/learn' },
  ];

  // Helper to determine if path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-spaceBg border-b border-spaceBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 font-mono font-bold text-white tracking-widest text-lg group">
              <span className="text-spaceAccent border border-spaceAccent px-2 py-0.5 group-hover:bg-spaceAccent group-hover:text-black transition-colors duration-200">
                SD
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-sm">SIGNALDEAD</span>
                <span className="text-[8px] text-gray-500 font-normal tracking-normal">HAIL MARY // ORBIT LINK</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-mono text-xs uppercase tracking-wider py-1 border-b transition-all duration-200 ${
                  isActive(link.path)
                    ? 'border-spaceAccent text-spaceAccent font-bold'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Mission Status Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="border border-spaceBorder bg-spaceCard px-3 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-spaceSafe animate-pulse" />
              <span className="font-mono text-[9px] text-spaceSafe font-bold tracking-widest uppercase">
                HAIL MARY // STATUS: NOMINAL
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Minimal Mobile Status Indicator Icon */}
            <div className="border border-spaceBorder bg-spaceCard p-1.5 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-spaceSafe animate-pulse" />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 border border-spaceBorder text-gray-400 hover:text-white hover:border-spaceAccent transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-spaceBorder bg-spaceBg">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 font-mono text-xs uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 border-l-2 ${
                  isActive(link.path)
                    ? 'border-spaceAccent bg-spaceCard text-spaceAccent font-bold'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-spaceCard/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
