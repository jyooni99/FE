import TopNavigation from '~/components/common/top-nav';
import BottomNavigation from '~/components/common/bottom-nav';
import { Suspense } from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-neutral-900 h-screen">
      <Suspense>
        <TopNavigation />
      </Suspense>
      <div className="w-full pt-[55px]">{children}</div>
      <BottomNavigation />
    </div>
  );
}
