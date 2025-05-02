"use client";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormEvent, useRef } from "react";
import Button from "@/components/ui/Button";
import createNotification from "@/utils/createNotification";
import { RootDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/redux/slices/userSlice";

const SignupPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<RootDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.user);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      createNotification({ type: "error", message: "All fields are required" });
      return;
    }

    try {
      await dispatch(signUpUser({ username, password })).unwrap();
      createNotification({
        type: "success",
        message: "Account created successfully!",
      });
    } catch (error: unknown) {
      createNotification({ type: "error", message: error as string });
    }
  }

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
          label={isLoading ? "Creating account..." : "Create an account"}
          type={"submit"}
          disabled={isLoading}
        />
      </Form>
    </main>
  );
};

export default SignupPage;