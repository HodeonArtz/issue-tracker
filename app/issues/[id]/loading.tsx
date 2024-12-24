import { Box, Card, Text, Flex, Heading, Skeleton } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Flex direction="column" gap="0.5rem">
      <Skeleton className="w-fit">
        <Heading>Lorem ipsum dolor sit amet</Heading>
      </Skeleton>

      <Flex align="center" gap="1rem" className="mb-4">
        <Skeleton width="2rem" height="1rem" />
        <Text>
          <Skeleton>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </Skeleton>
        </Text>
      </Flex>

      <Card className="prose pt-4">
        <Skeleton>
          <Box>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            eum, corporis debitis voluptatibus incidunt mollitia aliquid
            inventore obcaecati veniam? Ipsa reprehenderit cupiditate rem porro
            magni optio dolor repudiandae eveniet ad?
          </Box>
        </Skeleton>
      </Card>
    </Flex>
  );
};

export default LoadingIssueDetailPage;
