import React from "react";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";

import App from "../App";

describe("App.js", () => {
  test("renders", () => {
    const component = renderer.create(<App />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
