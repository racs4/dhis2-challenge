import { FetchComponent } from "../../../common/components/FetchComponent";
import { useFetch } from "../../../common/hooks/useFetch";
import { useFilterDashboards } from "../../hooks/useFilter";
import { Dashboard, DashboardItem, Filter } from "../../types";
import { DashboardItemComponent } from "../DashboardItem";
import styles from "./style.module.css";

type DashboardItemsProps = {
  id: string;
  filter: Filter;
};

/**
 * A component that displays the dashboard items.
 * @param id The dashboard id.
 * @returns The dashboard items component.
 */
export function DashboardItems({ id, filter }: DashboardItemsProps) {
  // Does the fetch for the dashboard items
  const {
    data: dashboard,
    loading,
    error,
  } = useFetch<Dashboard>({
    url: `${id}.json`,
    memo: id,
  });

  const { dashboardItems } = useFilterDashboards(dashboard, filter);

  return (
    <>
      <FetchComponent loading={loading} error={error}>
        <div className={styles.wrapper} data-testid="dashboard-item">
          {dashboardItems &&
            dashboardItems.length > 0 &&
            dashboardItems.map((item: DashboardItem, i) => (
              <article key={item.id}>
                <DashboardItemComponent item={item} />
                {i !== dashboardItems.length - 1 && <hr />}
              </article>
            ))}
          {dashboardItems && dashboardItems.length === 0 && (
            <p className={styles.noResults}>No results found</p>
          )}
        </div>
      </FetchComponent>
    </>
  );
}
