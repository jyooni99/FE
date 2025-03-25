import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from 'react-hook-form';
import RadixToggleGroup from '../common/radix-toggle-group';

interface ToggleFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { category?: string; value: string }[];
  label?: string;
  subLabel?: string;
  rules?: string;
  minSelection?: number;
  maxSelection?: number;
  toggleVariants?: 'black' | 'primary' | 'primary-small';
  className?: string;
}

const ToggleField = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  subLabel,
  minSelection = 1,
  maxSelection = 1,
  toggleVariants = 'primary',
  className,
}: ToggleFieldProps<T>) => {
  const { setError, setValue } = useFormContext();

  return (
    <div className={`${className}`}>
      {label && (
        <div className="flex gap-3 content-center">
          <div className="w-6 h-6 border border-dashed border-[#02e473]" />
          <div>
            <p className="mb-4 font-bold text-body-lg text-gray-neutral-50">
              {label}
            </p>
            {subLabel && (
              <p className="mb-1 font-medium text-sm text-neutral-400">
                {subLabel}
              </p>
            )}
          </div>
        </div>
      )}

      {!label && subLabel && (
        <p className="mb-2 font-medium text-sm text-neutral-400">{subLabel}</p>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value: string[] | undefined) => {
            const selected = value ?? [];

            if (selected.length < minSelection) {
              return `최소 ${minSelection}개 이상 선택해야 합니다.`;
            }
            if (selected.length > maxSelection) {
              return `최대 ${maxSelection}개까지 선택 가능 합니다.`;
            }
            return true;
          },
        }}
        render={({ field: { value }, fieldState: { error } }) => {
          const handleValueChange = (newValue: T[typeof name]) => {
            let selectedValue: T[typeof name];

            // 단일 선택
            if (maxSelection === 1) {
              const lastSelected = newValue.pop();
              selectedValue = (
                lastSelected ? [lastSelected] : []
              ) as T[typeof name];
            } else {
              // 다중 선택
              if (newValue.length < minSelection) {
                setError(name, {
                  type: 'manual',
                  message: `최소 ${minSelection}개 이상 선택해야 합니다.`,
                });
              } else if (newValue.length > maxSelection) {
                setError(name, {
                  type: 'manual',
                  message: `최대 ${maxSelection}개까지 선택 가능 합니다.`,
                });
                return;
              }
              selectedValue = newValue;
            }

            setValue(name, selectedValue, { shouldValidate: true });
          };

          return (
            <>
              <RadixToggleGroup
                items={options}
                value={value}
                onChange={handleValueChange}
                ariaLabel={`${label} 옵션`}
                variant={toggleVariants}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error.message}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default ToggleField;
