/**
 * Represents a dashboard collection.
 */
export type DashboardCollection = {
  dashboards: DashboardSummary[];
};

/**
 * Represents a dashboard summary.
 */
export type DashboardSummary = {
  id: string;
  displayName: string;
  starred: boolean;
};

/**
 * Represents a dashboard.
 */
export type Dashboard = {
  id: string;
  displayName: string;
  starred: boolean;
  dashboardItems: DashboardItem[];
};

/**
 * Represents a dashboard item.
 */
export type DashboardItem =
  | DashboardItemVisualization
  | DashboardItemText
  | DashboardItemMap;

/**
 * Represents a dashboard item of type "VISUALIZATION"
 */
export type DashboardItemVisualization = {
  id: string;
  type: "VISUALIZATION";
  visualization: {
    type: string;
    name: string;
    id: string;
  };
};

/**
 * Represents a dashboard item of type "TEXT".
 */
export type DashboardItemText = {
  id: string;
  type: "TEXT";
  text: string;
};

/**
 * Represents a dashboard item of type "MAP".
 */
export type DashboardItemMap = {
  id: string;
  type: "MAP";
  map: {
    id: string;
    name: string;
  };
};

/**
 * Represents a dashboard filter object with a display name and starred options.
 */
export type Filter = {
  displayName: string;
  starred: StarredOptions;
  type: TypeOptions;
};

/**
 * The options for type filters.
 */
export type TypeOptions = "all" | "visualization" | "map" | "text";

/**
 * The options for starred filters.
 */
export type StarredOptions = "all" | "starred" | "not-starred";
