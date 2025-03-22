import TopNavigation from '~/components/common/top-nav';

export default function TopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 모바일 모드에서는 상관 없으나 태블릿 모드로 변경시 TopNav가 왼쪽 정렬 되는 이슈 발생하여 주석 처리 해뒀음!*/}
      {/* <div className="fixed top-0 left- right-0 z-50"> */}
      <TopNavigation />
      {/* </div> */}
      {/* pt-[64px] 제거하였으나 혹시 모르니 주석으로... 올려둡니다. */}
      <div className="h-[calc(100vh-64px)] overflow-y-auto">{children}</div>
    </div>
  );
}
