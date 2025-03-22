import RadixTabs from '~/components/common/radix-tabs';
import FindIdForm from '~/components/account/find-id-form';
import FindPasswordForm from '~/components/account/find-password-form';
import Link from 'next/link';

const Page = () => {
  const tabLabels = ['아이디찾기', '비밀번호 찾기'];
  const tabContents = [
    <FindIdForm key="findIdForm" />,
    <FindPasswordForm key="findPasswordForm" />,
  ];
  return (
    <>
      <div className="flex flex-col min-h-screen items-center pt-52 w-full px-3">
        <div className="w-full">
          <RadixTabs tabLabels={tabLabels} tabContents={tabContents} />
          <div className="text-right text-xs text-neutral-400 px-6">
            <Link href="/">로그인 페이지로 가기</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
