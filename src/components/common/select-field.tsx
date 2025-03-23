'use client';

import Select, { GroupBase } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { customStyles } from '~/styles/react-select';
import { GroupedJobOption } from '~/constants/job-options';

interface Option {
  value: string;
  label?: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: Option[] | GroupBase<GroupedJobOption>[];
  placeholder?: string;
  instanceId: string;
  isClearable?: boolean;
}

const SelectField = ({
  name,
  label,
  options,
  placeholder,
  instanceId,
  isClearable = true,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <p className="mb-1 font-medium text-sm text-neutral-400">{label}</p>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label}을(를) 선택해주세요.` }}
        render={({ field, fieldState }) => (
          <>
            <Select
              {...field}
              instanceId={instanceId}
              options={options}
              placeholder={placeholder || label}
              getOptionLabel={(e) => e.label || e.value}
              styles={customStyles}
              isClearable={isClearable}
            />
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-2">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SelectField;
