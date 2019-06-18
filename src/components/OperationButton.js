import React from "react";

import Button from "./Button";
import ExperimentalButton from "./ExperimentalButton";

import THEMES_KEYS from "../data/THEMES_KEYS";
import BUTTON_TYPES from "../data/BUTTON_TYPES";
import OPERATIONS, { OPERATIONS_KEYS } from "../data/OPERATIONS";

function OperationButton({
  theme,
  index,
  opKey,
  operationMode,
  vibrate,
  first,
  convert,
  setError,
  previousOperation,
  setPreviousOperation,
  setOperationMode,
  setFirst,
  second,
  setSecond
}) {
  if (theme === THEMES_KEYS.CLASSIC) {
    return (
      <Button
        tabIndex={index + 9}
        buttonType={BUTTON_TYPES.OPERATION}
        active={operationMode === opKey}
        onClick={() => {
          vibrate();
          // console.log(opKey, OPERATIONS[opKey].symbol);

          if (
            [
              OPERATIONS_KEYS.ADD,
              OPERATIONS_KEYS.SUBTRACT,
              OPERATIONS_KEYS.MULTIPLY,
              OPERATIONS_KEYS.DIVIDE
            ].includes(opKey)
          ) {
            if (!first) {
              return;
            }

            // check to see if valid: first input has valid value
            const {
              isValid: isFirstIntValid,
              message: firstIntMessage
            } = convert(first);

            // if not, stop here and alert
            if (!isFirstIntValid) {
              setError(true);
              return alert(`${firstIntMessage}`);
            }

            setPreviousOperation();
          } else if (opKey === OPERATIONS_KEYS.EQUALS) {
            // bypass validation if there is a `previousOperation`, so that another equal click results in a repeat of the previous operation

            if (previousOperation) {
              const {
                previousOperationMode,
                previousOperationValue
              } = previousOperation;

              const { value: firstInt } = convert(first);

              let resultInt;

              if (previousOperationMode === OPERATIONS_KEYS.ADD) {
                resultInt = firstInt + previousOperationValue;
              } else if (previousOperationMode === OPERATIONS_KEYS.SUBTRACT) {
                resultInt = firstInt - previousOperationValue;
              } else if (previousOperationMode === OPERATIONS_KEYS.MULTIPLY) {
                resultInt = firstInt * previousOperationValue;
              } else if (previousOperationMode === OPERATIONS_KEYS.DIVIDE) {
                resultInt = firstInt / previousOperationValue;
              }

              const {
                value: result,
                isValid: isResultValid,
                message: resultMessage
              } = convert(resultInt);

              if (!isResultValid) {
                setError(true);
                return alert(`${resultMessage}`);
              }

              setFirst(result);
            }

            let isThisEqualClickValid = true;

            // check to see if valid: current `operationMode` is not equals but is something else AND two inputs received
            if (!operationMode || operationMode === OPERATIONS_KEYS.EQUALS)
              isThisEqualClickValid = false;

            if (!first || !second) isThisEqualClickValid = false;

            // we should not set `operationMode` to EQUALS if the equal click is not valid or output any result
            if (!isThisEqualClickValid) return;

            // if valid, calculate result and set it to first input, remove second input for subsequent calculation

            const { value: firstInt } = convert(first);
            const {
              value: secondInt,
              isValid: isSecondIntValid,
              message: secondIntMessage
            } = convert(second);

            if (!isSecondIntValid) {
              setError(true);
              return alert(`${secondIntMessage}`);
            }

            let resultInt;

            if (operationMode === OPERATIONS_KEYS.ADD) {
              resultInt = firstInt + secondInt;
            } else if (operationMode === OPERATIONS_KEYS.SUBTRACT) {
              resultInt = firstInt - secondInt;
            } else if (operationMode === OPERATIONS_KEYS.MULTIPLY) {
              resultInt = firstInt * secondInt;
            } else if (operationMode === OPERATIONS_KEYS.DIVIDE) {
              resultInt = firstInt / secondInt;
            }

            const {
              value: result,
              isValid: isResultValid,
              message: resultMessage
            } = convert(resultInt);

            if (!isResultValid) {
              setError(true);
              return alert(`${resultMessage}`);
            }

            setPreviousOperation({
              previousOperationMode: operationMode,
              previousOperationValue: secondInt
            });

            setError(false);
            setFirst(result);
            setSecond("");
          }

          return setOperationMode(opKey);
        }}
      >
        <span>{OPERATIONS[opKey].htmlEntity()}</span>
      </Button>
    );
  } else if (theme === THEMES_KEYS.EXPERIMENTAL) {
    return (
      <ExperimentalButton
        tabIndex={index + 9}
        buttonType={BUTTON_TYPES.OPERATION}
        active={operationMode === opKey}
        onClick={() => {
          vibrate();
          // console.log(opKey, OPERATIONS[opKey].symbol);

          if (
            [
              OPERATIONS_KEYS.ADD,
              OPERATIONS_KEYS.SUBTRACT,
              OPERATIONS_KEYS.MULTIPLY,
              OPERATIONS_KEYS.DIVIDE
            ].includes(opKey)
          ) {
            if (!first) {
              return;
            }

            // check to see if valid: first input has valid value
            const {
              isValid: isFirstIntValid,
              message: firstIntMessage
            } = convert(first);

            // if not, stop here and alert
            if (!isFirstIntValid) {
              setError(true);
              return alert(`${firstIntMessage}`);
            }

            setPreviousOperation();
          } else if (opKey === OPERATIONS_KEYS.EQUALS) {
            // bypass validation if there is a `previousOperation`, so that another equal click results in a repeat of the previous operation

            if (previousOperation) {
              const {
                previousOperationMode,
                previousOperationValue
              } = previousOperation;

              const { value: firstInt } = convert(first);

              let resultInt;

              if (previousOperationMode === OPERATIONS_KEYS.ADD) {
                resultInt = firstInt + previousOperationValue;
              } else if (previousOperationMode === OPERATIONS_KEYS.SUBTRACT) {
                resultInt = firstInt - previousOperationValue;
              } else if (previousOperationMode === OPERATIONS_KEYS.MULTIPLY) {
                resultInt = firstInt * previousOperationValue;
              } else if (previousOperationMode === OPERATIONS_KEYS.DIVIDE) {
                resultInt = firstInt / previousOperationValue;
              }

              const {
                value: result,
                isValid: isResultValid,
                message: resultMessage
              } = convert(resultInt);

              if (!isResultValid) {
                setError(true);
                return alert(`${resultMessage}`);
              }

              setFirst(result);
            }

            let isThisEqualClickValid = true;

            // check to see if valid: current `operationMode` is not equals but is something else AND two inputs received
            if (!operationMode || operationMode === OPERATIONS_KEYS.EQUALS)
              isThisEqualClickValid = false;

            if (!first || !second) isThisEqualClickValid = false;

            // we should not set `operationMode` to EQUALS if the equal click is not valid or output any result
            if (!isThisEqualClickValid) return;

            // if valid, calculate result and set it to first input, remove second input for subsequent calculation

            const { value: firstInt } = convert(first);
            const {
              value: secondInt,
              isValid: isSecondIntValid,
              message: secondIntMessage
            } = convert(second);

            if (!isSecondIntValid) {
              setError(true);
              return alert(`${secondIntMessage}`);
            }

            let resultInt;

            if (operationMode === OPERATIONS_KEYS.ADD) {
              resultInt = firstInt + secondInt;
            } else if (operationMode === OPERATIONS_KEYS.SUBTRACT) {
              resultInt = firstInt - secondInt;
            } else if (operationMode === OPERATIONS_KEYS.MULTIPLY) {
              resultInt = firstInt * secondInt;
            } else if (operationMode === OPERATIONS_KEYS.DIVIDE) {
              resultInt = firstInt / secondInt;
            }

            const {
              value: result,
              isValid: isResultValid,
              message: resultMessage
            } = convert(resultInt);

            if (!isResultValid) {
              setError(true);
              return alert(`${resultMessage}`);
            }

            setPreviousOperation({
              previousOperationMode: operationMode,
              previousOperationValue: secondInt
            });

            setError(false);
            setFirst(result);
            setSecond("");
          }

          return setOperationMode(opKey);
        }}
      >
        <span>{OPERATIONS[opKey].htmlEntity()}</span>
      </ExperimentalButton>
    );
  }
}
export default OperationButton;
