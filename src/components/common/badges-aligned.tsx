interface BadgesAlignedProps {
  items: string[];
  title?: string;
  vertical?: boolean;
  className?: string;
  noneChip?: boolean;
}

const BadgesAligned = ({
  items,
  title,
  vertical,
  className,
  noneChip,
}: BadgesAlignedProps) => {
  return (
    <div
      className={`gap-3 flex flex-col bg-[#333333] pb-0.5 rounded-xl ${className}`}
    >
      {title && (
        <div className="text-white text-body-md font-medium"> {title} </div>
      )}
      <div
        className={`flex ${vertical ? 'flex-col' : 'flex-row gap-2'} flex-wrap `}
      >
        <p
          className={`w-fit px-2 text-body-sm rounded-md text-white ${noneChip ? 'bg-transparent text-orange-500 py-1' : 'bg-gray-neutral-600'}`}
        >
          {items.length > 19 ? `${items.slice(0, 19)}...` : items}
        </p>
      </div>
    </div>
  );
};

export default BadgesAligned;
