"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
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

  const [error, setError] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    register("description");
  }, [register]);

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error ocurred.");
          }
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
    </div>
  );
};

export default NewIssuePage;
