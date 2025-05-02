"use client";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormEvent, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import createNotification from "@/utils/createNotification";
import { RootDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearError, signUpUser } from "@/redux/slices/userSlice";

const SignupPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<RootDispatch>();
  const { error, isLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      createNotification({ type: "error", message: error });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      createNotification({ type: "error", message: "All fields are required" });
      return;
    }

    dispatch(signUpUser({ username, password }));
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