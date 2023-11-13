import { FetchComponent } from "../../../common/components/FetchComponent";
import { useFetch } from "../../../common/hooks/useFetch";
import { Dashboard, DashboardItem } from "../../types";
import { DashboardItemComponent } from "../DashboardItem";
import styles from "./style.module.css";

/**
 * A component that displays the dashboard items.
 * @param id The dashboard id.
 * @returns The dashboard items component.
 */
export function DashboardItems({ id }: { id: string }) {
  // Does the fetch for the dashboard items
  const {
    data: dashboard,
    loading,
    error,
  } = useFetch<Dashboard>({
    url: `${id}.json`,
    memo: id,
  });

  return (
    <>
      <FetchComponent loading={loading} error={error}>
        <div className={styles.wrapper} data-testid="dashboard-item">
          {dashboard.dashboardItems &&
            dashboard.dashboardItems.map((item: DashboardItem, i) => (
              <article key={item.id}>
                <DashboardItemComponent item={item} />
                {i !== dashboard.dashboardItems.length - 1 && <hr />}
              </article>
            ))}
        </div>
      </FetchComponent>
    </>
  );
}
