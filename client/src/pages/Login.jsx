import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { loginUser } from "../lib/api";
import useUserStore from "../stores/useUserStore.js";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await loginUser(data);
    console.log(res);
    setUser(res);
    navigate(`/${res.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign in
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* //! emial */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    pattern:
                      "/^(?!.)(?!.*..)([a-z0-9_'+-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*.)+[a-z]{2,}$/i",
                    required: "email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 ml-5">{errors.email?.message}</p>
                )}
              </div>
              {/* //! password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "password is required",
                    minLength: 8,
                  })}
                />
                {errors.password && (
                  <p className="text-red-600 ml-5">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-fit min-w-50 text-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t">
            <p className="text-sm text-muted-foreground">
              Don't have an account?
              <Link to="/register" className="text-blue-700 hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
