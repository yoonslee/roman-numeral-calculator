import React from "react";
import ReactDOM from "react-dom";
import ClearButton from "../../components/ClearButton";

describe("ClearButton", () => {
  test("renders without crashing", () => {
    const button = document.createElement("button");
    ReactDOM.render(<ClearButton />, button);
    ReactDOM.unmountComponentAtNode(button);
  });
});
