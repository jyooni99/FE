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
  onChange?: (values: string[]) => void;
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
  onChange, // ✅ `onChange` 추가
}: ToggleFieldProps<T>) => {
  const { setError, setValue } = useFormContext();

  return (
    <div className={`${className}`}>
      {label && (
        <div className="flex gap-3 content-center">
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
        render={({ field: { value }, fieldState: { error } }) => {
          const handleValueChange = (newValue: string[]) => {
            let selectedValue: string[] = [];

            // ✅ 단일 선택 모드 (maxSelection=1)
            if (maxSelection === 1) {
              selectedValue =
                newValue.length > 0 ? [newValue[newValue.length - 1]] : [];
            }
            // ✅ 다중 선택 모드 (maxSelection>1)
            else {
              selectedValue = newValue;
            }

            // 최소/최대 선택 수 검증
            if (selectedValue.length < minSelection) {
              setError(name, {
                type: 'manual',
                message: `최소 ${minSelection}개 이상 선택해야 합니다.`,
              });
            } else if (selectedValue.length > maxSelection) {
              setError(name, {
                type: 'manual',
                message: `최대 ${maxSelection}개까지 선택 가능합니다.`,
              });
              return;
            }

            // React Hook Form 업데이트
            setValue(name, selectedValue as T[typeof name], {
              shouldValidate: true,
            });

            // ✅ 부모 컴포넌트에 배열 전달
            onChange?.(selectedValue);
          };

          return (
            <>
              <RadixToggleGroup
                items={options}
                value={value || []} // 초기값 처리
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
