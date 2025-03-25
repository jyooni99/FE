// user.types.ts
export interface UserData {
  id?: number | undefined;
  username?: string;
  password?: string;
  affiliation?: string;
  career?: string;
  contactInfo?: string;
  email?: string;
  interestJobCategory?: string;
  interestJobValue?: string;
  jobCategory?: string;
  jobValue?: string;
  interests?: string[];
  participationPurpose?: string[];
  nickName?: string;
}
