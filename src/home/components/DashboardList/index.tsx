import { useState, memo } from "react";
import { FetchComponent } from "../../../common/components/FetchComponent";
import { useFetch } from "../../../common/hooks/useFetch";
import { DashboardCollection, DashboardSummary } from "../../types";
import { DashboardItems } from "../DashboardItems";
import { DashboardFilters } from "../Filter";
import { useFilter } from "../../hooks/useFilter";
import { useStar } from "../../hooks/useStar";
import { onLoadDashboards } from "../../utils/localStorageLogic";
import styles from "./style.module.css";

// Memoized DashboardItems component
const MemoizedDashboardItems = memo(DashboardItems);

/**
 * A component that displays the dashboard list.
 */
export function DashboardListComponent() {
  // Does the fetch for the dashboards
  const {
    data: posts,
    setData: setDashboards,
    loading,
    error,
  } = useFetch<DashboardCollection>({
    url: "dashboards.json",
    whenLoad: onLoadDashboards,
  });
  // Handles the starred logic
  const { handleStarred } = useStar(posts, setDashboards);
  // Handles the filter logic
  const { dashboards, setFilter, filter } = useFilter(posts);
  // Handles the selected dashboard logic
  const [selectedDashboardId, setSelectedDashboardId] = useState("");

  return (
    <main className={styles.main}>
      {/* The filter component */}
      <DashboardFilters filter={filter} whenFilterChange={setFilter} />
      {/* The dashboard list */}
      <FetchComponent loading={loading} error={error}>
        <div className={styles.wrapper} data-testid="dashboard-list">
          {dashboards.length !== 0 &&
            dashboards.map((post: DashboardSummary) => (
              <article
                key={post.id}
                className={styles["dashboard-wrapper"]}
                data-testid="dashboard-wrapper"
              >
                {/* The dashboard summary */}
                <DashboardSummaryComponent
                  dashboard={post}
                  whenClick={() => setSelectedDashboardId(post.id)}
                  whenClickStar={() => handleStarred(post.id)}
                />
                {/* The dashboard items */}
                {selectedDashboardId === post.id && (
                  <MemoizedDashboardItems id={post.id} />
                )}
              </article>
            ))}
        </div>
      </FetchComponent>
    </main>
  );
}

/**
 * A component that displays a star.
 * @param starred Whether the star is marked or not.
 * @param whenClick The function to be called when the star is clicked.
 * @returns A component that displays a star.
 */
const Star = ({
  starred,
  whenClick,
}: {
  starred: boolean;
  whenClick: () => void;
}) => {
  return (
    <p
      onClick={(e) => {
        e.stopPropagation();
        whenClick();
      }}
    >
      {starred ? (
        <img
          src="/icons/marked-star.svg"
          alt="Marked Star icon"
          data-testid="marked-star"
        ></img>
      ) : (
        <img src="/icons/star.svg" alt="Star icon" data-testid="star"></img>
      )}
    </p>
  );
};

/**
 * A component that displays a dashboard summary.
 * @param dashboard The dashboard summary to be displayed.
 * @param whenClick The function to be called when the dashboard summary is clicked.
 * @param whenClickStar The function to be called when the star is clicked.
 * @returns A component that displays a dashboard summary.
 */
const DashboardSummaryComponent = ({
  dashboard,
  whenClick,
  whenClickStar,
}: {
  dashboard: DashboardSummary;
  whenClick: () => void;
  whenClickStar: () => void;
}) => {
  return (
    <div
      onClick={() => {
        whenClick();
      }}
      className={styles["dashboard-summary"]}
      data-testid="dashboard-summary"
    >
      <h1>{dashboard.displayName}</h1>
      <Star starred={dashboard.starred} whenClick={() => whenClickStar()} />
    </div>
  );
};
