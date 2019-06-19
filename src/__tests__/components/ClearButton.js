import React from "react";
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";

import App from "../../App";
import ClearButton from "../../components/ClearButton";

describe("ClearButton component", () => {
  test("renders", () => {
    const component = renderer.create(<ClearButton />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  // testing 9 different combinations of empty/non-empty (1) first numeral value, (2) second numeral value, and (3) operation mode
  describe("handleClear clears text", () => {
    afterEach(cleanup);

    test("non-empty first value, empty second value, non-empty operation mode", () => {
      const initialFirst = "X";

      const { getByTestId, getByText } = render(
        <App first={initialFirst} operationMode="ADD" />
      );

      // grab input
      const input = getByTestId("input");

      // get value of input
      const valueBefore = input.value;

      // click the handleClear button
      fireEvent.click(getByText(/AC/));

      // expect there to be an empty value in input
      const valueAfter = input.value;

      // empty string because anticipating second numeral
      expect(valueBefore).toBe("");
      // first numeral shows, waiting for operation selection
      expect(valueAfter).toBe(initialFirst);
    });

    test("non-empty first value, empty second value, empty operation mode", () => {
      const initialFirst = "X";

      const { getByTestId, getByText } = render(<App first={initialFirst} />);

      // grab input
      const input = getByTestId("input");

      // get value of input
      const valueBefore = input.value;

      // click the handleClear button
      fireEvent.click(getByText(/AC/));

      // expect there to be an empty value in input
      const valueAfter = input.value;

      // first numeral shows, waiting for operation selection
      expect(valueBefore).toBe(initialFirst);
      // empty string, waiting for first numeral
      expect(valueAfter).toBe("");
    });
  });
});
