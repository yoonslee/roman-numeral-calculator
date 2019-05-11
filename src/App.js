import React, { useState } from "react";
import styled from "@emotion/styled";

import NUMERALS from "./data/NUMERALS";
import OPERATIONS, { OPERATIONS_KEYS } from "./data/OPERATIONS";
import convert from "./utils/convert";

const Button = styled.button``;
const Input = styled.input``;

function App() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operationMode, setOperationMode] = useState();
  const [previousOperation, setPreviousOperation] = useState();

  return (
    <div className="App">
      <Button
        onClick={() => {
          if (!first && !second) {
            return;
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
        CLEAR
      </Button>

      {((!operationMode && first.length > 0) ||
        (operationMode && second.length > 0)) && (
        <Button
          onClick={() => {
            if (!operationMode) {
              return setFirst(first.substr(0, first.length - 1));
            }

            return setSecond(second.substr(0, second.length - 1));
          }}
        >
          DELETE
        </Button>
      )}
      {`FIRST: ${first} / SECOND: ${second} / operationMode: ${operationMode}`}

      {!operationMode || operationMode === OPERATIONS_KEYS.EQUALS ? (
        <Input value={first} readOnly />
      ) : (
        <Input value={second} readOnly />
      )}

      {Object.keys(NUMERALS).map(numeral => (
        <Button
          key={numeral}
          onClick={() => {
            console.log(numeral, NUMERALS[numeral].value);

            if (!operationMode) return setFirst(`${first}${numeral}`);
            return setSecond(`${second}${numeral}`);
          }}
        >
          {numeral}
        </Button>
      ))}

      {Object.keys(OPERATIONS).map(opKey => (
        <Button
          key={opKey}
          onClick={() => {
            // console.log(opKey, OPERATIONS[opKey].symbol);

            if (
              [
                OPERATIONS_KEYS.ADD,
                OPERATIONS_KEYS.SUBTRACT,
                OPERATIONS_KEYS.MULTIPLY,
                OPERATIONS_KEYS.DIVIDE
              ].includes(opKey)
            ) {
              // check to see if valid: first input has valid value
              const {
                isValid: isFirstIntValid,
                message: firstIntMessage
              } = convert(first);

              // if not, stop here and alert
              if (!isFirstIntValid) {
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
                return alert(`${resultMessage}`);
              }

              setPreviousOperation({
                previousOperationMode: operationMode,
                previousOperationValue: secondInt
              });

              setFirst(result);
              setSecond("");
            }

            return setOperationMode(opKey);
          }}
        >
          {OPERATIONS[opKey].symbol}
        </Button>
      ))}
    </div>
  );
}

export default App;
