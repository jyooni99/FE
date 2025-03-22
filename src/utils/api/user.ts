import axios from 'axios';
import { DBFormatttedType } from '~/types/form';

export async function signup(data: DBFormatttedType) {
  try {
    await axios.post('/api/users/signup', data);
  } catch (error) {
    console.error(error);
  }
}

export async function login(username: string, password: string) {
  try {
    const res = await axios.post('/api/users/login', { username, password });
    return res.data;
  } catch {
    throw new Error('아이디 또는 비밀번호를 확인하세요.');
  }
}

export async function viewAllUser() {
  try {
    const res = await axios.get('/api/users/all', undefined);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
