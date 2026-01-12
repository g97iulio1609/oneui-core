import { cn } from '@onecoach/lib-design-system';

interface WizardRadioGroupProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: { id: T; label: string }[];
  className?: string;
}

export function WizardRadioGroup<T extends string | number>({
  value,
  onChange,
  options,
  className,
}: WizardRadioGroupProps<T>) {
  return (
    <div className={cn('flex flex-row gap-2', className)}>
      {options.map((option) => {
        const isSelected = value === option.id;
        return (
          <button
            key={String(option.id)}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              'flex-1 items-center justify-center rounded-xl border-2 px-4 py-3 transition-all outline-none focus:ring-2 focus:ring-blue-500/20',
              isSelected
                ? 'border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold'
                : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 text-neutral-600 dark:text-neutral-400 font-medium'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
