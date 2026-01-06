/**
 * ProgressRing Component
 *
 * SVG circular progress indicator.
 * Used for macro tracking, workout completion, etc.
 */

'use client';

import { useState, useEffect } from 'react';

export interface ProgressRingProps {
  percentage: number; // 0-100
  size?: number; // diameter in pixels
  strokeWidth?: number;
  color?: string; // Tailwind color class (e.g., 'blue-600')
  backgroundColor?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = 'blue-600',
  backgroundColor = 'neutral-200',
  showPercentage = true,
  className = '',
}: ProgressRingProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check dark mode after mount to avoid hydration mismatch
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedPercentage / 100) * circumference;

  // Extract color values for stroke
  const getColorValue = (colorClass: string, isDarkMode: boolean = false) => {
    const colorMap: Record<string, { light: string; dark: string }> = {
      'blue-600': { light: '#2563eb', dark: '#3b82f6' },
      'blue-500': { light: '#3b82f6', dark: '#60a5fa' },
      'green-600': { light: '#16a34a', dark: '#22c55e' },
      'purple-600': { light: '#9333ea', dark: '#a855f7' },
      'amber-600': { light: '#d97706', dark: '#f59e0b' },
      'red-600': { light: '#dc2626', dark: '#ef4444' },
      'neutral-200': { light: '#e5e7eb', dark: '#374151' },
      'neutral-600': { light: '#4b5563', dark: '#6b7280' },
    };
    const colors = colorMap[colorClass] || colorMap['neutral-600'];
    if (!colors) return '#6b7280';
    return isDarkMode ? colors.dark : colors.light;
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        role="img"
        aria-label={`Progress: ${Math.round(clampedPercentage)} percent`}
        width={size}
        height={size}
        className="-rotate-90 transform"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColorValue(backgroundColor, isDark)}
          strokeWidth={strokeWidth}
          fill="none"
          className="dark:opacity-30"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColorValue(color, isDark)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
            {Math.round(clampedPercentage)}%
          </span>
        </div>
      )}
    </div>
  );
}
