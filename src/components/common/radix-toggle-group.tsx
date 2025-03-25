import * as React from 'react';
import { ToggleGroup } from 'radix-ui';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';
import { FieldValues, Path } from 'react-hook-form';

export type ToggleVariantsProps = VariantProps<typeof itemsVariants>;

interface ToggleItem {
  value: string;
}

interface RadixToggleGroupProps<T extends FieldValues>
  extends ToggleVariantsProps {
  items: ToggleItem[];
  value: string[];
  ariaLabel: string;
  onChange: (newValue: T[Path<T>]) => void;
}

const itemsVariants = cva(
  'py-1 px-4 flex items-center justify-center rounded-full whitespace-nowrap text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        black:
          'data-[state=on]:bg-green-500 data-[state=on]:text-white bg-neutral-600 text-white border border-black',
        primary:
          'h-[40px] px-[18px] py-3 bg-gray-800/60 border border-gray-neutral-500/30 text-gray-neutral-400 data-[state=on]:bg-transparent data-[state=on]:border-green-500 data-[state=on]:text-green-500',
        'primary-small':
          'px-3 py-1 bg-gray-800/60 border border-gray-neutral-500/30 text-gray-neutral-400 data-[state=on]:bg-transparent data-[state=on]:border-green-500 data-[state=on]:text-green-500',
      },
    },
    defaultVariants: {
      variant: 'black',
    },
  },
);

const RadixToggleGroup = <T extends FieldValues>({
  items,
  ariaLabel,
  variant,
  value,
  onChange,
}: RadixToggleGroupProps<T>) => (
  <ToggleGroup.Root
    type="multiple"
    aria-label={ariaLabel}
    value={value}
    onValueChange={onChange}
    className="flex flex-wrap gap-2"
  >
    {items.map(({ value: selectedOption }: ToggleItem) => (
      <ToggleGroup.Item
        key={selectedOption}
        className={cn(itemsVariants({ variant }), 'mb-1')}
        value={selectedOption}
      >
        {selectedOption}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
);

export default RadixToggleGroup;
