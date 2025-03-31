import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';
import { getColorByJob, getIconByJob } from '~/utils/get-profile-style';

const defaultProfileVariants = cva(
  'relative rounded-full overflow-hidden bg-gray-neutral-900',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        default: 'w-16 h-16', // 매칭 카드, 온라인 명함 저장 될 카드.....
        notification: 'h-10 w-10',
        profile: 'w-16 h-16',
        profileChat: 'h-[72px] w-[72px]',
        chatImg: 'h-8 w-8',
        groupChat: 'h-[24px] w-[24px]',
        nameCard: 'h-[48px] w-[48px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface DefaultProfileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof defaultProfileVariants> {
  jobValue?: string;
  interestJobValue?: string;
}

const DefaultProfile = ({
  size,
  className,
  jobValue = '',
}: DefaultProfileProps) => {
  const Icon = getIconByJob(jobValue);
  const color = getColorByJob(jobValue ?? '');

  if (!color) return null;
  return (
    <div className={cn(defaultProfileVariants({ size }), className)}>
      <Icon
        className="w-full h-full fill-current"
        style={{ fill: color, color }}
      />
    </div>
  );
};

export default DefaultProfile;
