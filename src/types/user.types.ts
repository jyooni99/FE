// user.types.ts
export interface UserData {
  id: number;
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
  nickName: string;
}

//api 받아서
/* 
interestJob?:{
  category: string;
  value: string; 
}
  이 서버에서 올 땐
  interestJobCategory: string;
  interestJobValue: string;

job: {
  category: string;
  value: string;
}
jobCategory: string 
jobValue: string;
*/
