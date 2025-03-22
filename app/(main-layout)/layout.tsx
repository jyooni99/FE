import TopNavigation from '~/components/common/top-nav';
import BottomNavigation from '~/components/common/bottom-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-neutral-900 h-screen">
      <TopNavigation />
      {children}
      <BottomNavigation />
    </div>
  );
}
