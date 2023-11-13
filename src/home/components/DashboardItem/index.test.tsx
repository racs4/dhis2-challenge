import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DashboardItemComponent } from ".";
import {
  DashboardItemMap,
  DashboardItemText,
  DashboardItemVisualization,
} from "../../types";

describe("FetchComponent", () => {
  it("should render DashboardItemTextComponent when item type is TEXT", () => {
    const item = {
      id: "1",
      type: "TEXT",
      text: "Hello World",
    } as DashboardItemText;
    const { getByTestId } = render(<DashboardItemComponent item={item} />);
    expect(getByTestId("dashboard-item-text")).toBeInTheDocument();
  });

  it("should render DashboardItemVisualizationComponent when item type is VISUALIZATION", () => {
    const item = {
      id: "1",
      type: "VISUALIZATION",
      visualization: {
        name: "Visualization example",
      },
    } as DashboardItemVisualization;
    const { getByTestId } = render(<DashboardItemComponent item={item} />);
    expect(getByTestId("dashboard-item-visualization")).toBeInTheDocument();
  });

  it("should render DashboardItemMapComponent when item type is MAP", () => {
    const item = {
      id: "1",
      type: "MAP",
      map: { name: "Map example" },
    } as DashboardItemMap;
    const { getByTestId } = render(<DashboardItemComponent item={item} />);
    expect(getByTestId("dashboard-item-map")).toBeInTheDocument();
  });
});
