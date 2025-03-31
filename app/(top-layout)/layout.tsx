import { Suspense } from 'react';
import TopNavigation from '~/components/common/top-nav';

export default function TopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense>
        <TopNavigation />
      </Suspense>
      <div className="w-full pt-[55px] h-dvh overflow-y-auto">{children}</div>
    </div>
  );
}
