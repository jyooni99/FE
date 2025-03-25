'use client';

import { FormProvider, useForm } from 'react-hook-form';
import Button from '~/components/common/button';
import ToggleField from '~/components/register/toggle-field';
import {
  interestOptions,
  jobOptions,
  purposeOptions,
} from '~/constants/create-group';
import { careerOptions } from '~/constants/job-options';

const Page = () => {
  const methods = useForm<{
    job: string[];
    interest: string[];
    career: string[];
    participationPurpose: string[];
  }>({
    defaultValues: {
      job: ['상관없음'],
      interest: ['상관없음'],
      career: [],
      participationPurpose: ['상관없음'],
    },
  });

  const { control, handleSubmit, watch } = methods;
  const selectedOptions = watch();
  const isValid = Object.values(selectedOptions).every(
    (valueArr) => valueArr.length > 0,
  );
  const onSubmit = handleSubmit((data) => {
    if (data) {
      console.log(data);
    }
  });

  return (
    <div className="px-5">
      <div className="flex flex-col gap-2 pt-5 pb-8">
        <p className="text-heading-xs font-semibold text-white">
          이런 멤버를 만나고 싶어요
        </p>
        <p className="text-body-sm text-orange-500">
          ⚠ 선택한 기준이 표시되지만, 꼭 일치하는 분만 들어오는 건 아니에요!
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <ToggleField
            label="직무/직책"
            name="job"
            control={control}
            options={jobOptions}
          />
          <ToggleField
            label="관심분야"
            name="interest"
            control={control}
            options={interestOptions}
          />
          <ToggleField
            label="경력"
            name="career"
            control={control}
            options={careerOptions}
          />
          <ToggleField
            label="참여목적"
            name="participationPurpose"
            control={control}
            options={purposeOptions}
          />

          <div className="flex gap-2">
            <Button size={'full'} variant={'black/50'}>
              취소
            </Button>
            <Button size={'full'} disabled={!isValid}>
              만들기
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
