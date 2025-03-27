const routes = [
  { path: '/home', type: 'quick-network' },
  { path: '/create-group', type: 'back-arrow', title: '그룹 만들기' },
  { path: '/chat', type: 'chat-room' },
  { path: '/notifications', type: 'default', title: '알림' },
  {
    path: '/mypage/name-card-list',
    type: 'back-arrow',
    title: '저장한 명함 목록',
  },
  { path: '/mypage/edit-profile', type: 'back-arrow', title: '내 정보 수정' },
  { path: '/mypage', type: 'default', title: '마이페이지' },
  { path: '/qr-reader', type: 'back-arrow', title: '' },
  { path: '/quick-network', type: 'back-arrow', title: '' },
  { path: '/ios-notification', type: 'back-arrow', title: '' },
  {
    path: '/user-info',
    type: 'back-arrow',
    title: '사용자 프로필',
  },
];

export function getTopNavType(pathname: string) {
  const findRoute = routes.find((route) => pathname.includes(route.path));
  return {
    type: findRoute?.type,
    title: findRoute?.title,
  };
}
