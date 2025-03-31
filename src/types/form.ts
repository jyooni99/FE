export interface ProfileFormType {
  name: string;
  username: string;
  email: string;
  password: string;
  contactInfo: string;
}

export interface JobFormType {
  affiliation: string;
  job: { category: string; value: string };
  career: { value: string };
  nickname: string;
}

export interface NetworkFormType {
  participationPurpose: { value: string };
  interestJob: { category: string; value: string };
  interest: string[];
  agree: boolean;
}

export interface QRCodeType {
  id?: number;
  name: string;
  username?: string;
  email: string;
  contactInfo: string;
  affiliation: string;
  job: { category: string; value: string };
}

export interface DBQRCodeType {
  id?: number;
  name: string;
  username?: string;
  email: string;
  contactInfo: string;
  affiliation: string;
  jobCategory: string;
  jobValue: string;
}

export interface DBFormattedType {
  nickname?: string;
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

export interface UserType {
  nickName?: string;
  name: string;
  email: string;
  affiliation: string;
  career: { value: string };
  contactInfo: string;
  job: { category: string; value: string };
  interestJob: { category: string; value: string };
  interests: string[];
  participationPurpose: { value: string };
}

export interface DBUserType {
  nickName: string | undefined;
  id?: number;
  name: string;
  email: string;
  affiliation: string;
  career: string;
  contactInfo: string;
  interestJobCategory: string;
  interestJobValue: string;
  interests: string[];
  jobCategory: string;
  jobValue: string;
  participationPurpose: string;
}

export type FormDataType = ProfileFormType & JobFormType & NetworkFormType;
export type PartialFormDataType = Partial<FormDataType>;
export type PartialQRCodeType = Partial<QRCodeType>;
