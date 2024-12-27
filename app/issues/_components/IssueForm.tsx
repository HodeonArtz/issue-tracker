"use client";

import { ErrorMessage } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue /* , Status  */ } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

/* const statusMap: Record<Status, { label: string }> = {
  OPEN: { label: "Open" },
  IN_PROGRESS: { label: "In Progress" },
  CLOSED: { label: "Closed" },
}; */

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    defaultValues: {
      description: issue?.description,
    },
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");
  const [description, setDescription] = useState(issue?.description);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError(`An unexpected error ocurred`);
    }
  });

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
      <form className=" space-y-3" onSubmit={onSubmit} data-color-mode="light">
        <TextField.Root
          placeholder="Title*"
          defaultValue={issue?.title}
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <MDEditor
          textareaProps={{ placeholder: "Description*" }}
          value={description}
          onChange={(value) => {
            setDescription(value || "");
            setValue("description", value || "");
          }}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {/* Implement select */}

        <Button disabled={isSubmitting}>
          {issue ? "Edit" : "Submit New"} Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
