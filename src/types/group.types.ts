import { UserData } from './user.types';

export interface GroupData
  extends Omit<Partial<UserData>, 'jobCategory' | 'participationPurpose'> {
  id: number;
  jobCategory: string[];
  participationPurpose: string[];
  career?: number[];
  interests: string[];
}
