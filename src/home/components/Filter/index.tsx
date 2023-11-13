import { Filter, StarredOptions, TypeOptions } from "../../types";
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
        <option value="all">Star: All</option>
        <option value="starred">Star: Starred</option>
        <option value="not-starred">Star: Not starred</option>
      </select>
      <select
        data-testid="type-select"
        className={styles["type-select"]}
        onChange={(e) =>
          whenFilterChange({ ...filter, type: e.target.value as TypeOptions })
        }
      >
        <option value="all">Category: All</option>
        <option value="text">Category: Text</option>
        <option value="visualization">Category: Visualization</option>
        <option value="map">Category: Text</option>
      </select>
    </div>
  );
};
