import { DashboardCollection, DashboardSummary } from "../types";
import { addId, removeId } from "../utils/localStorageLogic";

/**
 * A custom hook that handles starring/unstarring of dashboards.
 *
 * @param posts - The collection of dashboards.
 * @param setDashboards - A function to update the collection of dashboards.
 * @returns An object containing the `handleStarred` function to toggle the starred status of a dashboard.
 */
export const useStar = (
  posts: DashboardCollection,
  setDashboards: (value: DashboardCollection) => void
) => {
  function handleStarred(id: string) {
    setDashboards({
      ...posts,
      dashboards: posts.dashboards.map((post: DashboardSummary) => {
        if (post.id === id) {
          if (post.starred) {
            removeId(id);
          } else {
            addId(id);
          }
          return {
            ...post,
            starred: !post.starred,
          };
        }

        return post;
      }),
    });
  }

  return { handleStarred };
};
