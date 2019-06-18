import React from "react";

import Button from "./Button";
import ExperimentalButton from "./ExperimentalButton";

import UI from "../utils/UI";

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
  if (theme === UI.THEMES_KEYS.CLASSIC) {
    return (
      <Button
        id={numeral}
        tabIndex={index + 2}
        buttonType={UI.BUTTON_TYPES.NUMERAL}
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
  } else if (theme === UI.THEMES_KEYS.EXPERIMENTAL) {
    return (
      <ExperimentalButton
        id={numeral}
        tabIndex={index + 2}
        key={numeral}
        buttonType={UI.BUTTON_TYPES.NUMERAL}
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
