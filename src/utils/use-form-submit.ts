'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useFormStore } from '~/stores/use-form-store';
import { PartialFormDataType } from '~/types/form';
import { formatFormData } from '~/utils/format-form-data';
import { signup, login } from '~/utils/api/user';

function useFormSubmit(redirect: string) {
  const router = useRouter();
  const path = usePathname();
  const { setFormData, setQRData, formData, clearFormData, fetchMyQRData } =
    useFormStore();

  const entry = path.split('/')[1];

  return async (data: PartialFormDataType) => {
    const updatedData = { ...data };
    setFormData(updatedData);

    if (path.includes('/job')) {
      const random = Math.floor(1 + Math.random() * 1000);
      updatedData.nickname = `${data.job?.category}${random}`;
      setQRData({
        affiliation: data.affiliation,
        job: data.job,
      });
    }

    if (path.includes('/profile')) {
      setQRData({
        username: data.username,
        name: data.name,
        email: data.email,
        contactInfo: data.contactInfo,
      });
    }

    if (path.includes('/network')) {
      try {
        const formattedData = formatFormData({ ...formData, ...updatedData });
        await signup(formattedData);
        clearFormData();

        if (entry === 'pre') {
          router.push('/pre');
        } else {
          await login(formattedData.username, formattedData.password);
          await fetchMyQRData();
          router.push('/welcome');
        }
        return;
      } catch (error) {
        console.error(error);
      }
    }

    if (redirect) {
      router.push(`/${entry}/${redirect}`);
    }
  };
}

export default useFormSubmit;
