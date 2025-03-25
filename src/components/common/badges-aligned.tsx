interface BadgesAlignedProps {
  items: string[];
  title?: string;
  vertical?: boolean;
  className?: string;
  noneChip?: boolean;
  userInfoColor?: boolean;
  isInterested?: boolean;
  textSize?: string;
}

const BadgesAligned = ({
  items,
  title,
  className,
  noneChip,
  userInfoColor,
  isInterested,
  textSize,
}: BadgesAlignedProps) => {
  const isInterestSection = title === '관심사' || isInterested === true;
  const safeItems = Array.isArray(items) ? items : [items];
  return (
    <div
      className={`gap-3 flex flex-col ${
        !userInfoColor && 'pb-0.5 bg-gray-neutral-800'
      } rounded-xl ${className}`}
    >
      {title && (
        <div
          className={`text-white text-body-md font-medium ${
            userInfoColor && '!text-gray-neutral-400'
          }`}
        >
          {title}
        </div>
      )}
      <div className={`flex flex-row gap-2 flex-wrap`}>
        {isInterestSection ? (
          items.map((item, idx) => (
            <p
              key={idx}
              className={`w-fit ${
                userInfoColor && noneChip ? 'p-0' : 'p-2 bg-gray-neutral-800'
              } text-body-sm rounded-sm text-white ${
                noneChip
                  ? 'bg-transparent text-orange-500 py-1'
                  : 'bg-gray-neutral-600'
              }`}
            >
              {item}
            </p>
          ))
        ) : // title이 관심사가 아닐 경우 하나의 텍스트만 출력 (string[]이지만 첫 번째만)
        items.length > 19 ? (
          <p
            className={`w-fit ${
              userInfoColor && noneChip ? 'p-0' : 'px-2 bg-gray-neutral-800'
            } text-body-sm rounded-sm text-white ${
              noneChip
                ? 'bg-transparent text-orange-500 py-1'
                : 'bg-gray-neutral-600'
            }`}
          >
            {items.slice(0, 19).join(', ')}...
          </p>
        ) : (
          <p
            className={`w-fit ${
              userInfoColor && noneChip ? 'p-0' : 'px-2 bg-gray-neutral-800'
            } text-body-sm rounded-sm text-white ${
              noneChip
                ? 'bg-transparent !text-orange-500 py-1'
                : 'bg-gray-neutral-600'
            } ${textSize ? { textSize } : ''}`}
          >
            {safeItems.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
  // return (
  //   <div
  //     className={`gap-3 flex flex-col bg-gray-neutral-800 ${!userInfoColor && 'pb-0.5' } rounded-xl ${className}`}
  //   >
  //     {title && (
  //       <div className={`text-white text-body-md font-medium ${userInfoColor && '!text-gray-neutral-400' }`}> {title} </div>
  //     )}
  //     <div
  //       className={`flex ${vertical ? 'flex-col' : 'flex-row gap-2'} flex-wrap `}
  //     >
  //       <p
  //         className={`w-fit ${userInfoColor && noneChip ? 'p-0': 'px-2 bg-gray-neutral-800'} text-body-sm rounded-sm text-white ${noneChip ? 'bg-transparent text-orange-500 py-1' : 'bg-gray-neutral-600'}`}
  //       >
  //         {items.length > 19 ? `${items.slice(0, 19)}...` : items}
  //       </p>
  //     </div>
  //   </div>
  // );
};

export default BadgesAligned;
