import { DashboardCollection, DashboardSummary } from "../types";

/**
 * Adds an ID to the starred and removes from notStarred list in local storage.
 * @param id - The ID to add.
 */
export function addId(id: string) {
  const starred = localStorage.getItem("starred");
  const alreadyStarred = starred && starred.includes(id);
  if (alreadyStarred) {
    return;
  }
  const notStarred = localStorage.getItem("notStarred");
  localStorage.setItem("starred", starred ? starred + id + "," : id + ",");
  localStorage.setItem(
    "notStarred",
    notStarred ? notStarred.replace(id + ",", "") : ""
  );
}

/**
 * Removes an ID from the starred and adds it to the notStarred lists in local storage.
 * @param id - The ID to remove.
 */
export function removeId(id: string) {
  const starred = localStorage.getItem("starred");
  localStorage.setItem("starred", starred ? starred.replace(id + ",", "") : "");
  const notStarred = localStorage.getItem("notStarred");
  const alreadyNotStarred = notStarred && notStarred.includes(id);
  if (alreadyNotStarred) {
    return;
  }
  localStorage.setItem(
    "notStarred",
    notStarred ? notStarred + id + "," : id + ","
  );
}

/**
 * Loads the starred/not starred status for each dashboard from local storage.
 * @param posts - The dashboard collection to load the status for.
 */
export function onLoadDashboards(
  posts: DashboardCollection
): DashboardCollection {
  const starred = localStorage.getItem("starred");
  const notStarred = localStorage.getItem("notStarred");
  if (starred || notStarred) {
    posts.dashboards = posts.dashboards.map((post: DashboardSummary) => {
      if (starred && starred.includes(post.id)) {
        return {
          ...post,
          starred: true,
        };
      }
      if (notStarred && notStarred.includes(post.id)) {
        return {
          ...post,
          starred: false,
        };
      }
      return post;
    });
  }
  return posts;
}
