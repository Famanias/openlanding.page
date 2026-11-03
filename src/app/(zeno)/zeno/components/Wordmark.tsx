'use client';

import React from 'react';
import { ParadoxMark } from './ParadoxMark';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  showSymbol?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  size = 'md',
  showSymbol = true,
  className = '',
  onClick,
}) => {
  const textSizeClasses =
    size === 'lg'
      ? 'text-[2.75rem] sm:text-[3.6rem] md:text-[4.25rem] tracking-[-0.03em]'
      : size === 'sm'
      ? 'text-[1.5rem] tracking-[-0.03em]'
      : 'text-[1.85rem] sm:text-[2.35rem] md:text-[2.65rem] tracking-[-0.03em]';

  const symbolSize = size === 'lg' ? 52 : size === 'sm' ? 30 : 40;

  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label="ZENO. — Return to top"
      className={`zeno-focus inline-flex items-center gap-3.5 sm:gap-5 group whitespace-nowrap shrink-0 select-none ${className}`}
    >
      <span
        className={`font-grotesk font-bold uppercase leading-none text-[#F2F0EB] transition-transform duration-300 group-hover:translate-x-0.5 ${textSizeClasses}`}
      >
        ZENO<span className="text-[#A58AFF] inline-block ml-[1px]">.</span>
      </span>
      {showSymbol && (
        <span className="transition-transform duration-500 ease-out group-hover:rotate-12">
          <ParadoxMark size={symbolSize} />
        </span>
      )}
    </a>
  );
};

export default Wordmark;
