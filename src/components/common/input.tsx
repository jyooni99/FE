'use client';

import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';
import Eye from '~/assets/svgs/eye.svg';
import EyeOff from '~/assets/svgs/eye-off.svg';

const inputVariants = cva(
  'border-none py-2 pl-3 outline-none outline-1 rounded-md bg-neutral-700 text-neutral-400',
  {
    variants: {
      inputSize: {
        default: '',
        md: 'w-[230px]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      inputSize: 'default',
    },
  },
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  name: string;
  label?: string;
  type?: string;
  button?: ReactNode;
  className?: string;
  subLabel?: string;
  customMessage?: string;
  customMessageType?: 'success' | 'error';
}

const Input = ({
  name,
  label,
  button,
  inputSize,
  className,
  type = 'text',
  subLabel,
  customMessage,
  customMessageType = 'error',
  ...props
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message?.toString();
  const [inputType, setInputType] = useState(type);

  const toggleType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const showMessage = errorMessage || customMessage;
  const messageColor =
    errorMessage || customMessageType === 'error'
      ? 'text-red-400'
      : 'text-green-500';

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className={`mb-1 font-medium text-sm text-neutral-400 ${className}`}
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 relative">
        <input
          id={name}
          type={inputType}
          {...register(name)}
          {...props}
          className={cn(
            inputVariants({ inputSize }),
            'flex-1',
            className,
            errors[name] && 'border-red-500',
          )}
          aria-invalid={!!errors[name]}
        />
        {button}
        {type === 'password' && (
          <button
            className="absolute right-3"
            onClick={toggleType}
            type="button"
          >
            {inputType === 'password' ? (
              <Eye className="opacity-60" />
            ) : (
              <EyeOff className="opacity-60" />
            )}
          </button>
        )}
      </div>

      {subLabel && <p className="text-xs text-neutral-500 mt-1">{subLabel}</p>}

      {showMessage && (
        <p className={`text-sm mt-1 ${messageColor}`}>
          {errorMessage ?? customMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
