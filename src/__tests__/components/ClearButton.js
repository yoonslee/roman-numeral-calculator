import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";

import ClearButton, { handleClear } from "../../components/ClearButton";

describe("ClearButton component", () => {
  test("renders without crashing", () => {
    const { asFragment } = render(
      <ClearButton theme="UI.THEMES_KEYS.CLASSIC" />
    );
    console.log(asFragment);
    expect(asFragment()).toMatchSnapshot();
  });

  test("handleClear function works", () => {
    const {} = render;
  });
});
