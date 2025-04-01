'use client';

import { Control, useForm, FormProvider } from 'react-hook-form';
import JobFilter from '../common/accordion/jobfilter';
import ToggleField from '~/components/register/toggle-field';
import SliderCareer from '~/components/match/career-slider';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { interestOptions, purposeOptions } from '~/constants/create-group';
import { useFilterStore } from '~/stores/use-filter-store';
import { memo } from 'react';
import CheckBoxChecked from '~/assets/svgs/checkbox-checked.svg';
import CheckBoxUnchecked from '~/assets/svgs/checkbox-unchecked.svg';
import { jobCategories } from '~/constants/create-group';
export interface FormValues {
  jobs: string[];
  interests: string[];
  participationPurpose: string[];
  career: number[];
}

interface FilterProps {
  applyFilters?: () => void;
  control: Control<FormValues>;
}

const AccordionHeader = memo(
  ({
    title,
    count,
    isChecked,
    onToggle,
  }: {
    title: string;
    count?: string;
    isChecked?: boolean;
    onToggle?: () => void;
  }) => (
    <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-1.5 px-2 py-3">
      <div
        onClick={onToggle}
        className="flex items-center justify-center w-5 h-5 cursor-pointer"
        role="checkbox"
        aria-checked={isChecked}
      >
        {isChecked ? (
          <CheckBoxChecked className="w-full h-full text-[#07ca7f]" />
        ) : (
          <CheckBoxUnchecked className="w-full h-full text-[#858585]" />
        )}
      </div>
      <p className="text-base font-semibold text-[#fefefe]">{title}</p>
      {count && <p className="text-xs font-bold text-[#ff6f22]">{count}</p>}
      <ChevronDownIcon className="ml-auto transform transition-transform" />
    </div>
  ),
);

const Filter = ({ applyFilters }: FilterProps) => {
  const methods = useForm<FormValues>(); // ✅ useForm 초기화
  const { control } = methods; // control 추출
  const jobs = useFilterStore((state) => state.jobs);
  const interests = useFilterStore((state) => state.interests);
  const participationPurpose = useFilterStore(
    (state) => state.participationPurpose ?? [],
  );
  const career = useFilterStore((state) => state.career);
  const allJobOptions = jobCategories.flatMap((cat) => cat.subcategories);
  // 선택된 항목 수를 계산
  const selectedCount =
    jobs.length +
    interests.length +
    participationPurpose.length +
    career.length;

  return (
    <FormProvider {...methods}>
      <div className="w-full mb-4 space-y-2">
        <Accordion.Root type="multiple">
          {/* 직무 필터 */}
          <Accordion.Item value="job">
            <Accordion.Trigger asChild>
              <div className="w-full bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <AccordionHeader
                  title="직무/직책"
                  count={`${jobs.length}/${allJobOptions.length}`} // ✅ 전체 옵션 수 반영
                  isChecked={jobs.length === allJobOptions.length}
                  onToggle={() => useFilterStore.getState().toggleAll('jobs')}
                />
              </div>
            </Accordion.Trigger>
            <Accordion.Content className="px-4 py-2">
              <JobFilter />
            </Accordion.Content>
          </Accordion.Item>

          {/* 관심분야 필터 */}
          <Accordion.Item value="interest">
            <Accordion.Trigger asChild>
              <div className="w-full bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <AccordionHeader
                  title="관심분야"
                  count={`${interests.length}/9`}
                  isChecked={interests.length === interestOptions.length}
                  onToggle={() =>
                    useFilterStore.getState().toggleAll('interests')
                  }
                />
              </div>
            </Accordion.Trigger>
            <Accordion.Content className="px-4 py-2">
              <ToggleField<FormValues>
                name="interests"
                control={control}
                options={interestOptions}
                maxSelection={9}
                onChange={(value: string) => {
                  const currentInterests = useFilterStore.getState().interests;
                  const updated = currentInterests.includes(value)
                    ? currentInterests.filter((item) => item !== value)
                    : [...currentInterests, value];
                  useFilterStore.getState().setFilter('interests', updated);
                }}
              />
            </Accordion.Content>
          </Accordion.Item>

          {/* 경력 필터 */}
          <Accordion.Item value="career">
            <Accordion.Trigger asChild>
              <div className="w-full bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <AccordionHeader
                  title="경력"
                  count={`${career.length}/4`}
                  isChecked={career.length === 4}
                  onToggle={() => useFilterStore.getState().toggleAll('career')}
                />
              </div>
            </Accordion.Trigger>
            <Accordion.Content className="px-4 py-2">
              <SliderCareer name="career" />{' '}
              {/* ✅ name="career"로 일관성 유지 */}
            </Accordion.Content>
          </Accordion.Item>

          {/* 참여목적 필터 */}
          <Accordion.Item value="purpose">
            <Accordion.Trigger asChild>
              <div className="w-full bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <AccordionHeader
                  title="참여목적"
                  count={`${participationPurpose.length}/8`}
                  isChecked={
                    participationPurpose.length === purposeOptions.length
                  }
                  onToggle={() =>
                    useFilterStore.getState().toggleAll('participationPurpose')
                  }
                />
              </div>
            </Accordion.Trigger>
            <Accordion.Content className="px-4 py-2">
              <ToggleField<FormValues>
                name="participationPurpose"
                control={control}
                options={purposeOptions}
                maxSelection={8}
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>

        {/* 선택된 항목 수 표시 */}
        <div className="text-center text-sm text-gray-400 mt-4">
          총 {selectedCount}개의 항목이 선택되었습니다.
        </div>

        {/* 필터 적용 버튼 */}
        <button
          type="button"
          onClick={applyFilters}
          className={`w-full bg-green-${selectedCount > 0 ? '500' : '300'} text-white py-3 rounded-lg font-semibold hover:bg-green-${selectedCount > 0 ? '600' : '300'} transition-all`}
          disabled={selectedCount === 0} // 선택된 항목이 없으면 버튼 비활성화
        >
          필터 적용
        </button>
      </div>
    </FormProvider>
  );
};

AccordionHeader.displayName = 'AccordionHeader';

export default Filter;
