import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PartialFormDataType, PartialQRCodeType } from '~/types/form';

interface FormStoreType {
  formData: PartialFormDataType;
  qrData: PartialQRCodeType;
  setFormData: (data: PartialFormDataType) => void;
  setQRData: (data: PartialQRCodeType) => void;
  clearFormData: () => void;
  clearQrData: () => void;
}

export const useFormStore = create<FormStoreType>()(
  persist(
    (set) => ({
      formData: {},
      qrData: {},
      setQRData: (data) =>
        set((state) => ({ qrData: { ...state.qrData, ...data } })),

      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      clearFormData: () => {
        set(() => ({
          formData: {},
        }));
      },

      clearQrData: () => {
        set(() => ({
          formData: {},
        }));
      },
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
