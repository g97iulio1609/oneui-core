'use client';

import React from 'react';
import { cn } from '@onecoach/lib-design-system';

// ============================================================================
// ScaleTouch: A wrapper that scales down active elements
// ============================================================================
export interface ScaleTouchProps extends React.HTMLAttributes<HTMLDivElement> {
  scale?: number;
}

export const ScaleTouch = ({ 
  children, 
  className, 
  scale = 0.96, 
  ...props 
}: ScaleTouchProps) => {
  return (
    <div
      className={cn(
        'transition-transform duration-200 ease-out active:scale-[0.96] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// ============================================================================
// PulseIndicator: A pulsing dot for status or attention
// ============================================================================
export const PulseIndicator = ({ 
  color = 'bg-emerald-500', 
  className 
}: { 
  color?: string; 
  className?: string; 
}) => {
  return (
    <div className={cn('relative flex h-3 w-3', className)}>
      <span
        className={cn(
          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
          color
        )}
      />
      <span className={cn('relative inline-flex h-3 w-3 rounded-full', color)} />
    </div>
  );
};

// ============================================================================
// AnimatedNumber: Simple number display (placeholder for future anim)
// ============================================================================
export const AnimatedNumber = ({ 
  value, 
  className 
}: { 
  value: number; 
  className?: string; 
}) => {
  return (
    <span className={cn('tabular-nums tracking-tight', className)}>
      {value}
    </span>
  );
};
