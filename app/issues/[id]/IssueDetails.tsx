import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import MarkdownPreview from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>

      <Flex align="center" gap="1rem" className="mb-4">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toUTCString()}</Text>
      </Flex>

      <Card className="prose pt-4">
        <MarkdownPreview>{issue.description}</MarkdownPreview>
      </Card>
    </>
  );
};

export default IssueDetails;
