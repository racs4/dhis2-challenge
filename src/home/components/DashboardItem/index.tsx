import {
  DashboardItem,
  DashboardItemMap,
  DashboardItemText,
  DashboardItemVisualization,
} from "../../types";
import styles from "./style.module.css";

type DashboardItemComponentProps = {
  item: DashboardItem;
};

/**
 * A component that displays a dashboard item.
 * @param item The dashboard item.
 * @returns A component that displays a dashboard item.
 */
export const DashboardItemComponent = ({
  item,
}: DashboardItemComponentProps) => {
  return (
    <div key={item.id} className={styles.wrapper}>
      {item.type === "TEXT" && <DashboardItemTextComponent item={item} />}
      {item.type === "VISUALIZATION" && (
        <DashboardItemVisualizationComponent item={item} />
      )}
      {item.type === "MAP" && <DashboardItemMapComponent item={item} />}
    </div>
  );
};

/**
 * A component that displays a dashboard item visualization.
 */
const DashboardItemVisualizationComponent = ({
  item,
}: {
  item: DashboardItemVisualization;
}) => {
  return (
    <>
      <p data-testid="dashboard-item-visualization">
        <img
          src="/icons/visualization.svg"
          alt="Visualization Icon"
          style={{ marginBottom: "-2px" }}
        />{" "}
        {item.visualization.name}
      </p>
    </>
  );
};

/**
 * A component that displays a dashboard item map.
 */
const DashboardItemMapComponent = ({ item }: { item: DashboardItemMap }) => {
  return (
    <>
      <p data-testid="dashboard-item-map">
        {/* Margin top used here to compensate svg diferent sizing */}
        <img
          src="/icons/map.svg"
          alt="Map Icon"
          style={{ marginBottom: "-2px" }}
        />{" "}
        {item.map.name}
      </p>
    </>
  );
};

/**
 * A component that displays a dashboard item text.
 */
const DashboardItemTextComponent = ({ item }: { item: DashboardItemText }) => {
  return (
    <>
      <p data-testid="dashboard-item-text">
        <img src="/icons/text.svg" alt="Text Icon" /> {item.text}
      </p>
    </>
  );
};
