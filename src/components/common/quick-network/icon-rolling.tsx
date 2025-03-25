'use client';

import { useEffect, useRef, useState } from 'react';
import BirdIcon from './welcome-icon/bird';
import CatIcon from './welcome-icon/cat';
import DogIcon from './welcome-icon/dog';
import JellyFishIcon from './welcome-icon/jelly-fish';
import KoalaIcon from './welcome-icon/koala';
import MonkeyIcon from './welcome-icon/monkey';
import OtterIcon from './welcome-icon/otter';
import QuokkaIcon from './welcome-icon/quokka';
import RabbitIcon from './welcome-icon/rabbit';
import SnailIcon from './welcome-icon/snail';
import SnowmanIcon from './welcome-icon/snowman';
import WhaleIcon from './welcome-icon/whale';

const icons = [
  BirdIcon,
  CatIcon,
  DogIcon,
  JellyFishIcon,
  KoalaIcon,
  MonkeyIcon,
  OtterIcon,
  QuokkaIcon,
  RabbitIcon,
  SnailIcon,
  SnowmanIcon,
  WhaleIcon,
];

const IconRolling = () => {
  const [iconColors, setIconColors] = useState<string[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // tailwind.config로 다시 불러와야함
  const colors = [
    '#30B6FD', // Blue
    '#1EDC93', // Green
    '#FF9257', // Orange
    '#FF84EF', // Pink
    '#856BFF', // Purple
    '#FE7777', // Red
    '#FFFFFF', // White
    '#FFF280', // Yellow
  ];

  // 랜덤 색상 생성
  useEffect(() => {
    setIconColors(
      Array(icons.length)
        .fill(null)
        .map(() => colors[Math.floor(Math.random() * colors.length)]),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[92px] overflow-hidden">
      <div
        ref={trackRef}
        className="absolute whitespace-nowrap flex h-full animate-marquee"
      >
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            ref={contentRef}
            className="flex gap-0 h-full pr-[1px]"
          >
            {icons.map((Icon, iconIndex) => (
              <div
                key={`${index}-${iconIndex}`}
                className="w-[80px] h-[80px] relative mx-[6px] flex items-center justify-center"
              >
                <Icon
                  width={80}
                  height={80}
                  className="fill-current"
                  style={{
                    fill: iconColors[iconIndex], // fill 속성 사용
                    color: iconColors[iconIndex], // 현재 색상 상속
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconRolling;
