'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { careerOptions, groupedJobOptions } from '~/constants/job-options';
import { purposeOptions } from '~/constants/purpose';
import { interestOptions } from '~/constants/interest';

import ToggleField from '~/components/register/toggle-field';
import Input from '~/components/common/input';
import Button from '~/components/common/button';
import SelectField from '~/components/common/select-field';
import { MypageEditProfileType } from '~/types/form';
import { fetchMyPage } from '~/utils/api/user';

const Page = () => {
  const methods = useForm<MypageEditProfileType>({
    defaultValues: {
      job: { category: '', value: '' },
      career: { value: '' },
      purpose: { value: '' },
      interest: [],
      affiliation: '',
      phone: '',
      email: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMyPage();

      if (data) {
        methods.reset(data);
      }
    };

    fetchData();
  });

  return (
    <FormProvider {...methods}>
      <div className="w-full p-5">
        <form>
          <div className="flex flex-col w-full gap-7">
            {/* 프로필 정보 */}
            <div className="flex flex-col gap-2">
              <p className="text-heading-sm font-semibold text-gray-neutral-50">
                프로필 정보
              </p>
              <p className="text-body-sm text-gray-neutral-300">
                입력된 정보는 네트워킹에서 사용할 프로필과 온라인 명함에
                반영됩니다.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <SelectField
                name="job"
                label="직무 / 직책"
                options={groupedJobOptions}
                instanceId="job-select"
              />

              <SelectField
                name="career"
                label="경력"
                options={careerOptions}
                instanceId="career-select"
              />

              <SelectField
                name="purpose"
                label="네트워킹 참여 목적"
                options={purposeOptions}
                instanceId="purpose"
              />

              <div className="flex flex-col gap-1.5">
                <p className="mb-1 font-medium text-sm text-neutral-400">
                  관심 분야
                </p>
                <div className="flex flex-wrap gap-2 px-5 py-4 rounded-lg bg-gray-neutral-800">
                  <ToggleField
                    name="interest"
                    control={methods.control}
                    options={interestOptions}
                    minSelection={1}
                    maxSelection={30}
                    toggleVariants="black"
                    className="mb-0"
                  />
                </div>
              </div>
              <Input name="affiliation" label="소속(회사명/기관명/학교)" />
            </div>

            {/* 기본 정보 */}
            <div className="h-px bg-gray-800/60" />
            <div className="flex flex-col gap-2">
              <p className="text-heading-sm font-semibold text-gray-neutral-50">
                기본 정보
              </p>
              <p className="text-body-sm text-gray-neutral-300">
                입력된 정보는 온라인 명함에 반영됩니다.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Input name="phone" label="휴대폰 번호" />
              <Input name="email" label="이메일" />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 pt-8">
            <Button type="button" variant="black/50">
              취소
            </Button>
            <Button type="submit" variant={'primary'}>
              변경 사항 저장
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
