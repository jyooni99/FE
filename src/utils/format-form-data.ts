import {
  DBFormattedType,
  DBMypageEditProfileType,
  MypageEditProfileType,
  PartialFormDataType,
} from '~/types/form';

export function formatFormData(data: PartialFormDataType): DBFormattedType {
  return {
    name: data.name ?? '',
    username: data.username ?? '',
    password: data.password ?? '',
    affiliation: data.affiliation ?? '',
    career: data.career?.value ?? '',
    contactInfo: data.phone ?? '',
    email: data.email ?? '',
    interestJobCategory: data.interestJob?.category ?? '',
    interestJobValue: data.interestJob?.value ?? '',
    jobCategory: data.job?.category ?? '',
    jobValue: data.job?.value ?? '',
    interests: data.interest ?? [],
    participationPurpose: data.purpose?.value ?? '',
  };
}

export function formatToMyPageForm(
  data: DBMypageEditProfileType,
): MypageEditProfileType {
  return {
    affiliation: data.affiliation,
    phone: data.contactInfo,
    email: data.email,
    career: { value: data.career },
    job: {
      category: data.jobCategory,
      value: data.jobValue,
    },
    interest: data.interests,
    purpose: { value: data.participationPurpose },
  };
}

export function formatToDB(
  data: MypageEditProfileType,
): DBMypageEditProfileType {
  return {
    affiliation: data.affiliation,
    contactInfo: data.phone,
    email: data.email,
    career: data.career.value,
    jobCategory: data.job.category,
    jobValue: data.job.value,
    interests: data.interest,
    interestJobCategory: data.job.category,
    interestJobValue: data.job.value,
    participationPurpose: data.purpose.value,
  };
}
