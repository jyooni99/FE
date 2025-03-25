'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormStore } from '~/stores/use-form-store';

export default function FetchMyQR() {
  const { fetchMyQRData, qrData } = useFormStore();
  const router = useRouter();

  useEffect(() => {
    if (!qrData.name === undefined) {
      router.replace('/home');
    } else if (!qrData.name) {
      fetchMyQRData().catch(() => {
        router.replace('/home');
      });
    }
  }, [qrData, fetchMyQRData, router]);

  return null;
}
