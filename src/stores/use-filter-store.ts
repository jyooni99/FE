import { create } from 'zustand';
import {
  jobCategories,
  interestOptions,
  purposeOptions,
} from '~/constants/create-group';

// 모든 옵션 추출
const allJobOptions = jobCategories.flatMap((cat) => cat.subcategories);
const allInterestOptions = interestOptions.map((opt) => opt.value);
const allPurposeOptions = purposeOptions.map((opt) => opt.value);
// 타입 정의
type FilterCategory = 'jobs' | 'interests' | 'career' | 'participationPurpose';

interface FilterState {
  jobs: string[];
  interests: string[];
  career: number[];
  participationPurpose: string[];
  setFilter: (category: FilterCategory, values: string[]) => void;
  toggleFilter: (category: FilterCategory, value: number) => void;
  resetFilters: () => void;
  toggleAll: (category: FilterCategory) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  // 초기 상태
  jobs: [],
  interests: [],
  career: [],
  participationPurpose: [],

  // 필터 설정 함수
  setFilter: (category, values) =>
    set((state) => ({
      ...state,
      [category]:
        category === 'jobs'
          ? values.filter((v) => allJobOptions.includes(v))
          : values,
    })),

  // 필터 토글 함수
  toggleFilter: (category, value) =>
    set((state) => {
      const current = state[category] as number[];
      return {
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    }),

  // 필터 초기화
  resetFilters: () =>
    set({
      jobs: [],
      interests: [],
      career: [],
      participationPurpose: [],
    }),

  // 전체 선택/해제 함수 (핵심 기능)
  toggleAll: (category) =>
    set((state) => {
      const currentItems = state[category];
      let allItems: (string | number)[] = [];

      switch (category) {
        case 'jobs':
          allItems = allJobOptions;
          break;
        case 'interests':
          allItems = allInterestOptions;
          break;
        case 'participationPurpose':
          allItems = allPurposeOptions;
          break;
        case 'career':
          allItems = [0, 1, 2, 3]; // 경력 단계 값 예시
          break;
      }

      const isAllSelected = currentItems.length === allItems.length;
      return {
        [category]: isAllSelected ? [] : allItems,
      };
    }),
}));
