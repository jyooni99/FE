export interface ProfileFormType {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface JobFormType {
  affiliation: string;
  job: { category: string; value: string };
  career: { value: string };
  nickname: string;
}

export interface NetworkFormType {
  purpose: { value: string };
  interestJob: { category: string; value: string };
  interest: string[];
  agree: boolean;
}

export interface QRCodeType {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  affiliation: string;
  job: { category: string; value: string };
}

export interface DBFormattedType {
  name: string;
  username: string;
  password: string;
  affiliation: string;
  career: string;
  contactInfo: string;
  email: string;
  interestJobCategory: string;
  interestJobValue: string;
  jobCategory: string;
  jobValue: string;
  interests: string[];
  participationPurpose: string;
}

export interface MypageEditProfileType {
  affiliation: string;
  phone: string;
  email: string;
  career: { value: string };
  job: { category: string; value: string };
  interest: string[];
  purpose: { value: string };
}

export interface DBMypageEditProfileType {
  affiliation: string;
  contactInfo: string;
  career: string;
  email: string;
  interestJobCategory: string;
  interestJobValue: string;
  jobCategory: string;
  jobValue: string;
  interests: string[];
  participationPurpose: string;
}

export type FormDataType = ProfileFormType & JobFormType & NetworkFormType;
export type PartialFormDataType = Partial<FormDataType>;
export type PartialQRCodeType = Partial<QRCodeType>;
