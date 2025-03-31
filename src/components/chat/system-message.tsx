interface SystemMessageProps {
  type: 'notice' | 'agree' | 'complete' | 'timeout';
  nickname?: string;
}

const SystemMessage = ({ type, nickname }: SystemMessageProps) => {
  const renderContent = () => {
    switch (type) {
      case 'notice':
        return (
          <>
            <p className="text-base font-semibold text-left text-[#fefefe]">
              현재 모든 테이블이 사용 중이에요.
              <br />
              테이블 예약에 동의해 주세요.
            </p>
            <p className="text-[13px] text-left text-[#dedede]">
              구성원이 모두 동의하면 테이블을 예약할 수 있어요!
            </p>
          </>
        );
      case 'agree':
        return (
          <p className="text-base font-semibold text-left text-[#fefefe]">
            {nickname && `${nickname}님이 `}
            <br />
            테이블 예약에 동의했어요.
          </p>
        );
      case 'complete':
        return (
          <>
            <p className="text-base font-semibold text-left text-[#fefefe]">
              예약 완료!
            </p>
            <p className="text-[13px] text-left text-[#dedede]">
              테이블이 배정되면 알림을 보내드릴게요.
              <br />
              <span className="text-orange-500 text-[12px]">
                * 테이블 배정 후 10분 이내에 이용을 시작해 주세요.
              </span>
            </p>
          </>
        );
      case 'timeout':
        return (
          <>
            <p className="text-base font-semibold text-left text-[#fefefe]">
              테이블이 취소 됐어요.
            </p>
            <p className="text-[13px] text-left text-[#dedede]">
              QR 등록 시간이 초과되어 테이블이 취소됐어요.
              <br />
              테이블 이용을 원하면 다시 신청을 진행해주세요!
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-start items-start w-[290px] gap-3 px-2.5">
      <div className="self-stretch w-1 rounded-full bg-[#424242]" />
      <div className="flex flex-col justify-start items-start flex-grow gap-2.5 py-1">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-start items-start gap-0.5 w-full">
            <div className="flex flex-col justify-start items-start relative gap-0.5 w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMessage;
