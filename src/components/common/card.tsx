import React from 'react';
import { cn } from '~/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

//rounded-2xl bg-mauve12 shadow-md p-6 mb-4
const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      'w-full p-[10px] bg-gray-warm-800 rounded-lg mb-2',
      className,
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: CardProps) => (
  <div className={cn('text-lg font-semibold', className)} {...props} />
);

const CardBody = ({ className, ...props }: CardProps) => (
  <div className={cn('text-md text-gray-white', className)} {...props} />
);

const CardFooter = ({ className, ...props }: CardProps) => (
  <div className={cn('text-sm text-gray-600', className)} {...props} />
);

export { Card, CardHeader, CardBody, CardFooter };
