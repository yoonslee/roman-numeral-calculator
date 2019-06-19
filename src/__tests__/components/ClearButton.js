import React from "react";
import renderer from "react-test-renderer";

import ClearButton from "../../components/ClearButton";

describe("ClearButton component", () => {
  test("renders", () => {
    const component = renderer.create(<ClearButton />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
