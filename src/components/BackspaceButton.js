import React from "react";

import Button from "./Button";
import ExperimentalButton from "./ExperimentalButton";

import UI from "../utils/UI";

function BackspaceButton({
  theme,
  operationMode,
  first,
  second,
  vibrate,
  setFirst,
  setSecond
}) {
  const showBackspace =
    (!operationMode && first.length > 0) ||
    (operationMode && second.length > 0);

  if (theme === UI.THEMES_KEYS.CLASSIC) {
    return (
      <Button
        buttonType={UI.BUTTON_TYPES.EDIT}
        tabIndex={1}
        disabled={!showBackspace}
        style={{ opacity: showBackspace ? 1 : 0.4 }}
        onClick={() => {
          vibrate();

          if (!operationMode) {
            return setFirst(first.substr(0, first.length - 1));
          }

          return setSecond(second.substr(0, second.length - 1));
        }}
      >
        &larr;
      </Button>
    );
  } else if (theme === UI.THEMES_KEYS.EXPERIMENTAL) {
    return (
      <ExperimentalButton
        buttonType={UI.BUTTON_TYPES.EDIT}
        tabIndex={1}
        disabled={!showBackspace}
        style={{ opacity: showBackspace ? 1 : 0.4 }}
        onClick={() => {
          vibrate();

          if (!operationMode) {
            return setFirst(first.substr(0, first.length - 1));
          }

          return setSecond(second.substr(0, second.length - 1));
        }}
      >
        &larr;
      </ExperimentalButton>
    );
  }
}

export default BackspaceButton;
