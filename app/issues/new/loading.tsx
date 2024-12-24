import { Box, Button, Heading, Skeleton } from "@radix-ui/themes";

const LoadingNewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Box>
        <Skeleton>
          <Heading>Title</Heading>
        </Skeleton>
      </Box>
      <Box>
        <Skeleton height="13rem" />
      </Box>
      <Skeleton className="mt-3">
        <Button>Submit New Issue</Button>
      </Skeleton>
    </div>
  );
};

export default LoadingNewIssuePage;
