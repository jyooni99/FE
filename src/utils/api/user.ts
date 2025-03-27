import api from './api';
import { DBFormattedType, DBUserType, UserType } from '~/types/form';
import {
  formatFromDBUser,
  formatFromQR,
  formatToDBUser,
} from '~/utils/format-form-data';
import axios from 'axios';

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
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id: number) {
  try {
    const res = await api.get('/api/users/all');
    return res.data.find((info: DBUserType) => info.id === id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchProfile() {
  try {
    const res = await api.get('/api/users/mypage', undefined);
    return formatFromDBUser(res.data);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMyCard() {
  try {
    const res = await api.get('/api/users/mypage', undefined);
    return formatFromQR(res.data);
  } catch (error) {
    console.error(error);
  }
}

export async function editProfile(data: UserType) {
  try {
    const formatted = formatToDBUser(data);
    await api.patch('/api/users', formatted);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserDetail(userId: number | string) {
  const res = await axios.get(`/user/${userId}`);
  return res.data;
}
