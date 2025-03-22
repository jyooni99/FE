import React, { useState, useEffect } from 'react';

interface TableRemainingTimeProps {
  initialMinutes: number;
  initialSeconds: number;
}

const TableRemainingTime: React.FC<TableRemainingTimeProps> = ({
  initialMinutes,
  initialSeconds,
}) => {
  const [timeLeft, setTimeLeft] = useState(
    initialMinutes * 60 + initialSeconds,
  );
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.max(Math.floor(timeLeft / 60), 0);
  const seconds = Math.max(timeLeft % 60, 0);

  return (
    <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[142px] gap-3.5">
      <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-1">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
            <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative bg-[#02e473]/25">
              <div className="w-5 h-5 absolute left-px top-px rounded-sm border border-[#02e473]/70 border-dashed"></div>
            </div>
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#fefefe]">
            {isFinished ? '네트워킹이 종료되었어요' : '테이블 잔여 시간'}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[91px] relative">
        <p
          className={`flex-grow-0 flex-shrink-0 text-[32px] font-semibold text-center ${isFinished ? 'text-[#858585]' : 'text-[#ff6f22]'}`}
        >
          {minutes.toString().padStart(2, '0')}
        </p>
        <p
          className={`flex-grow-0 flex-shrink-0 text-[32px] font-semibold text-center ${isFinished ? 'text-[#858585]' : 'text-[#ff6f22]'}`}
        >
          :
        </p>
        <p
          className={`flex-grow-0 flex-shrink-0 text-[32px] font-semibold text-center ${isFinished ? 'text-[#858585]' : 'text-[#ff6f22]'}`}
        >
          {seconds.toString().padStart(2, '0')}
        </p>
      </div>
    </div>
  );
};

export default TableRemainingTime;
