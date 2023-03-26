export const config = {
  graphUrl: process.env.NEXT_PUBLIC_GRAPH_URL || "",
  globalMilestone: Number(process.env.NEXT_PUBLIC_GLOBAL_MILESTONE || 6 * 10 ** 9),
  pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 100),
};
