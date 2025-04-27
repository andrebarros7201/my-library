"use client";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { FormEvent } from "react";

const SignupPage = () => {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
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
        />
        <Input
          label={"Password"}
          id={"password"}
          type={"password"}
          required={true}
          minLength={3}
        />
      </Form>
    </main>
  );
};

export default SignupPage;