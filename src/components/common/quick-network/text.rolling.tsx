import React, { useState, useEffect } from 'react';
import api from '~/utils/api/api';

const TextRolling = () => {
  const [interestJobCategory, setInterestJobCategory] =
    useState<string>('정보 없음');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await api.get('/api/users/mypage', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data && typeof response.data === 'object') {
          setInterestJobCategory(
            response.data.interestJobCategory || '정보 없음',
          );
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 2);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const texts = [
    <>
      <span className="text-white">[</span>
      <span className="text-[#07ca7f]">{interestJobCategory}</span>
      <span className="text-white">]에 관심있는 참여자가 [</span>
      <span className="text-[#ff6f22]">321</span>
      <span className="text-white">]명 있어요</span>
    </>,
    <>
      <span className="text-white">내가 관심 있는 [</span>
      <span className="text-[#07ca7f]">{interestJobCategory}</span>
      <span className="text-white">] 참여자가 [</span>
      <span className="text-[#ff6f22]">321</span>
      <span className="text-white">] 명 있어요</span>
    </>,
  ];

  return (
    <div className="h-[72px] overflow-hidden">
      <div
        className="transition-all duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 56}px)` }}
      >
        {texts.map((text, index) => (
          <div
            key={index}
            className="h-[56px] flex items-center justify-center"
          >
            <p className="text-lg font-semibold">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextRolling;
