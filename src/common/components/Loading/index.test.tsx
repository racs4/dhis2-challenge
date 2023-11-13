import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { describe, it, expect } from "vitest";
import { Loading } from "./index";

describe("Loading component", () => {
  it("should render the loading spinner", () => {
    const component = renderer.create(<Loading />);
    expect(component).toBeDefined();
  });
});
