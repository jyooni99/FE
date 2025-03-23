import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  PartialFormDataType,
  PartialQRCodeType,
  QRCodeType,
} from '~/types/form';

interface FormStoreType {
  formData: PartialFormDataType;
  qrData: QRCodeType;
  setFormData: (data: PartialFormDataType) => void;
  setQRData: (data: PartialQRCodeType) => void;
  clearFormData: () => void;
  clearQrData: () => void;
}

const defaultQR = {
  username: '',
  name: '',
  affiliation: '',
  email: '',
  phone: '',
  job: { value: '', category: '' },
};

export const useFormStore = create<FormStoreType>()(
  persist(
    (set) => ({
      formData: {},
      qrData: defaultQR,
      setQRData: (data) =>
        set((state) => ({
          qrData: { ...state.qrData, ...data },
        })),

      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      clearFormData: () => {
        set(() => ({
          formData: {},
        }));
      },

      clearQrData: () => {
        set(() => ({
          qrData: defaultQR,
        }));
      },
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
