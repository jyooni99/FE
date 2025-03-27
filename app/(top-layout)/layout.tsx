import TopNavigation from '~/components/common/top-nav';

export default function TopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation />
      <div className="h-[calc(100vh-55px)] overflow-y-auto">{children}</div>
    </div>
  );
}
