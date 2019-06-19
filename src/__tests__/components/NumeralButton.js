import React from "react";
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";

import App from "../../App";
import NumeralButton from "../../components/NumeralButton";

const getBeforeAndAfterInputValues = ({
  getByTestId,
  getByText,
  numeralClicked
}) => {
  // grab input
  const input = getByTestId("input");

  // get value of input
  const valueBefore = input.value;

  // click the handleNumeral button
  fireEvent.click(getByText(numeralClicked));

  // expect there to be an empty value in input
  const valueAfter = input.value;

  return { valueBefore, valueAfter };
};

describe("NumeralButton component", () => {
  test("renders", () => {
    const component = renderer.create(<NumeralButton />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("handleNumeral correctly inputs numerals", () => {
  afterEach(cleanup);

  test("empty first value, empty second value, empty operation mode", () => {
    const numeralClicked = "X";

    // render app in an initial state
    const { getByTestId, getByText } = render(<App />);

    // get valueBefore of input based on initial state

    // simulate click of numeral button

    // get valueAfter of input

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText,
      numeralClicked
    });

    // empty string because anticipating first numeral
    expect(valueBefore).toBe("");
    // first numeral shows, waiting for operation selection
    expect(valueAfter).toBe(numeralClicked);
  });

  test("non-empty first value, empty second value, non-empty operation mode", () => {
    const initialFirst = "X";
    const numeralClicked = "X";

    const { getByTestId, getByText } = render(
      <App first={initialFirst} operationMode="ADD" />
    );

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText,
      numeralClicked
    });

    // empty string because anticipating second numeral
    expect(valueBefore).toBe("");
    // second numeral shows, waiting for equals operations
    expect(valueAfter).toBe(numeralClicked);
  });

  test("non-empty first value, empty second value, empty operation mode", () => {
    const initialFirst = "X";
    const numeralClicked = "X";

    const { getByTestId, getByText } = render(<App first={initialFirst} />);

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText,
      numeralClicked
    });

    // first numeral shows, waiting for operation selection
    expect(valueBefore).toBe(initialFirst);
    // continues first numeral, waiting for operation selection
    expect(valueAfter).toBe(initialFirst + numeralClicked);
  });

  test("non-empty first value, non-empty second value, operation mode", () => {
    const initialFirst = "X";
    const initialSecond = "XX";
    const numeralClicked = "X";

    const { getByTestId, getByText } = render(
      <App first={initialFirst} second={initialSecond} operationMode="ADD" />
    );

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText,
      numeralClicked
    });

    // second numeral shows, waiting for equals operation
    expect(valueBefore).toBe(initialSecond);
    // continues second numeral, waiting for equals operation
    expect(valueAfter).toBe(initialSecond + numeralClicked);
  });

  test("non-empty first value, empty second value, equals operation mode", () => {
    const initialFirst = "X";
    const numeralClicked = "X";

    const { getByTestId, getByText } = render(
      <App first={initialFirst} operationMode="EQUALS" />
    );

    const { valueBefore, valueAfter } = getBeforeAndAfterInputValues({
      getByTestId,
      getByText,
      numeralClicked
    });

    // first numeral shows, waiting for next operation selection
    expect(valueBefore).toBe(initialFirst);
    // on equals, waiting for the next operation selection; however, if it selects a numeral, then it doesn't change the value of the current input
    expect(valueAfter).toBe(initialFirst);
  });
});
