export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-gray-50">
      <div className="">{children}</div>
    </div>
  );
}
