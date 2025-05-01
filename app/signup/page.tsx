"use client";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormEvent, useRef } from "react";
import Button from "@/components/ui/Button";
import createNotification from "@/utils/createNotification";
import axios, { AxiosError } from "axios";

const SignupPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      createNotification({ type: "error", message: "All fields are required" });
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        username,
        password,
      });

      const { notification } = response.data;

      createNotification(notification);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        createNotification(notification);
      } else {
        createNotification({ type: "error", message: "An error occurred" });
      }
    }
  }
  return (
    <main className={"w-full flex flex-col justify-start items-center gap-4"}>
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <Input
          label={"Username"}
          id={"username"}
          type={"text"}
          required={true}
          minLength={3}
          ref={usernameRef}
        />
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          required={true}
          minLength={3}
          ref={passwordRef}
        />
        <Button label={"Create an account"} type={"submit"} />
      </Form>
    </main>
  );
};

export default SignupPage;