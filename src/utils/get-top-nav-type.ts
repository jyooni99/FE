const routes = [
  { path: '/home', type: 'quick-network' },
  { path: '/create-group', type: 'default', title: '그룹 만들기' },
  { path: '/chat', type: 'chat-room' },
  { path: '/notifications', type: 'default', title: '알림' },
  { path: '/mypage', type: 'default', title: '마이페이지' },
  { path: '/user-info', type: 'user-info' },
  { path: '/modify-profile', type: 'modify-profile' },
  { path: '/mypage/name-card-list', type: 'name-card-list' },
];

export function getTopNavType(pathname: string) {
  // name-card-list가 제대로 된 type에 정렬되기 위해 긴 순서부터 우선순위를 둚
  const sortedRoutes = [...routes].sort(
    (a, b) => b.path.length - a.path.length,
  );
  // path 경로가 완전히 일치해야만 루트를 이동했던 것에서 startswith로 동적 경로 이동에도 top-nav 사용 가능
  const findRoute = sortedRoutes.find((route) =>
    pathname.startsWith(route.path),
  );
  return {
    type: findRoute?.type,
    title: findRoute?.title,
  };
}
