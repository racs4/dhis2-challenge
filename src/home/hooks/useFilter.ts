import { useState, useMemo } from "react";
import { DashboardCollection, DashboardSummary, Filter } from "../types";

/**
 * Filters a collection of dashboards based on a given filter object.
 * @param posts - The collection of dashboards to filter.
 * @param filter - The filter object to apply to the dashboards.
 * @returns An array of dashboard summaries that match the given filter.
 */
const handleFilter = (
  posts: DashboardCollection,
  filter: Filter
): DashboardSummary[] => {
  // If there are no dashboards, return an empty array.
  if (!posts || !posts.dashboards) {
    return [];
  }

  const dashboards = posts.dashboards;

  // use a self-invoking function to filter dashboards by starred
  const dashboardsFilterdByStar = (function () {
    if (filter.starred === "all") {
      return dashboards;
    }

    if (filter.starred === "starred") {
      return dashboards.filter((post: DashboardSummary) => post.starred);
    }

    if (filter.starred === "not-starred") {
      return dashboards.filter((post: DashboardSummary) => !post.starred);
    }

    return dashboards;
  })();

  // filter dashboards by displayName
  const dashboardsFilterdByDisplayName = dashboardsFilterdByStar.filter(
    (post: DashboardSummary) =>
      post.displayName.toLowerCase().includes(filter.displayName.toLowerCase())
  );

  return dashboardsFilterdByDisplayName;
};

/**
 * Custom hook that filters a collection of dashboards based on a filter object.
 * @param posts The collection of dashboards to filter.
 * @returns An object containing the filtered dashboards, the current filter object, and a function to update the filter object.
 */
export const useFilter = (posts: DashboardCollection) => {
  const [filter, setFilter] = useState<Filter>({
    displayName: "",
    starred: "all",
  });
  const dashboards = useMemo(
    () => handleFilter(posts, filter),
    [posts, filter]
  );

  return { dashboards, filter, setFilter };
};
