import React from 'react';

interface AbdIconProps {
  className?: string;
  [key: string]: any;
}

const AbdIcon: React.FC<AbdIconProps> = ({ className = "h-6 w-6", ...props }) => {
  return (
    <svg 
      width="120" 
      height="50" 
      viewBox="0 0 120 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Border rectangle */}
      <rect 
        x="5" 
        y="5" 
        width="110" 
        height="40" 
        rx="6" 
        fill="none"
        stroke="currentColor" 
        strokeWidth="2"
      />
      {/* Background fill */}
      <rect 
        x="7" 
        y="7" 
        width="106" 
        height="36" 
        rx="4" 
        fill="currentColor" 
        fillOpacity="0.05"
      />
      <text 
        x="15" 
        y="32" 
        fontFamily="Inter, system-ui, sans-serif" 
        fontSize="22" 
        fontWeight="900"
        letterSpacing="2px"
        fill="currentColor"
      >
        &lt;abd /&gt;
      </text>
    </svg>
  );
};

export default AbdIcon;