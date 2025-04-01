import {
  DBFormattedType,
  UserType,
  DBUserType,
  PartialFormDataType,
  QRCodeType,
  DBQRCodeType,
} from '~/types/form';

// form 전송을 위한 데이터 변환
export function formatFormData(data: PartialFormDataType): DBFormattedType {
  return {
    name: data.name ?? '',
    username: data.username ?? '',
    password: data.password ?? '',
    affiliation: data.affiliation ?? '',
    career: data.career?.value ?? '',
    contactInfo: data.contactInfo ?? '',
    email: data.email ?? '',
    interestJobCategory: data.interestJob?.category ?? '',
    interestJobValue: data.interestJob?.value ?? '',
    jobCategory: data.job?.category ?? '',
    jobValue: data.job?.value ?? '',
    interests: data.interest ?? [],
    participationPurpose: data.participationPurpose?.value ?? '',
  };
}

// DB -> mypage 등에서 사용할 수 있도록 변환
export function formatFromDBUser(data: DBUserType): UserType {
  return {
    nickName: data.nickName,
    username: data.username,
    name: data.name,
    affiliation: data.affiliation,
    contactInfo: data.contactInfo,
    email: data.email,
    career: { value: data.career },
    job: {
      category: data.jobCategory,
      value: data.jobValue,
    },
    interests: data.interests,
    interestJob: {
      category: data.interestJobCategory,
      value: data.interestJobValue,
    },
    participationPurpose: { value: data.participationPurpose },
  };
}

// mypage -> DB로 전달
export function formatToDBUser(data: UserType): DBUserType {
  return {
    nickName: data.nickName,
    username: data.username,
    name: data.name,
    affiliation: data.affiliation,
    contactInfo: data.contactInfo,
    email: data.email,
    career: data.career.value,
    jobCategory: data.job.category,
    jobValue: data.job.value,
    interests: data.interests,
    interestJobCategory: data.interestJob.category,
    interestJobValue: data.interestJob.value,
    participationPurpose: data.participationPurpose.value,
  };
}

// DB -> 프론트 명함 데이터로 포맷
export function formatFromQR(data: DBQRCodeType): QRCodeType {
  return {
    name: data.name,
    affiliation: data.affiliation,
    contactInfo: data.contactInfo,
    email: data.email,
    job: {
      category: data.jobCategory,
      value: data.jobValue,
    },
  };
}

export function formatFromQRList(data: DBQRCodeType[]): QRCodeType[] {
  return data.map((item) => ({
    name: item.name,
    affiliation: item.affiliation,
    contactInfo: item.contactInfo,
    email: item.email,
    job: {
      category: item.jobCategory,
      value: item.jobValue,
    },
  }));
}

// 명함 데이터 -> DB에 추가할 때
export function formatToQRDB(data: QRCodeType): DBQRCodeType {
  return {
    name: data.name,
    affiliation: data.affiliation,
    contactInfo: data.contactInfo,
    email: data.email,
    jobCategory: data.job.category,
    jobValue: data.job.value,
  };
}
