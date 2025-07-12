import Footer from "@/components/public/footer";
import Navbar from "@/components/public/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-gray-50">
      <div className="">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
