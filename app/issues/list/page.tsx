import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const statuses = Object.values(Status);
  const awaitedSearchParams = await searchParams;
  const { status: awaitedStatus } = await searchParams;
  const status = statuses.includes(awaitedStatus) ? awaitedStatus : undefined;

  const where = { status };

  const orderBy = columnNames.includes(awaitedSearchParams.orderBy)
    ? { [awaitedSearchParams.orderBy]: "asc" }
    : undefined;

  const page = +awaitedSearchParams.page || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={awaitedSearchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default IssuesPage;
