import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  PartialFormDataType,
  PartialQRCodeType,
  QRCodeType,
} from '~/types/form';
import { fetchMyCard } from '~/utils/api/user';

const defaultQR: QRCodeType = {
  username: '',
  name: '',
  affiliation: '',
  email: '',
  contactInfo: '',
  job: { value: '', category: '' },
};

interface FormStoreType {
  formData: PartialFormDataType;
  qrData: QRCodeType;
  setFormData: (data: PartialFormDataType) => void;
  setQRData: (data: PartialQRCodeType) => void;
  fetchMyQRData: () => Promise<void>;
  clearFormData: () => void;
}

export const useFormStore = create(
  persist<FormStoreType>(
    (set) => ({
      formData: {},
      qrData: defaultQR,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setQRData: (data) =>
        set((state) => ({
          qrData: { ...state.qrData, ...data },
        })),

      fetchMyQRData: async () => {
        try {
          const data = await fetchMyCard();
          set({ qrData: data });
          console.log(data);
        } catch (error) {
          console.error('내 카드 불러오기 실패', error);
        }
      },

      clearFormData: () =>
        set(() => ({
          formData: {},
          qrData: defaultQR,
        })),
    }),
    {
      name: 'form-storage', // localStorage key
    },
  ),
);
