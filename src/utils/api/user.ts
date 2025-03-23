import { DBFormattedType, MypageEditProfileType } from '~/types/form';
import api from './api';
import { formatToDB, formatToMyPageForm } from '../format-form-data';

export async function signup(data: DBFormattedType) {
  try {
    await api.post('/api/users/signup', data);
  } catch (error) {
    console.error(error);
  }
}

export async function login(username: string, password: string) {
  try {
    const res = await api.post('/api/users/login', { username, password });
    return res.data;
  } catch {
    throw new Error('아이디 또는 비밀번호를 확인하세요.');
  }
}

export async function viewAllUser() {
  try {
    const res = await api.get('/api/users/all', undefined);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMyPage() {
  try {
    const res = await api.get('/api/users/mypage', undefined);
    return formatToMyPageForm(res.data);
  } catch (error) {
    console.error(error);
  }
}

export async function editProfile(data: MypageEditProfileType, userId: number) {
  try {
    const formatted = formatToDB(data);
    const res = await api.put(`/api/user/${userId}`, formatted);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
