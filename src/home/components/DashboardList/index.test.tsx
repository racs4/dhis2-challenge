import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { DashboardListComponent } from ".";

describe("useFetch", () => {
  vi.mock("../../../common/utils/config", () => ({
    fetcher: () =>
      Promise.resolve({
        dashboards: [
          { id: "id", displayName: "Dashboard 1", starred: false },
          { id: "id2", displayName: "Dashboard 2", starred: true },
        ],
      }),
  }));

  beforeEach(() => {
    localStorage.clear();
  });

  it("should fetch data and set it to state", async () => {
    const { getByText } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getByText("Dashboard 1")).toBeInTheDocument();
    });
  });

  it("should set loading to true when fetch is in progress", async () => {
    const { getByAltText } = render(<DashboardListComponent />);

    expect(getByAltText("Loading")).toBeInTheDocument();
  });

  it("should star a dashboard, when the star button is clicked", async () => {
    const { getByTestId, getAllByTestId } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getByTestId("star")).toBeInTheDocument();
    });

    expect(localStorage.getItem("starred")).toEqual(null);
    expect(localStorage.getItem("notStarred")).toEqual(null);

    act(() => {
      getByTestId("star").click();
    });

    await waitFor(() => {
      expect(getAllByTestId("marked-star")).toHaveLength(2);
    });

    expect(localStorage.getItem("starred")).toEqual("id,");
    expect(localStorage.getItem("notStarred")).toEqual("");
  });

  it("should unstar a dashboard, when the star button is clicked", async () => {
    const { getByTestId, getAllByTestId } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getByTestId("marked-star")).toBeInTheDocument();
    });

    expect(localStorage.getItem("starred")).toEqual(null);
    expect(localStorage.getItem("notStarred")).toEqual(null);

    act(() => {
      getByTestId("marked-star").click();
    });

    await waitFor(() => {
      expect(getAllByTestId("star")).toHaveLength(2);
    });

    expect(localStorage.getItem("starred")).toEqual("");
    expect(localStorage.getItem("notStarred")).toEqual("id2,");
  });

  it("should load starred dashboards from local storage", async () => {
    localStorage.setItem("starred", "id,");

    vi.mock("../../../common/utils/config", () => ({
      fetcher: () =>
        Promise.resolve({
          dashboards: [
            { id: "id", displayName: "Dashboard 1", starred: false },
            { id: "id2", displayName: "Dashboard 2", starred: true },
          ],
        }),
    }));

    const { getAllByTestId } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getAllByTestId("marked-star")).toHaveLength(2);
    });
  });

  it("should filter dashboards by search term", async () => {
    vi.mock("../../../common/utils/config", () => ({
      fetcher: () =>
        Promise.resolve({
          dashboards: [
            { id: "id", displayName: "Dashboard 1", starred: false },
            { id: "id2", displayName: "Dashboard 2", starred: true },
          ],
        }),
    }));

    const { getByTestId, getAllByTestId } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getAllByTestId("dashboard-wrapper")).toHaveLength(2);
    });

    act(() => {
      const searchInput = getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "1" } });
    });

    await waitFor(() => {
      expect(getAllByTestId("dashboard-wrapper")).toHaveLength(1);
    });
  });

  it("should filter dashboards by starred", async () => {
    vi.mock("../../../common/utils/config", () => ({
      fetcher: () =>
        Promise.resolve({
          dashboards: [
            { id: "id", displayName: "Dashboard 1", starred: false },
            { id: "id2", displayName: "Dashboard 2", starred: true },
          ],
        }),
    }));

    const { getByTestId, getAllByTestId } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getAllByTestId("dashboard-wrapper")).toHaveLength(2);
    });

    act(() => {
      const starSelect = getByTestId("star-select");
      fireEvent.change(starSelect, { target: { value: "starred" } });
    });

    await waitFor(() => {
      expect(getAllByTestId("dashboard-wrapper")).toHaveLength(1);
    });
  });

  it("should show items when summary is clicked", async () => {
    const { getAllByTestId } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getAllByTestId("dashboard-wrapper")).toHaveLength(2);
    });

    act(() => {
      const dashboardSummary = getAllByTestId("dashboard-summary");
      expect(dashboardSummary).toHaveLength(2);
      fireEvent.click(dashboardSummary[0]);
    });

    await waitFor(() => {
      expect(getAllByTestId("dashboard-item")).toHaveLength(1);
    });
  });

  it("should show only one item details", async () => {
    const { getAllByTestId } = render(<DashboardListComponent />);

    await waitFor(() => {
      expect(getAllByTestId("dashboard-wrapper")).toHaveLength(2);
    });

    act(() => {
      const dashboardSummary = getAllByTestId("dashboard-summary");
      expect(dashboardSummary).toHaveLength(2);
      fireEvent.click(dashboardSummary[0]);
      fireEvent.click(dashboardSummary[1]);
    });

    await waitFor(() => {
      expect(getAllByTestId("dashboard-item")).toHaveLength(1);
    });
  });
});
