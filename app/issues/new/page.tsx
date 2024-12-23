"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3" data-color-mode="light">
      <TextField.Root placeholder="Title"></TextField.Root>
      <MDEditor textareaProps={{ placeholder: "Description" }} />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
