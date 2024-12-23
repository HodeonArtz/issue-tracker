"use client";

import { Button, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, setValue, handleSubmit } = useForm<IssueForm>();

  const [description, setDescription] = useState("");

  useEffect(() => {
    register("description");
  }, [register]);

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
      data-color-mode="light"
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <MDEditor
        textareaProps={{ placeholder: "Description" }}
        value={description}
        onChange={(value) => {
          setDescription(value || "");
          setValue("description", value || "");
        }}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
