import api from './api';

export async function networkingStart(tableNumber: string) {
  console.log(tableNumber);

  try {
    const res = await api.post(`/api/networking-table/start/${tableNumber}`);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
