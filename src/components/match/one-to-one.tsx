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
      // 관심분야 필터링 (전체 일치)
      const interestMatch =
        filters.interests.length === 0 ||
        filters.interests.every((interest) =>
          profile.interests?.includes(interest.toLowerCase().trim()),
        );

      // 참여목적 필터링 (부분 일치)
      const purposeMatch =
        filters.participationPurpose.length === 0 ||
        filters.participationPurpose.some((purpose) =>
          profile.participationPurpose?.includes(purpose.toLowerCase().trim()),
        );

      return interestMatch && purposeMatch;
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
