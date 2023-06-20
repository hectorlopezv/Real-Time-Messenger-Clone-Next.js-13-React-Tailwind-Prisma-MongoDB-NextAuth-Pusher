"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
type Props = {};
type Variant = "LOGIN" | "REGISTER";

export default function AuthForm({}: Props) {
  const [variant, setVariant] = useState<Variant>("REGISTER");
  const [isLoading, setisLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);

    //sign user
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Account created");
          signIn("credentials", data);
        })
        .catch(() => {
          toast.error("something went wrong");
        })
        .finally(() => {
          setisLoading(false);
        });
    }

    //next auth signin
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("something went wrong");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Welcome back");
          }
        })
        .finally(() => {
          setisLoading(false);
        });
    }
  };
  const socialAction = (action: string) => {
    setisLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged In");
          router.push("/users");
        }
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const toogleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session, router]);
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" ? (
            <Input
              label="Name"
              register={register}
              id="name"
              errors={errors}
              disabled={isLoading}
            />
          ) : null}
          <Input
            label="Email"
            register={register}
            type="email"
            id="email"
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            type="password"
            register={register}
            id="password"
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toogleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
}
