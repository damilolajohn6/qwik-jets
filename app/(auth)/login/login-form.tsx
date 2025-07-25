"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plane } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"), 
  password: z.string().min(6, "Password must be at least 6 characters"), 
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); 
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), 
  });

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      let errorMessage = "Failed to sign in. Please try again.";
      switch (error) {
        case "CredentialsSignin":
          errorMessage = "Invalid email or password";
          break;
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
          errorMessage = "Failed to sign in with Google. Please try again.";
          break;
        case "SessionRequired":
          errorMessage = "You must be signed in to access this page.";
          break;
        default:
          errorMessage = `Authentication error: ${error}`;
      }
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive", 
      });
    }
  }, [searchParams, toast]); 

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true); 

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, 
        callbackUrl: searchParams.get("callbackUrl") || "/dashboard",
      });

      if (result?.error) {
        toast({
          title: "Error",
          description:
            result.error === "CredentialsSignin"
              ? "Invalid email or password"
              : `Authentication error: ${result.error}`,
          variant: "destructive",
        });
      } else if (result?.url) {
        router.push(result.url);
        router.refresh();
      } else {
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); 
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true); 
    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
      await signIn("google", { callbackUrl });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Plane className="h-10 w-10 text-primary" /> 
        </div>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading} 
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
          ) : (
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          Continue with Google
        </Button>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Email/Password Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")} 
              disabled={isLoading || isGoogleLoading} 
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p> 
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")} 
              disabled={isLoading || isGoogleLoading} 
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p> 
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
