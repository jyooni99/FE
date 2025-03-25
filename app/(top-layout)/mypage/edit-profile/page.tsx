'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import isEqual from 'lodash.isequal';

import { careerOptions, groupedJobOptions } from '~/constants/job-options';
import { purposeOptions } from '~/constants/purpose';
import { interestOptions } from '~/constants/interest';

import ToggleField from '~/components/register/toggle-field';
import Input from '~/components/common/input';
import Button from '~/components/common/button';
import SelectField from '~/components/common/select-field';
import { UserType } from '~/types/form';
import { editProfile, fetchProfile } from '~/utils/api/user';
import { phoneFormatter } from '~/utils/phone-formatter';

const Page = () => {
  const router = useRouter();
  const methods = useForm<UserType>();
  const { watch, handleSubmit, setValue } = methods;

  const currentData = watch(); // 현재 데이터
  const [originData, setOriginData] = useState<UserType | null>(null); // 원본 데이터
  const isUnChanged = originData !== null && isEqual(originData, currentData); // 폼 값이 바뀌었는지 체크

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProfile();

      if (data) {
        setOriginData(data);
        methods.reset(data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="w-full p-5">
        <form
          onSubmit={handleSubmit(() => {
            editProfile(currentData);
            setOriginData(currentData);
            alert('정보 수정이 완료되었습니다.');
          })}
        >
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
                name="participationPurpose"
                label="네트워킹 참여 목적"
                options={purposeOptions}
                instanceId="participationPurpose"
              />

              <div className="flex flex-col gap-1.5">
                <p className="mb-1 font-medium text-sm text-neutral-400">
                  관심 분야
                </p>
                <div className="flex flex-wrap gap-2 px-5 py-4 rounded-lg bg-gray-neutral-800">
                  <ToggleField
                    name="interests"
                    control={methods.control}
                    options={interestOptions}
                    minSelection={1}
                    maxSelection={30}
                    toggleVariants="primary-small"
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
              <Input
                name="contactInfo"
                label="휴대폰 번호"
                onChange={(e) =>
                  setValue('contactInfo', phoneFormatter(e.target.value))
                }
              />
              <Input name="email" label="이메일" />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 pt-8">
            <Button
              type="button"
              className="h-[50px]"
              variant={'black-transparent'}
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="h-[50px]"
              variant={'green'}
              disabled={isUnChanged}
            >
              변경 사항 저장
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Page;
