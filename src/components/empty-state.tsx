'use client';

import type { LucideIcon } from 'lucide-react';

import { cn } from '@onecoach/lib-design-system';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8", className)}>
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          <Icon className="h-8 w-8 text-neutral-400 dark:text-neutral-500" />
        </div>
      )}
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400 mb-6">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
