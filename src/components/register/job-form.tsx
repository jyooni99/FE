'use client';

import Select from 'react-select';
import { Controller, useForm, FormProvider } from 'react-hook-form';

import { careerOptions, groupedJobOptions } from '~/constants/job-options';
import Button from '~/components/common/button';
import Input from '~/components/common/input';
import useFormSubmit from '~/utils/use-form-submit';
import { customStyles } from '~/styles/react-select';

export default function JobSelect() {
  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = methods;
  const onSubmit = handleSubmit(useFormSubmit('/register/network'));

  return (
    <FormProvider {...methods}>
      <div className="h-full">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center content-center">
              <Input
                name="affiliation"
                label="소속(회사명/기관명/학교)"
                placeholder="소속이 없는 경우 '일반'으로 기입해 주세요"
              />
            </div>

            <Controller
              name="job"
              control={control}
              rules={{ required: '직무/직책을 선택해주세요.' }}
              render={({ field, fieldState }) => (
                <div>
                  <p className="mb-1 font-medium text-sm text-neutral-400">
                    직무 / 직책
                  </p>
                  <Select
                    {...field}
                    styles={customStyles}
                    instanceId="job-select"
                    placeholder="직무/직책"
                    options={groupedJobOptions}
                    getOptionLabel={(e) => e.value}
                    isClearable
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="career"
              control={control}
              rules={{ required: '경력을 선택해주세요.' }}
              render={({ field, fieldState }) => (
                <div>
                  <p className="mb-1 font-medium text-sm text-neutral-400">
                    경력
                  </p>
                  <Select
                    {...field}
                    styles={customStyles}
                    placeholder="경력"
                    instanceId="career-select"
                    options={careerOptions}
                    getOptionLabel={(e) => e.value}
                    isClearable
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <Button className="py-3" disabled={!isValid}>
            다음으로
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
