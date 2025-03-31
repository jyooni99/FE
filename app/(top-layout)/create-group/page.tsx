'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '~/components/common/button';
import SliderCareer from '~/components/match/career-slider';
import ToggleField from '~/components/register/toggle-field';
import {
  interestOptions,
  jobOptions,
  purposeOptions,
} from '~/constants/create-group';

import { useState } from 'react';
import axios from 'axios';

interface GroupChatsFormValues {
  job: string[];
  career: number[]; // Slider 값
  interests: string;
  participationPurpose: string;
}

const Page: React.FC = () => {
  const methods = useForm<GroupChatsFormValues>({
    defaultValues: {
      job: ['상관없음'],
      career: [0, 4],
      interests: '상관없음',
      participationPurpose: '상관없음',
    },
  });
  const { control, handleSubmit } = methods;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setResponse] = useState<any>(null);
  const router = useRouter();
  const onSubmit = async (data: GroupChatsFormValues) => {
    // API 호출을 위해 data를 적절히 변환
    const groupChatsRequestDto = {
      job: data.job || [],
      career: '상관없음',
      interests: data.interests || '상관없음',
      participationPurpose: data.participationPurpose || '상관없음',
    };
    console.log('📤 Sending Data:', groupChatsRequestDto);
    try {
      const result = await axios.post(
        'api/chats/group-chatroom/create',
        groupChatsRequestDto,
      );
      setResponse(result.data);
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2 px-5 pt-5 pb-8">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[335px] text-lg font-semibold text-left text-[#fefefe]">
          이런 멤버를 만나고 싶어요
        </p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[335px] text-xs text-left text-[#ff6f22]">
          ⚠ 선택한 기준이 표시되지만, 꼭 일치하는 분만 들어오는 건 아니에요!
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 px-5 pt-5 pb-8"
      >
        {/* 직무/직책 */}
        <div className="mb-6">
          <ToggleField
            label="직무/직책"
            name="job"
            control={control}
            options={jobOptions}
            maxSelection={3}
          />
        </div>

        {/* 관심분야 */}
        <div className="mb-6">
          <ToggleField
            label="관심분야"
            name="interests"
            control={control}
            options={interestOptions}
            maxSelection={1}
          />
        </div>

        {/* 경력 */}
        <div className="mb-6">
          <SliderCareer name="career" label="경력" />
        </div>

        {/* 참여목적 */}
        <div className="mb-6">
          <ToggleField
            label="참여목적"
            name="participationPurpose"
            control={control}
            options={purposeOptions}
            maxSelection={1}
          />
        </div>

        <div className="flex justify-start items-center gap-3">
          {/* 취소 버튼 */}
          <Button
            variant="black-transparent" // 투명한 검정 배경 스타일
            type="button"
            size="full"
            className="flex-grow px-7 py-3.5 rounded-[10px] bg-black/50 text-[#dedede] font-semibold text-base"
            onClick={(e) => {
              e.stopPropagation();
              router.push('/home');
            }}
          >
            취소
          </Button>

          {/* 만들기 버튼 */}
          <Button
            type="submit"
            size="full"
            className="flex-grow px-7 py-3.5 rounded-[10px] bg-[#07ca7f] text-[#fefefe] font-semibold text-base"
          >
            만들기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Page;
