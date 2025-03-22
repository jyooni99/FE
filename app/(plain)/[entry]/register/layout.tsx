export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen py-16 px-6 flex flex-col items-center">
      {children}
    </div>
  );
}
