import { useState, useMemo } from "react";
import {
  Dashboard,
  DashboardCollection,
  DashboardItem,
  DashboardSummary,
  Filter,
} from "../types";

/**
 * Filters a collection of dashboards based on a given filter object.
 * @param posts - The collection of dashboards to filter.
 * @param filter - The filter object to apply to the dashboards.
 * @returns An array of dashboard summaries that match the given filter.
 */
const handleFilterSummary = (
  posts: DashboardCollection,
  filter: Filter
): DashboardSummary[] => {
  // If there are no dashboards, return an empty array.
  if (!posts || !posts.dashboards) {
    return [];
  }

  const dashboards = posts.dashboards;

  // use a self-invoking function to filter dashboards by starred
  const dashboardsFilteredByStar = (function () {
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
  const dashboardsFilterdByDisplayName = dashboardsFilteredByStar.filter(
    (post: DashboardSummary) =>
      post.displayName.toLowerCase().includes(filter.displayName.toLowerCase())
  );

  return dashboardsFilterdByDisplayName;
};

function handleFilterDashboards(
  posts: Dashboard,
  filter: Filter
): DashboardItem[] {
  if (!posts || !posts.dashboardItems) {
    return [];
  }

  if (filter.type === "all") {
    return posts.dashboardItems;
  }

  return posts.dashboardItems.filter(
    (item: DashboardItem) => item.type.toLowerCase() === filter.type
  );
}

/**
 * Custom hook that filters a collection of dashboards based on a filter object.
 * @param posts The collection of dashboards to filter.
 * @returns An object containing the filtered dashboards, the current filter object, and a function to update the filter object.
 */
export const useFilterSummary = (posts: DashboardCollection) => {
  const [filter, setFilter] = useState<Filter>({
    displayName: "",
    starred: "all",
    type: "all",
  });
  const dashboards = useMemo(
    () => handleFilterSummary(posts, filter),
    [posts, filter]
  );

  return { dashboards, filter, setFilter };
};

export const useFilterDashboards = (posts: Dashboard, filter: Filter) => {
  const dashboardItems = useMemo(
    () => handleFilterDashboards(posts, filter),
    [posts, filter]
  );

  return { dashboardItems };
};
