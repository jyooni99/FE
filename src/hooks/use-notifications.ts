// import { useEffect } from 'react';
// import useNotifyStore from '~/stores/use-notify-store';
// import { mockUserData } from '~/components/mypage/mock-user-data'; // ✅ 유저 데이터 가져오기

// // ✅ 특정 id의 유저 정보를 가져오는 함수
// const getUserById = (id: number) => mockUserData.find((user) => user.id === id);

// const useNotifications = () => {
//   const { getMessage, setNotifyStatus } = useNotifyStore();

//   useEffect(() => {
//     // ✅ 요청자(requester)와 수신자(receiver)를 `mockUserData`에서 가져오기
//     const requester1 = getUserById(123); // UX디자이너_123
//     const receiver1 = getUserById(456); // 김영희
//     const requester2 = getUserById(789); // 박철수
//     const receiver2 = getUserById(1011); // UX디자이너_123

//     if (requester1 && receiver1) {
//       setNotifyStatus(
//         '1',
//         'request',
//         {
//           id: requester1.id,
//           name: requester1.name,
//           email: requester1.email,
//           position: requester1.position,
//           joinedAt: requester1.joinedAt,
//           interest: requester1.interest, // ✅ 배열 전달
//           purpose: requester1.purpose, // ✅ 배열 전달
//         },
//         {
//           id: receiver1.id,
//           name: receiver1.name,
//           email: receiver1.email,
//           position: receiver1.position,
//           joinedAt: receiver1.joinedAt,
//         },
//         22,
//         '1to1',
//       );
//     }

//     if (requester2 && receiver2) {
//       setNotifyStatus(
//         '2',
//         'request',
//         {
//           id: requester2.id,
//           name: requester2.name,
//           email: requester2.email,
//           position: requester2.position,
//           joinedAt: requester2.joinedAt,
//           interest: requester2.interest, // ✅ 배열 전달
//           purpose: requester2.purpose, // ✅ 배열 전달
//         },
//         {
//           id: receiver2.id,
//           name: receiver2.name,
//           email: receiver2.email,
//           position: receiver2.position,
//           joinedAt: receiver2.joinedAt,
//         },
//         33,
//         '1to1',
//       );
//     }
//   }, [setNotifyStatus]);

//   return getMessage();
// };

// export default useNotifications;
