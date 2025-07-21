import { Suspense } from "react";
import LoginForm from "./login-form"; 
import { Plane } from "lucide-react";

const LoginLoadingSkeleton = () => (
  <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center space-y-4">
    <Plane className="h-10 w-10 text-primary animate-bounce" />
    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
    <div className="w-full space-y-2">
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="w-full space-y-2">
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
  </div>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<LoginLoadingSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
