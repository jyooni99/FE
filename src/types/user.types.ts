// user.types.ts
export interface UserData {
  id?: number;
  username?: string;
  password?: string;
  affiliation?: string;
  career?: string;
  contactInfo?: string;
  email?: string;
  interestJob?: {
    category: string;
    value: string;
  };
  job?: {
    category: string;
    value: string;
  };
  interests?: string[]; // 관심사는 배열
  participationPurpose?: string; // 네트워킹 목적은 문자열
  nickName?: string;
}
