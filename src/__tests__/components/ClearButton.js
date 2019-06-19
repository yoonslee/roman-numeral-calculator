import React from "react";
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";

import App from "../../App";
import ClearButton from "../../components/ClearButton";

const getBeforeAndAfterInputValues = ({ getByTestId, getByText }) => {
  // grab input
  const input = getByTestId("input");

  // get value of input
  const valueBefore = input.value;

  // click the handleClear button
  fireEvent.click(getByText(/AC/));

  // expect there to be an empty value in input
  const valueAfter = input.value;

  return { valueBefore, valueAfter };
};

describe("ClearButton component", () => {
  test("renders", () => {
    const component = renderer.create(<ClearButton />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// testing >9 different combinations of empty/non-empty (1) first numeral value, (2) second numeral value, and (3) operation mode, ignoring impossible cases
describe("handleClear clears text", () => {
  afterEach(cleanup);

  test("empty first value, empty second value, empty operation mode", () => {
    const { getByTestId, getByText } = render(<App />);

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText
    });

    // empty string because anticipating second numeral
    expect(valueBefore).toBe("");
    // first numeral shows, waiting for operation selection
    expect(valueAfter).toBe("");
  });

  test("non-empty first value, empty second value, non-empty operation mode", () => {
    const initialFirst = "X";

    const { getByTestId, getByText } = render(
      <App first={initialFirst} operationMode="ADD" />
    );

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText
    });

    // empty string because anticipating second numeral
    expect(valueBefore).toBe("");
    // first numeral shows, waiting for operation selection
    expect(valueAfter).toBe(initialFirst);
  });

  test("non-empty first value, empty second value, empty operation mode", () => {
    const initialFirst = "X";

    const { getByTestId, getByText } = render(<App first={initialFirst} />);

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText
    });

    // first numeral shows, waiting for operation selection
    expect(valueBefore).toBe(initialFirst);
    // empty string, waiting for first numeral
    expect(valueAfter).toBe("");
  });

  test("non-empty first value, non-empty second value, operation mode", () => {
    const initialFirst = "X";
    const initialSecond = "XX";

    const { getByTestId, getByText } = render(
      <App first={initialFirst} second={initialSecond} operationMode="ADD" />
    );

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText
    });

    // second numeral shows, waiting for equals operation
    expect(valueBefore).toBe(initialSecond);
    // empty string, waiting for second numeral
    expect(valueAfter).toBe("");
  });

  test("non-empty first value, empty second value, equals operation mode", () => {
    const initialFirst = "X";

    const { getByTestId, getByText } = render(
      <App first={initialFirst} operationMode="EQUALS" />
    );

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText
    });

    // first numeral shows, waiting for next operation selection
    expect(valueBefore).toBe(initialFirst);
    // after the handleClear, first numeral still shows but is editable, allowing user to input append to the first numeral
    expect(valueAfter).toBe(initialFirst);
  });
});
