import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import MarkdownPreview from "react-markdown";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const IssueDetailPage = async (props: Props) => {
  const params = await props.params;

  // If introduce id is not a number
  if (!+params.id) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="0.5rem">
      <Box>
        <Heading>{issue.title}</Heading>

        <Flex align="center" gap="1rem" className="mb-4">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toUTCString()}</Text>
        </Flex>

        <Card className="prose pt-4">
          <MarkdownPreview>{issue.description}</MarkdownPreview>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil1Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
