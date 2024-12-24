import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import MarkdownPreview from "react-markdown";

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
    <Flex direction="column" gap="0.5rem">
      <Heading>{issue.title}</Heading>

      <Flex align="center" gap="1rem" className="mb-4">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toUTCString()}</Text>
      </Flex>

      <Card className="prose pt-4">
        <MarkdownPreview>{issue.description}</MarkdownPreview>
      </Card>
    </Flex>
  );
};

export default IssueDetailPage;
