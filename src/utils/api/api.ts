import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  withCredentials: true,
});

// 응답: 401 발생 시 accessToken 갱신
api.interceptors.response.use(
  (response) => response, // 정상 응답일 때
  async (error) => {
    const config = error.config;

    // 401 에러 아니면 반환
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // refreshToken 없으면 중단
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('리프레시 토큰이 없습니다.');
      return Promise.reject(error);
    }

    try {
      const res = await api.post('/api/user/reissue', { refreshToken });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);

      // 새 accessToken으로 재요청
      config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return api(config);
    } catch (refreshError) {
      console.error('리프레시 토큰 갱신 실패, 재로그인 필요', refreshError);
      return Promise.reject(refreshError);
    }
  },
);

export default api;
