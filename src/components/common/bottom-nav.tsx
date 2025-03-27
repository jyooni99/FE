'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Home from '~/assets/svgs/home_filled.svg';
import User from '~/assets/svgs/user_filled.svg';
import Notifications from '~/assets/svgs/notification_filled.svg';

interface BottomNavLinkProps {
  to: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 max-w-3xl flex justify-around bg-black h-[92px] w-screen rounded-t-xl">
      <BottomNavLink to="/home" icon={Home} />
      <BottomNavLink to="/notifications" icon={Notifications} />
      <BottomNavLink to="/mypage" icon={User} />
    </nav>
  );
};

const BottomNavLink = ({ to, icon: Icon }: BottomNavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <Icon width={32} height={32} fill={isActive ? '#10B981' : '#5C5C5C'} />
    </Link>
  );
};

export default BottomNavigation;
