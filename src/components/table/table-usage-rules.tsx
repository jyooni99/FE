import React from 'react';
import CheckCircle from '~/assets/svgs/check-circle.svg';

const TableUsageRules: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 px-4 py-5 rounded-xl bg-[#2e2e2e]">
      <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-3">
        <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
            <CheckCircle
              width={20}
              height={20}
              className="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
            />
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-[15px] font-semibold text-center text-[#fefefe]">
            테이블 이용수칙
          </p>
        </div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-1.5">
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 px-2 py-1.5 rounded bg-[#1f1f1f]">
            <p className="flex-grow w-[287px] text-[13px] text-left text-[#fefefe]">
              1. 사용한 자리는 깨끗하게 정리해주세요.
            </p>
          </div>
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 px-2 py-1.5 rounded bg-[#1f1f1f]">
            <p className="flex-grow w-[287px] text-[13px] text-left text-[#fefefe]">
              2. 다음 이용자를 위해 시간이 끝나면 자리를 비워주세요.
            </p>
          </div>
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 px-2 py-1.5 rounded bg-[#1f1f1f]">
            <p className="flex-grow w-[287px] text-[13px] text-left text-[#fefefe]">
              <span className="flex-grow w-[287px] text-[13px] text-left text-[#fefefe]">
                3. 자리를 떠나기 전에 이용 시간이 남아있다면,
              </span>
              <br />
              <span className="flex-grow w-[287px] text-[13px] text-left text-[#fefefe]">
                {`'네트워킹 중단'`}를 눌러주세요.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableUsageRules;
