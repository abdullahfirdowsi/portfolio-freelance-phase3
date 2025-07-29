import React from 'react';

interface AbdIconProps {
  className?: string;
  [key: string]: any;
}

const AbdIcon: React.FC<AbdIconProps> = ({ className = "h-6 w-6", ...props }) => {
  return (
    <svg 
      width="100" 
      height="40" 
      viewBox="0 0 100 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Background for better contrast */}
      <rect 
        x="2" 
        y="8" 
        width="96" 
        height="24" 
        rx="4" 
        fill="currentColor" 
        fillOpacity="0.1"
      />
      <text 
        x="8" 
        y="26" 
        fontFamily="Fira Code, monospace" 
        fontSize="16" 
        fontWeight="900"
        letterSpacing="1px"
        fill="currentColor"
      >
        &lt;abd /&gt;
      </text>
    </svg>
  );
};

export default AbdIcon;