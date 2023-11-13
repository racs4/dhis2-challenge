import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FetchComponent } from ".";

describe("FetchComponent", () => {
  it("should render children when loading is false and error is false", () => {
    const { getByText, queryByText, queryByAltText } = render(
      <FetchComponent loading={false} error={false}>
        <div>Test Children</div>
      </FetchComponent>
    );
    expect(getByText("Test Children")).toBeInTheDocument();
    expect(queryByText("There was an error")).not.toBeInTheDocument();
    expect(queryByAltText("Loading")).not.toBeInTheDocument();
  });

  it("should render loading spinner when loading is true", () => {
    const { queryByAltText, queryByText } = render(
      <FetchComponent loading={true} error={false}>
        <div>Test Children</div>
      </FetchComponent>
    );
    expect(queryByText("Test Children")).not.toBeInTheDocument();
    expect(queryByText("There was an error")).not.toBeInTheDocument();
    expect(queryByAltText("Loading")).toBeInTheDocument();
  });

  it("should render error message when error is true", () => {
    const { getByText, queryByText, queryByAltText } = render(
      <FetchComponent loading={false} error={true}>
        <div>Test Children</div>
      </FetchComponent>
    );
    expect(queryByText("Test Children")).not.toBeInTheDocument();
    expect(getByText("There was an error")).toBeInTheDocument();
    expect(queryByAltText("Loading")).not.toBeInTheDocument();
  });
});
