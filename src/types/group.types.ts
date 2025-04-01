import { UserData } from './user.types';

export interface GroupData
  extends Omit<Partial<UserData>, 'jobCategory' | 'participationPurpose'> {
  id: number;
  jobCategory: string[];
  participationPurpose: string[];
  career?: number[];
  interests: string[];
}

type Member = {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  affiliation: string;
  authorities: { authority: string }[];
  career: string;
  contactInfo: string;
  credentialsNonExpired: boolean;
  email: string;
  enabled: boolean;
  id: number;
  interestJobCategory: string;
  interestJobValue: string;
  interests: string[];
  jobCategory: string;
  jobValue: string;
  name: string;
  nickName: string;
  notificationsEnabled: boolean;
  participate: boolean;
  participationPurpose: string;
  password: string;
  username: string;
};

export interface GroupChatRoomResponseDto {
  id: number;
  job: string[];
  members: Member[];
  career: string;
  interests: string;
  participationPurpose: string;
}
