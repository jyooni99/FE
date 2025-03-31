'use client';

import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Modal, { ModalProps } from '../common/modal';

const AgreeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue, clearErrors } = useFormContext();

  const agreeModalProps: ModalProps = {
    title: '개인정보 수집/활용 동의',
    subText: `
      사전 등록을 통해 입력하신 정보는
      아래와 같은 용도로 안전하게 사용됩니다.

      📌 사전 등록 정보 활용 안내 
      1. QR 코드 발급 및 행사 출입
        - 인증 행사장 출입 및 세션 입장 시 사용 
        - 개인 식별 및 현장 체크인\n
      2. 네트워킹 및 온라인 명함 교환 
        - 1:1, 그룹 매칭 및 네트워킹 참여 시 사용 
        - 참가자 간 명함 교환 및 연락처 정보 제공\n
      3. 행사 맞춤형 추천 및 서비스 제공 
        - 관심사와 직무 기반 맞춤 네트워킹 추천 
        - 세션별 추천 및 후속 알림

      📌 보안 및 개인정보 보호 안내 
      입력하신 정보는 행사 운영 목적 외에는 사용되지 않으며, 행사 종료 후 즉시 파기 또는 보관 동의 기준에 따라 안전하게 처리됩니다. 또한 QR 코드에 포함된 정보는 외부에 노출되지 않으며, 행사 시스템 내에서만 사용됩니다.
    `,
    buttons: [
      {
        label: '동의합니다.',
        variant: 'primary',
        actionType: 'action',
        onClick: () => {
          setValue('agree', true, { shouldValidate: true });
          clearErrors('agree');
        },
      },
    ],
    isOpen: isOpen,
    onOpenChange: setIsOpen,
    triggerButtonLabel: '',
  };

  return (
    <Controller
      name="agree"
      control={control}
      rules={{ required: '개인정보 수집/활용에 동의해주세요.' }}
      render={({ field, fieldState }) => (
        <div className="mt-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agree"
                className="bg-none border-neutral-400 accent-green-500"
                {...field}
                checked={field.value || false}
              />
              <label className="text-sm text-neutral-400" htmlFor="agree">
                개인정보 수집/활용 동의
              </label>
            </div>
            <div onClick={() => setIsOpen(!isOpen)}>
              <p className="text-neutral-400 text-xs border-b border-neutral-400">
                자세히보기
              </p>
              <Modal {...agreeModalProps} />
            </div>
          </div>

          {fieldState.error && (
            <p className="text-sm text-red-500 mt-2">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default AgreeButton;
