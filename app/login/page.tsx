"use client";
import { FormEvent, useEffect, useRef } from "react";
import createNotification from "@/utils/createNotification";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { logInUser } from "@/redux/slices/userSlice";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<RootDispatch>();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      createNotification({ type: "error", message: "All fields are required" });
      return;
    }

    try {
      const response = await dispatch(
        logInUser({ username, password }),
      ).unwrap();
      const { notification } = response;
      createNotification(notification);

      usernameRef.current!.value = "";
      passwordRef.current!.value = "";

      router.push("/library");
    } catch (error: unknown) {
      createNotification({ type: "error", message: error as string });
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/library");
    }
  }, [isAuthenticated, router]);

  return (
    <main className={"w-full flex flex-col justify-start items-center gap-4"}>
      <Form onSubmit={handleSubmit}>
        <Input
          label={"Username"}
          id={"username"}
          type={"text"}
          required={true}
          minLength={3}
          ref={usernameRef}
          disabled={isLoading}
        />
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          required={true}
          minLength={3}
          ref={passwordRef}
          disabled={isLoading}
        />
        <Button
          label={isLoading ? "Logging in..." : "Log In"}
          type={"submit"}
          disabled={isLoading}
        />
      </Form>
    </main>
  );
};

export default LoginPage;

