import React from "react";

import Button from "./Button";
import ExperimentalButton from "./ExperimentalButton";

import THEMES_KEYS from "../data/THEMES_KEYS";
import BUTTON_TYPES from "../data/BUTTON_TYPES";

function NumeralButton({
  theme,
  numeral,
  index,
  vibrate,
  operationMode,
  setFirst,
  first,
  setSecond,
  second
}) {
  if (theme === THEMES_KEYS.CLASSIC) {
    return (
      <Button
        id={numeral}
        tabIndex={index + 2}
        key={numeral}
        buttonType={BUTTON_TYPES.NUMERAL}
        onClick={() => {
          vibrate();
          // console.log(numeral, NUMERALS[numeral].value);

          if (!operationMode) return setFirst(`${first}${numeral}`);

          return setSecond(`${second}${numeral}`);
        }}
      >
        {numeral}
      </Button>
    );
  } else if (theme === THEMES_KEYS.EXPERIMENTAL) {
    return (
      <ExperimentalButton
        id={numeral}
        tabIndex={index + 2}
        key={numeral}
        buttonType={BUTTON_TYPES.NUMERAL}
        onClick={() => {
          vibrate();
          // console.log(numeral, NUMERALS[numeral].value);

          if (!operationMode) return setFirst(`${first}${numeral}`);

          return setSecond(`${second}${numeral}`);
        }}
      >
        {numeral}
      </ExperimentalButton>
    );
  }

  return null;
}

export default NumeralButton;
