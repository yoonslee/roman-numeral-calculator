import React from "react";

import Button from "./Button";
import ExperimentalButton from "./ExperimentalButton";

import UserInterface from "../utils/UserInterface";

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
  if (theme === UserInterface.THEMES_KEYS.CLASSIC) {
    return (
      <Button
        id={numeral}
        tabIndex={index + 2}
        buttonType={UserInterface.BUTTON_TYPES.NUMERAL}
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
  } else if (theme === UserInterface.THEMES_KEYS.EXPERIMENTAL) {
    return (
      <ExperimentalButton
        id={numeral}
        tabIndex={index + 2}
        key={numeral}
        buttonType={UserInterface.BUTTON_TYPES.NUMERAL}
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
