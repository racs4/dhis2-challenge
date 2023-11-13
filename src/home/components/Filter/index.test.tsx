import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { DashboardFilters } from ".";

describe("DashboardFilters", () => {
  it("should render search input and star select", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <DashboardFilters
        filter={{ displayName: "", starred: "all", type: "all" }}
        whenFilterChange={() => {}}
      />
    );
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
    expect(getByTestId("star-select")).toBeInTheDocument();
  });

  it("should call whenFilterChange with updated displayName when search input changes", () => {
    const whenFilterChange = vi.fn();
    const { getByPlaceholderText } = render(
      <DashboardFilters
        filter={{ displayName: "", starred: "all", type: "all" }}
        whenFilterChange={whenFilterChange}
      />
    );
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(whenFilterChange).toHaveBeenCalledWith({
      displayName: "test",
      starred: "all",
      type: "all",
    });
  });

  it("should call whenFilterChange with updated starred when star select changes", () => {
    const whenFilterChange = vi.fn();
    const { getByTestId } = render(
      <DashboardFilters
        filter={{ displayName: "", starred: "all", type: "all" }}
        whenFilterChange={whenFilterChange}
      />
    );
    const starSelect = getByTestId("star-select");
    fireEvent.change(starSelect, { target: { value: "starred" } });
    expect(whenFilterChange).toHaveBeenCalledWith({
      displayName: "",
      starred: "starred",
      type: "all",
    });
  });

  it("should call whenFilterChange with updated type when type select changes", () => {
    const whenFilterChange = vi.fn();
    const { getByTestId } = render(
      <DashboardFilters
        filter={{ displayName: "", starred: "all", type: "all" }}
        whenFilterChange={whenFilterChange}
      />
    );
    const typeSelect = getByTestId("type-select");
    fireEvent.change(typeSelect, { target: { value: "text" } });
    expect(whenFilterChange).toHaveBeenCalledWith({
      displayName: "",
      starred: "all",
      type: "text",
    });
  });
});
