import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { DashboardItems } from ".";

describe("DashboardItems", () => {
  vi.mock("../../../common/utils/config", () => ({
    fetcher: () =>
      Promise.resolve({
        id: "id",
        displayName: "Dashboard X",
        starred: false,
        dashboardItems: [
          { id: "id", type: "TEXT", text: "Dashboard 1" },
          {
            id: "id2",
            type: "VISUALIZATION",
            visualization: { name: "Dashboard 2" },
          },
          { id: "id3", type: "MAP", map: { name: "Dashboard 3" } },
        ],
      }),
  }));

  it("should render the dashboard items", async () => {
    const { getByText } = render(
      <DashboardItems
        id="id"
        filter={{
          displayName: "",
          starred: "all",
          type: "all",
        }}
      />
    );

    await waitFor(() => {
      expect(getByText("Dashboard 1")).toBeInTheDocument();
      expect(getByText("Dashboard 2")).toBeInTheDocument();
      expect(getByText("Dashboard 3")).toBeInTheDocument();
    });
  });

  it("should filter the dashboard items type", async () => {
    const { getByText, queryByText } = render(
      <DashboardItems
        id="id"
        filter={{
          displayName: "",
          starred: "all",
          type: "text",
        }}
      />
    );

    await waitFor(() => {
      expect(getByText("Dashboard 1")).toBeInTheDocument();
      expect(queryByText("Dashboard 2")).not.toBeInTheDocument();
      expect(queryByText("Dashboard 3")).not.toBeInTheDocument();
    });
  });
});
