import Image from 'next/image';
import React from 'react';

interface CardBasicProps {
  userId: string;
}

const CardBasic = ({ userId }: CardBasicProps) => {
  return (
    <div className="flex items-center justify-start">
      <p className="text-body-lg">{userId}</p>
      <Image
        src="/assets/svgs/arrow.svg"
        alt="BackArrow Icon"
        width={24}
        height={24}
      />
    </div>
  );
};

export default CardBasic;
