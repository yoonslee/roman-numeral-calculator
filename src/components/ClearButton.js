import React from "react";

import Button from "./Button";
import ExperimentalButton from "./ExperimentalButton";

import UI from "../utils/UI";

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
  if (theme === UI.THEMES_KEYS.CLASSIC) {
    return (
      <Button
        buttonType={UI.BUTTON_TYPES.EDIT}
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
  } else if (theme === UI.THEMES_KEYS.EXPERIMENTAL) {
    return (
      <ExperimentalButton
        buttonType={UI.BUTTON_TYPES.EDIT}
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
