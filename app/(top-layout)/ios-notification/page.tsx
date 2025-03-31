'use client';

import Image from 'next/image';
import React from 'react';
import Share from '~/assets/svgs/share.svg';

import mockup from '~/assets/image/mockup.png';
import mockup2 from '~/assets/image/mockup-2.png';

const page = () => {
  return (
    <div>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2 px-5 pt-5 pb-8">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[335px] text-lg font-semibold text-left text-[#fefefe]">
          이용 전 필수 설정 안내
        </p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[335px] text-sm text-left text-[#ff9257]">
          ⚠ 네트워킹 서비스의 원활한 이용(네트워킹 수락 여부, 테이블 배정
          알림)을 위해 홈 화면 추가가 필요해요.
        </p>
        <div className="flex w-full justify-around px-5 pt-5">
          <Image src={mockup} alt="목업" width={135} height={279} />
          <Image src={mockup2} alt="목업2" width={135} height={279} />
        </div>
      </div>
      <div className="px-5">
        <div>이미지 가이드 첨부</div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 px-3.5 py-4 rounded-lg bg-[#424242]">
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#fefefe]">
                화면의
              </p>
              <Share />
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#fefefe]">
                버튼을 눌러주세요.
              </p>
            </div>
            <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#a6a6a6]">
              *Safari는 화면 하단, Chrome은 화면 상단에서 확인 가능해요.
            </p>
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#fefefe]">
            {`리스트에서 '홈 화면에 추가' 버튼을 눌러주세요.`}
          </p>
          <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#fefefe]">
            홈 화면에 생성된 아이콘을 눌러 서비스를 이용해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
