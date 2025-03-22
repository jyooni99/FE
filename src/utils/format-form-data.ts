import { DBFormatttedType, PartialFormDataType } from '~/types/form';

export function formatFormData(data: PartialFormDataType): DBFormatttedType {
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
