import React from 'react';
import { Home } from 'lucide-react';

/**
 * RoyalLoader - House-themed loading spinner for Royal Realty.
 * - Animated house icon with bounce and glow
 * - Rotating gradient ring behind the house
 * - Usable inline or as a full-page loader
 *
 * Props:
 *   size?: number (default: 48)
 *   className?: string
 *   fullPage?: boolean (if true, centers on page)
 */
const RoyalLoader: React.FC<{
  size?: number;
  className?: string;
  fullPage?: boolean;
}> = ({ size = 48, className = '', fullPage = false }) => {
  const loader = (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-label="Loading..."
      role="status"
    >
      {/* Rotating gradient ring */}
      <span
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background:
            'conic-gradient(from 90deg at 50% 50%, #FFD700 0deg, #2B3A67 120deg, #FFD700 360deg)',
          filter: 'blur(1.5px)',
        }}
      />
      {/* Animated house icon */}
      <span className="absolute inset-0 flex items-center justify-center">
        <Home
          size={size * 0.55}
          className="text-gold-500 drop-shadow-lg animate-bounce"
          style={{
            filter: 'drop-shadow(0 0 8px #FFD70088)',
            animationDuration: '1.2s',
          }}
        />
      </span>
      {/* Subtle glowing pulse */}
      <span className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: '0 0 16px 4px #FFD70033' }} />
    </span>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-royal-950/80">
        {loader}
      </div>
    );
  }
  return loader;
};

export default RoyalLoader; 