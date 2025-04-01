import axios from 'axios';
import { QRCodeType } from '~/types/form';
import api from '~/utils/api/api';
import { formatFromQRList, formatToQRDB } from '~/utils/format-form-data';

export async function addCard(data: QRCodeType) {
  try {
    const formatted = formatToQRDB(data);
    await api.post('/api/business-cards', formatted);
    alert('명함이 추가되었습니다.');
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 409) {
        alert('이미 등록된 정보입니다.');
      } else {
        console.error('다른 에러:', error.response.status);
      }
    } else {
      console.error('예상치 못한 에러:', error);
    }
  }
}

export async function viewAllCard() {
  try {
    const res = await api.get('/api/business-cards', undefined);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCard() {
  try {
    const res = await api.get('/api/business-cards', undefined);
    const formatted = formatFromQRList(res.data);
    return formatted;
  } catch (error) {
    console.error(error);
  }
}

export async function editCard(data: QRCodeType) {
  const cards = await viewAllCard();
  const targetUsername = data.username;

  const hasCard = cards.some(
    (card: QRCodeType) => card.username === targetUsername,
  );

  if (!hasCard) return;

  try {
    const formatted = formatToQRDB(data);
    const res = await api.put('/api/business-cards', formatted);
    console.log(res.status);
  } catch (error) {
    console.error(error);
  }
}
