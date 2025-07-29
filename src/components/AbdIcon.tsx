import React from 'react';

interface AbdIconProps {
  className?: string;
  [key: string]: any;
}

const AbdIcon: React.FC<AbdIconProps> = ({ className = "h-6 w-6", ...props }) => {
  return (
    <svg 
      width="120" 
      height="64" 
      viewBox="0 0 120 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <text 
        x="10" 
        y="45" 
        fontFamily="Fira Code, monospace" 
        fontSize="36" 
        fill="#2563eb"
      >
        &lt;abd /&gt;
      </text>
    </svg>
  );
};

export default AbdIcon;