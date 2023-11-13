import { Filter, StarredOptions } from "../../types";
import styles from "./style.module.css";

export type FilterProps = {
  filter: Filter;
  whenFilterChange: (filter: Filter) => void;
};

/**
 * A component that displays the dashboard filters.
 * @param filter The current filter.
 * @param whenFilterChange The function to call when the filter changes.
 * @returns A component that displays the dashboard filters.
 */
export const DashboardFilters = ({ filter, whenFilterChange }: FilterProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        data-testid="search-input"
        placeholder="Search"
        onChange={(e) =>
          whenFilterChange({ ...filter, displayName: e.target.value })
        }
        className={styles.search}
      />
      <select
        data-testid="star-select"
        onChange={(e) =>
          whenFilterChange({
            ...filter,
            starred: e.target.value as StarredOptions,
          })
        }
        className={styles["star-select"]}
      >
        <option value="all">All</option>
        <option value="starred">Starred</option>
        <option value="not-starred">Not starred</option>
      </select>
    </div>
  );
};
