'use client';

import { useEffect, useState } from 'react';
import Filter from '~/components/match/filter';
import FilterIcon from '~/assets/svgs/filter.svg';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './one-to-one';
import { useFilterStore } from '~/stores/use-filter-store';

const FilterWrapper = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { control, watch, setValue } = useFormContext<FormValues>();
  const { jobs } = useFilterStore();

  // Zustand jobs ↔ React Hook Form jobs 동기화
  useEffect(() => {
    setValue('jobs', jobs);
  }, [jobs, setValue]);

  const handleFilterToggle = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const applyFilters = () => {
    console.log('현재 필터 값:', watch()); // 모든 필터 값 확인
    setIsFilterVisible(false);
  };

  return (
    <div className="relative w-full">
      {/* 필터 버튼 */}
      <div
        className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2 px-0.5 cursor-pointer"
        onClick={handleFilterToggle}
      >
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-0.5 px-0.5 py-1">
          <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#fefefe]">
            필터
          </p>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
            <FilterIcon />
          </div>
        </div>
      </div>

      {/* 필터 컴포넌트 (JobFilter 포함) */}
      {isFilterVisible && (
        <div className="absolute top-full left-0 w-full bg-[#222222] z-50 p-4 rounded-lg shadow-lg">
          <Filter applyFilters={applyFilters} control={control} />
        </div>
      )}
    </div>
  );
};

export default FilterWrapper;
