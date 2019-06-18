import React from "react";

import Button from "./Button";
import ExperimentalButton from "./ExperimentalButton";

import UserInterface from "../utils/UserInterface";

function ClearButton({
  theme,
  vibrate,
  setError,
  first,
  second,
  setPreviousOperation,
  operationMode,
  setFirst,
  setOperationMode,
  setSecond
}) {
  if (theme === UserInterface.THEMES_KEYS.CLASSIC) {
    return (
      <Button
        buttonType={UserInterface.BUTTON_TYPES.EDIT}
        tabIndex={0}
        onClick={() => {
          vibrate();
          setError(false);

          if (!first && !second) {
            return setPreviousOperation();
          } else if (first && !operationMode && !second) {
            return setFirst("");
          } else if (first && operationMode && !second) {
            return setOperationMode();
          } else if (first && !operationMode && second) {
            // impossible
          } else if (first && operationMode && second) {
            return setSecond("");
          }
        }}
      >
        AC
      </Button>
    );
  } else if (theme === UserInterface.THEMES_KEYS.EXPERIMENTAL) {
    return (
      <ExperimentalButton
        buttonType={UserInterface.BUTTON_TYPES.EDIT}
        tabIndex={0}
        onClick={() => {
          vibrate();
          setError(false);

          if (!first && !second) {
            return setPreviousOperation();
          } else if (first && !operationMode && !second) {
            return setFirst("");
          } else if (first && operationMode && !second) {
            return setOperationMode();
          } else if (first && !operationMode && second) {
            // impossible
          } else if (first && operationMode && second) {
            return setSecond("");
          }
        }}
      >
        AC
      </ExperimentalButton>
    );
  }
  return null;
}

export default ClearButton;
