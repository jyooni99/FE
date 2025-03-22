import { cn } from '~/utils/cn';
import DefaultProfile from './default-profile';
import { cva, VariantProps } from 'class-variance-authority';
import { UserData } from '~/types/user.types';

const profileImportantVariants = cva('flex gap-2', {
  variants: {
    layout: {
      // 세로 배치: 이미지가 위, 텍스트가 아래
      vertical: 'flex-col items-center',
      // 가로 배치: 이미지와 텍스트가 한 줄
      horizontal: 'items-center gap-3',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

interface ProfileImportantProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileImportantVariants> {
  userData: UserData;
  children?: React.ReactNode;
  isTopAligned?: boolean;
}

const ProfileImportant = ({
  userData,
  layout,
  children,
  className,
  isTopAligned = false,
  ...props
}: ProfileImportantProps) => {
  return (
    <div
      className={cn(profileImportantVariants({ layout }), className)}
      {...props}
    >
      {/* 프로필 이미지 */}
      <DefaultProfile
        size="profileChat"
        className={isTopAligned ? 'mt-[-12px]' : ''}
      />

      {/* 텍스트 영역 */}
      <div
        className={`flex flex-col ${layout == 'vertical' ? 'gap-2' : 'gap-1'} `}
      >
        <h3
          className={cn(
            'font-bold text-body-md',
            layout === 'vertical' ? 'text-center' : 'text-left',
          )}
        >
          {userData.name}
        </h3>
        <div className="flex items-center gap-2 text-body-sm text-[#b0b0b0]">
          <p>{userData.position}</p>
          <div className="w-px h-4" />
          <p>{userData.joinedAt}</p>
        </div>

        {/* children 영역에 태그나 추가 정보 등을 넣을 수 있음 */}
        {children && (
          <div className="flex flex-wrap gap-2 pt-1">{children}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileImportant;
