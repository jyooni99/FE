import Arrow from '~/assets/svgs/arrow.svg';
import React from 'react';

interface CardBasicProps {
  userId?: string;
  requestedNetwork?: boolean;
}

const CardBasic = ({ userId, requestedNetwork }: CardBasicProps) => {
  return (
    <div className="flex items-center justify-start">
      <p className="text-body-lg">{userId}</p>
      {!requestedNetwork && <Arrow width={24} height={24} />}
    </div>
  );
};

export default CardBasic;
