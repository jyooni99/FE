// import  { GroupData } from '~/types/'
import React from 'react';

interface MatchGroupProps {
  groupData: {
    job: string[];
    career: number[];
    interest: string[];
    purpose: string[];
  };
}

const MatchGroup = ({ groupData }: MatchGroupProps) => {
  const careerLabels = ['학생', '신입', '주니어', '미드레벨', '시니어'];

  const infoList = [
    {
      title: '직무',
      text: groupData.job.join(', ') || '상관없음',
    },
    {
      title: '경력',
      text: groupData.career
        .filter((num) => num >= 1 && num <= 4) // 1~4 범위만 표시
        .map((num) => careerLabels[num] || '알 수 없음')
        .join(' ~ '),
    },
    {
      title: '관심분야',
      text: groupData.interest.join(', ') || '상관없음',
    },
    {
      title: '참여목적',
      text: groupData.purpose.join(', ') || '상관없음',
    },
  ];
  return (
    <div className="bg-gray-neutral-900 p-4 rounded-lg">
      {infoList.map((info, index) => (
        <div key={index} className="mb-3 flex justify-between">
          <div className="flex items-center gap-2">
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
