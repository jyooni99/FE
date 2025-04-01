'use client';

import { useForm, FormProvider } from 'react-hook-form';
import MatchCard from '../card/match-card';
import { UserData } from '~/types/user.types';
import NetworkingModalFlow from './modal-for-match';
import { useState, useEffect } from 'react';
import { useMatchModalStore } from '~/stores/use-match-modal-store';
import FilterWrapper from './filter-wrapper';

interface OneToOneMatchingProps {
  profiles: UserData[];
}

export interface FormValues {
  jobs: string[];
  interests: string[];
  participationPurpose: string[];
  career: number[];
}

const normalizeProfileData = (profiles: UserData[]): UserData[] => {
  return profiles.map((profile) => {
    // 변환 전 데이터 출력
    // console.log(`🔵 [Before Normalization] Profile ${index}:`, profile);

    const normalizedProfile = {
      ...profile,
      jobCategory: (Array.isArray(profile.jobCategory)
        ? profile.jobCategory
        : [profile.jobCategory ?? '']
      ) // 단일 값 → 배열 변환
        .filter(Boolean)
        .map(
          (job) =>
            String(job)
              .trim()
              .replace(/\s/g, '') // 모든 공백 제거
              .toLowerCase(), // 소문자 통일
        ), // null/undefined인 경우 빈 배열 할당
      participationPurpose: Array.isArray(profile.participationPurpose)
        ? profile.participationPurpose
            .filter(Boolean)
            .map((p) => p.trim().replace(/\s/g, '').toLowerCase())
        : [
            profile.participationPurpose
              ?.trim()
              ?.replace(/\s/g, '')
              .toLowerCase() ?? '',
          ],
      interests: Array.isArray(profile.interests)
        ? profile.interests
            .filter(Boolean)
            .map((i) => i.trim().replace(/\s/g, '').toLowerCase())
        : profile.interests != null
          ? [String(profile.interests).trim().replace(/\s/g, '').toLowerCase()]
          : [],
    };

    // 변환 후 데이터 출력
    console.log(
      // `🟢 [After Normalization] Profile ${index}:`,
      normalizedProfile,
    );

    return normalizedProfile;
  });
};

const OneToOneMatching = ({ profiles }: OneToOneMatchingProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<any>({
    defaultValues: {
      interests: [], // 빈 배열로 초기화
      participationPurpose: [], // 빈 배열로 초기화
      career: [0, 4], // 경력 필터 초기화
    },
  });
  const [filteredProfiles, setFilteredProfiles] =
    useState<UserData[]>(profiles);
  const [, setSelectedUser] = useState<UserData | null>(null);
  const { requestedUserIds } = useMatchModalStore();

  // 필터 값 안전하게 처리
  const cleanFilters = (filters: FormValues): FormValues => ({
    jobs: Array.isArray(filters.jobs)
      ? filters.jobs.map((job) => job.trim().replace(/\s/g, '').toLowerCase())
      : [],
    interests: Array.isArray(filters.interests)
      ? filters.interests.map((interest) =>
          interest.trim().replace(/\s/g, '').toLowerCase(),
        )
      : [],
    participationPurpose: Array.isArray(filters.participationPurpose)
      ? filters.participationPurpose.map((purpose) =>
          purpose.trim().replace(/\s/g, '').toLowerCase(),
        )
      : [],
    career: Array.isArray(filters.career)
      ? filters.career.filter((c): c is number => typeof c === 'number')
      : [0, 4],
  });

  const filterProfiles = (profiles: UserData[], filters: FormValues) => {
    return profiles.filter((profile) => {
      // 직무 필터링 (정확한 문자열 일치)
      const jobMatch = filters.jobs?.length
        ? filters.jobs.some((job) => {
            if (typeof job !== 'string' || typeof profile.jobValue !== 'string')
              return false;

            const normalizedJob = job.trim().replace(/\s/g, '').toLowerCase();
            const normalizedJobValue = profile.jobValue
              .trim()
              .replace(/\s/g, '')
              .toLowerCase();

            return normalizedJob === normalizedJobValue;
          })
        : true;

      // 관심사 필터링
      const interestMatch =
        (filters.interests ?? []).length > 0
          ? filters.interests.includes('상관없음') // "상관없음"이면 모든 데이터 허용
            ? true
            : (filters.interests ?? []).some((interest) =>
                profile.interests?.some((profileInterest: string) =>
                  profileInterest
                    .trim()
                    .replace(/\s+/g, '')
                    .includes(interest.trim().replace(/\s+/g, '')),
                ),
              )
          : true;

      // 참여 목적 필터링
      const purposeMatch =
        (filters.participationPurpose ?? []).length > 0
          ? filters.participationPurpose.includes('상관없음') // "상관없음"이면 모든 데이터 허용
            ? true
            : (filters.participationPurpose ?? []).some((purpose) =>
                Array.isArray(profile.participationPurpose)
                  ? profile.participationPurpose.some(
                      (profilePurpose: string) =>
                        profilePurpose.trim() === purpose.trim(),
                    )
                  : typeof profile.participationPurpose === 'string' &&
                    profile.participationPurpose.trim() === purpose.trim(),
              )
          : true;

      // 슬라이더 인덱스와 실제 경력 범위 매핑
      const CAREER_MAPPINGS = [
        { min: 0, max: 0 }, // 학생 (0)
        { min: 0, max: 1 }, // 신입 (0-1년)
        { min: 1, max: 3 }, // 주니어 (1-3년)
        { min: 4, max: 9 }, // 미드레벨 (4-9년)
        { min: 10, max: 100 }, // 시니어 (10년 이상)
      ];

      // 경력 필터링
      const careerMatch = (() => {
        const [minIdx, maxIdx] = filters.career ?? [0, 4];

        // 슬라이더 인덱스를 실제 연차 범위로 변환
        const filterMin = CAREER_MAPPINGS[minIdx].min;
        const filterMax = CAREER_MAPPINGS[maxIdx].max;

        if (typeof profile.career === 'string') {
          // 신입 프로필 처리 (명시적 차단)
          if (profile.career.includes('신입')) {
            return filterMin <= 0 && filterMax >= 1;
          }

          // 경력 프로필 처리
          const careerRange = profile.career.match(/\d+/g);
          if (careerRange) {
            const profileMin = parseInt(careerRange[0]);
            const profileMax = parseInt(careerRange[1] ?? careerRange[0]);
            return profileMin >= filterMin && profileMax <= filterMax;
          }
        }
        return false;
      })();

      // console.log(`Filters Applied:`, filters);
      // console.log(`Profile Being Checked:`, profile);
      // console.log(`Job Match:`, jobMatch);
      // console.log(`Interest Match:`, interestMatch);
      // console.log(`Purpose Match:`, purposeMatch);
      // console.log(`Career Match:`, careerMatch);

      return interestMatch && purposeMatch && careerMatch && jobMatch;
    });
  };

  useEffect(() => {
    const normalizedProfiles = normalizeProfileData(profiles);
    setFilteredProfiles(normalizedProfiles);
  }, [profiles]);

  useEffect(() => {
    const subscription = methods.watch((filters) => {
      const cleanedFilters = cleanFilters(filters);
      setFilteredProfiles(
        filterProfiles(normalizeProfileData(profiles), cleanedFilters),
      );
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, profiles]);

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    const aRequested = requestedUserIds.includes(a.id ?? -1);
    const bRequested = requestedUserIds.includes(b.id ?? -1);
    return aRequested === bRequested ? 0 : aRequested ? -1 : 1;
  });

  return (
    <div className="flex flex-col items-center w-full">
      <FormProvider {...methods}>
        <FilterWrapper />
      </FormProvider>

      {sortedProfiles.length === 0 ? (
        <div className="w-full py-4 text-center text-gray-500">
          검색결과가 없습니다
        </div>
      ) : (
        sortedProfiles.map(
          (profile) =>
            profile.id && (
              <div
                className="w-full"
                key={profile.id}
                onClick={() => setSelectedUser(profile)}
              >
                <MatchCard
                  userData={profile}
                  inMyPage={false}
                  alignedOne={true}
                />
              </div>
            ),
        )
      )}

      <NetworkingModalFlow />
    </div>
  );
};

export default OneToOneMatching;
