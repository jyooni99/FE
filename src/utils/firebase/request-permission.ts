export async function requestPermission() {
  try {
    if (Notification.permission === 'granted') {
      console.log('이미 알림 권한이 허용됨');
      return true;
    }

    if (Notification.permission === 'denied') {
      console.log('알림 권한이 거부됨');
      return false;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('알림 권한 허용');
      return true;
    } else {
      console.log('알림 권한 허용 안 됨');
      return false;
    }
  } catch (error) {
    console.error('알림 권한 에러:', error);
    return false;
  }
}
