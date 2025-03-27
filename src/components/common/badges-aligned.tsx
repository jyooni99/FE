interface BadgesAlignedProps {
  items?: string[] | string;
  title?: string;
  vertical?: boolean;
  className?: string;
  noneChip?: boolean;
  userInfoColor?: boolean;
  isInterested?: boolean;
  textSize?: string;
  textColor?: string;
}

const BadgesAligned = ({
  items,
  title,
  className,
  noneChip,
  userInfoColor,
  isInterested,
  textSize,
  textColor = 'text-orange-500',
}: BadgesAlignedProps) => {
  const isInterestSection = title === '관심사' || isInterested === true;
  const safeItems = Array.isArray(items) ? items : [items];

  const badgeClass = `${userInfoColor && noneChip ? 'p-0' : 'px-2 bg-gray-neutral-800'} ${
    noneChip ? `bg-transparent ${textColor} py-1` : 'bg-gray-neutral-600'
  } text-body-sm rounded-sm text-white ${textSize ?? ''}`;

  return (
    <div
      className={`gap-2 flex flex-col ${
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
      <div className="flex flex-row gap-2 flex-wrap">
        {isInterestSection ? (
          safeItems.map((item, idx) => (
            <p key={idx} className={badgeClass}>
              {item}
            </p>
          ))
        ) : safeItems.length > 19 ? (
          <p className={badgeClass}>{safeItems.slice(0, 19).join(', ')}...</p>
        ) : (
          <p className={badgeClass}>{safeItems.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default BadgesAligned;
