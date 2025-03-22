'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import Select from 'react-select';

import { interestOptions } from '~/constants/interest';
import { purposeOptions } from '~/constants/purpose';
import Button from '~/components/common/button';
import ToggleField from '~/components/register/toggle-field';
import useFormSubmit from '~/utils/use-form-submit';
import { customStyles } from '~/styles/react-select';
import { groupedJobOptions } from '~/constants/job-options';
import AgreeButton from './agree-button';

const NetworkForm = () => {
  const MIN_SELECTION = 1; // 최소 선택 개수
  const MAX_SELECTION = interestOptions.length; // 최대 선택 개수

  const methods = useForm({
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = handleSubmit(useFormSubmit('/'));

  return (
    <FormProvider {...methods}>
      <div className="h-full">
        <form
          onSubmit={onSubmit}
          className="flex flex-col h-full justify-between"
        >
          <div className="flex flex-1 flex-col overflow-y-auto gap-5">
            <Controller
              name="purpose"
              control={control}
              rules={{ required: '네트워킹 참여 목적을 선택해주세요.' }}
              render={({ field, fieldState }) => (
                <div>
                  <p className="mb-1 font-medium text-sm text-neutral-400">
                    네트워킹 참여 목적
                  </p>
                  <Select
                    {...field}
                    instanceId="purpose"
                    placeholder="네트워킹 참여 목적"
                    getOptionLabel={(e) => e.value}
                    options={purposeOptions}
                    styles={customStyles}
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
              name="interestJob"
              control={control}
              rules={{ required: '관심있는 직무를 선택해주세요.' }}
              render={({ field, fieldState }) => (
                <div>
                  <p className="mb-1 font-medium text-sm text-neutral-400">
                    관심 있는 직무
                  </p>
                  <Select
                    {...field}
                    instanceId="interestJob"
                    placeholder="관심 있는 직무"
                    getOptionLabel={(e) => e.value}
                    options={groupedJobOptions}
                    styles={customStyles}
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

            <ToggleField
              name="interest"
              subLabel="관심분야"
              control={control}
              options={interestOptions}
              minSelection={MIN_SELECTION}
              maxSelection={MAX_SELECTION}
              toggleVariants="black"
            />
            <AgreeButton />
          </div>
          <div>
            <Button className="py-3" disabled={!isValid}>
              사전등록 완료!
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default NetworkForm;
