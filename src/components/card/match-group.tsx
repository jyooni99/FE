import React from 'react';
import Image from 'next/image';
// import  { GroupData } from '~/types/'

interface GroupData {
  job: string[];
  career: string[];
  interest: string[];
  purpose: string[];
}

interface MatchGroupProps {
  groupData: GroupData;
}

const MatchGroup = ({ groupData }: MatchGroupProps) => {
  if (!groupData) {
    return <div className="text-gray-400">그룹 데이터가 없습니다.</div>;
  }

  const infoList = [
    {
      title: '직무',
      src: '/assets/svgs/exit-icon.svg',
      text: groupData.job[0] || '선택 안함',
    },
    {
      title: '경력',
      src: '/assets/svgs/exit-icon.svg',
      text: groupData.career[0] || '선택 안함',
    },
    {
      title: '관심분야',
      src: '/assets/svgs/exit-icon.svg',
      text: groupData.interest[0] || '선택 안함',
    },
    {
      title: '참여목적',
      src: '/assets/svgs/exit-icon.svg',
      text: groupData.purpose[0] || '선택 안함',
    },
  ];
  return (
    <div className="bg-gray-neutral-900 p-4 rounded-lg">
      {infoList.map((info, index) => (
        <div key={index} className="mb-3 flex justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={info.src} // 나중에 아이콘 확정되면...
              alt="Exit Icon"
              width={14}
              height={14}
            />
            <span className="text-white font-semibold text-body-sm">
              {info.title}
            </span>
          </div>
          <p className="text-gray-400 text-body-sm">{info.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchGroup;

// 단일인데 배열ㅇ이 들어가는 것으로 ..
/*
{
  job: [],
  career: [],
  interest: [],
  purpose: []
  }
*/
