import React from 'react';

interface AbdIconProps {
  className?: string;
  [key: string]: any;
}

const AbdIcon: React.FC<AbdIconProps> = ({ className = "h-6 w-6", ...props }) => {
  return (
    <svg 
      width="80" 
      height="32" 
      viewBox="0 0 80 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <text 
        x="5" 
        y="22" 
        fontFamily="Fira Code, monospace" 
        fontSize="18" 
        fontWeight="bold"
        fill="currentColor"
      >
        &lt;abd /&gt;
      </text>
    </svg>
  );
};

export default AbdIcon;