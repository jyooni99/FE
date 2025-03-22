'use client';
import React from 'react';
import { Card, CardBody } from '~/components/common/card';
import DefaultProfile from '~/components/common/default-profile';
import { mockUserData } from '~/components/mypage/mock-user-data';
import Button from '~/components/common/button';
import CardBasic from '~/components/common/card-basic';

const Page = () => {
  const downloadHandler = () => {
    console.log('다운로드 클릭됨');
  };
  return (
    <div className="relative m-auto w-full text-body-lg max-w-2xl flex flex-col justify-center items-center gap-4 mt-2 !px-5 overflow-x-hidden">
      <div className="w-full">
        {/* ⬇️  바로 밑에 div는 map으로 내가 저장한 카드 프린트... 명함 누르면 모달 열려야 함 (모달 수정 작업 먼저 필요)*/}
        <div className="flex gap-2 flex-col">
          {mockUserData.map((user) => (
            <Card key={user.id}>
              <CardBody className="flex gap-[10px] p-[10px]">
                <DefaultProfile size="nameCard" />
                {/* <DefaultProfile imgSrc={user.profileImage}/> */}
                <div className="flex flex-col items-start justify-center gap-[6px]">
                  <CardBasic userId={user.nickName} />
                  <div className="flex items-center gap-2 text-body-sm text-[#b0b0b0]">
                    <p>{user.jobValue}</p>
                    <div className="w-px h-3 bg-[#b0b0b0]" />
                    <p>{user.affiliation}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-full fixed bottom-28 px-5">
        <Button size="full" variant="green" onSubmit={downloadHandler}>
          명함 전체 다운로드
        </Button>
      </div>
    </div>
  );
};

export default Page;
