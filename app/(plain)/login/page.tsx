'use client';
import LoginForm from '~/components/login-form';

const Page = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen px-6 justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default Page;
