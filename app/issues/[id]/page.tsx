import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const IssueDetailPage = async (props: Props) => {
  const params = await props.params;

  // If introduced id is not a number
  if (!+params.id) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="0.5rem">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex direction="column" gap="3">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
