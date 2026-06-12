import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LearnCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ReactNode;
  technicalDetails?: string[];
  diagram?: React.ReactNode;
}

export const LearnCard: React.FC<LearnCardProps> = ({
  title,
  shortDescription,
  fullDescription,
  icon,
  technicalDetails,
  diagram
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-spaceCard border border-spaceBorder">
      {/* Header Panel */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-spaceBg/30 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-spaceBg border border-spaceBorder text-spaceAccent">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-mono font-bold text-white uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              {shortDescription}
            </p>
          </div>
        </div>

        <div className="text-spaceAccent border border-spaceBorder p-1 bg-spaceBg">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-spaceBorder p-5 bg-spaceBg/40 space-y-4">
              <p className="text-xs text-gray-300 leading-relaxed">
                {fullDescription}
              </p>

              {/* Graphical Diagram (If available) */}
              {diagram && (
                <div className="bg-spaceBg border border-spaceBorder p-4 flex items-center justify-center my-3">
                  {diagram}
                </div>
              )}

              {/* Technical Details bullet points */}
              {technicalDetails && technicalDetails.length > 0 && (
                <div className="border-t border-spaceBorder pt-3">
                  <span className="text-[10px] font-mono tracking-widest text-spaceAccent block uppercase mb-2">
                    TECHNICAL CONSTRAINTS & METRICS
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {technicalDetails.map((detail, idx) => (
                      <li key={idx} className="font-mono text-[10px] text-gray-400 flex items-start gap-1.5">
                        <span className="text-spaceAccent mt-0.5">&gt;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
