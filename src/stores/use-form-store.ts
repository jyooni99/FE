import { create } from 'zustand';
import {
  PartialFormDataType,
  PartialQRCodeType,
  QRCodeType,
} from '~/types/form';
import { fetchMyCard } from '~/utils/api/user';

interface FormStoreType {
  formData: PartialFormDataType;
  qrData: QRCodeType;
  setFormData: (data: PartialFormDataType) => void;
  setQRData: (data: PartialQRCodeType) => void;
  fetchMyQRData: () => Promise<void>;
  clearFormData: () => void;
}

const defaultQR = {
  username: '',
  name: '',
  affiliation: '',
  email: '',
  contactInfo: '',
  job: { value: '', category: '' },
};

export const useFormStore = create<FormStoreType>()((set) => ({
  formData: {},
  qrData: defaultQR,
  setQRData: (data) =>
    set((state) => ({
      qrData: { ...state.qrData, ...data },
    })),

  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  fetchMyQRData: async () => {
    try {
      const data = await fetchMyCard();
      set({ qrData: data });
      console.log(data);
    } catch (error) {
      console.error('내 카드 불러오기 실패', error);
    }
  },

  clearFormData: () => {
    set(() => ({
      formData: {},
      qrData: defaultQR,
    }));
  },
}));
