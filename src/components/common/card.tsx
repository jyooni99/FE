import React from 'react';
import { cn } from '~/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn('w-full p-4 bg-[#2E2E2E] rounded-lg', className)}
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
