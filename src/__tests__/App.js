import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from "enzyme";

import App from "../App";
import Input from "../components/Input";
import { handleClear } from "../components/ClearButton";

describe("App.js", () => {
  test("renders", () => {
    const component = renderer.create(<App />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("handleClear clears text", () => {
    // const wrapper = render(<App />);
    // console.log(wrapper);
    // const input = wrapper.find("input");
    // input.simulate("focus");
    // input.simulate("change", { target: { value: "XX" } });
    // expect(input.get(0).value).toBe("XX");
    // expect(input.props()).toEqual("X");
  });
});
