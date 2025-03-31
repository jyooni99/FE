'use client';

import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://3.37.80.119:80/chats/private-chatroom'; // 실제 API 주소로 설정

interface ChatRoom {
  id: string;
  name: string;
  // 기타 필요한 속성들...
}

const TestAPIRequest = () => {
  const [responseData, setResponseData] = useState<ChatRoom[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchChatRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API 요청 성공:', response.data);
      setResponseData(response.data); // 응답 데이터를 상태에 저장
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('서버 응답 오류:', err.response);
          setError(`API 요청 실패: ${err.response.statusText}`);
        } else if (err.request) {
          console.error('네트워크 오류:', err.request);
          setError('네트워크 오류가 발생했습니다.');
        } else {
          console.error('요청 설정 오류:', err.message);
          setError('요청 설정 오류가 발생했습니다.');
        }
      } else {
        console.error('알 수 없는 오류:', err);
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="text-white">
      <h1>API 요청 테스트</h1>
      <button onClick={fetchChatRooms} disabled={loading}>
        {loading ? '요청 중...' : 'API 요청 테스트 버튼'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {responseData ? (
        <div>
          <h2>응답 데이터:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      ) : (
        !loading && (
          <p>응답이 아직 없습니다. 버튼을 눌러 API 요청을 해주세요.</p>
        )
      )}
    </div>
  );
};

export default TestAPIRequest;
