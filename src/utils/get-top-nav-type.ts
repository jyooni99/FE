const routes = [
  { path: '/home', type: 'quick-network' },
  { path: '/create-group', type: 'default', title: '그룹 만들기' },
  { path: '/chat', type: 'chat-room' },
  { path: '/notifications', type: 'default', title: '알림' },
  { path: '/mypage', type: 'default', title: '마이페이지' },
  { path: '/mypage/edit-profile', type: 'back-arrow', title: '내 정보 수정' },
  {
    path: '/mypage/name-card-list',
    type: 'back-arrow',
    title: '저장한 명함 목록',
  },
];

export function getTopNavType(pathname: string) {
  const findRoute = routes.find((route) => pathname === route.path);
  return {
    type: findRoute?.type,
    title: findRoute?.title,
  };
}
