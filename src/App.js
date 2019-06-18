import React, { useState } from "react";
import styled from "@emotion/styled";

import ThemeBar from "./components/ThemeBar";

import NUMERALS from "./data/NUMERALS";
import OPERATIONS, { OPERATIONS_KEYS } from "./data/OPERATIONS";
import THEMES_KEYS from "./data/THEMES_KEYS";
import convert from "./utils/convert";
import useWindowSize from "./utils/useWindowSize";

const BUTTON_TYPES = {
  EDIT: "EDIT",
  OPERATION: "OPERATION",
  NUMERAL: "NUMERAL"
};

const breakpoints = [768, 375];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const Button = styled.button`
  border: none;
  background: none;
  color: #fff;
  user-select: none;
  &:focus {
    outline: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;

  position: ${props => {
    if (props.buttonType === BUTTON_TYPES.OPERATION) {
      return `relative`;
    }
  }};

  /* top: ${props => {
    if (props.buttonType === BUTTON_TYPES.OPERATION) {
      return `0.05rem`;
    }
  }}; */

  font-size: ${props => {
    if (props.buttonType === BUTTON_TYPES.OPERATION) {
      return `4rem`;
    }

    return `4rem`;
  }};

  ${mq[0]} {
    font-size: ${props => {
      if (props.buttonType === BUTTON_TYPES.OPERATION) {
        return `calc(4rem / 2)`;
      }

      return `calc(4rem / 2)`;
    }};
  }

  ${mq[1]} {
    font-size: ${props => {
      if (props.buttonType === BUTTON_TYPES.OPERATION) {
        return `calc(4rem / 3)`;
      }

      return `calc(4rem / 3)`;
    }};
  }

  border: ${props => {
    if (props.active) {
      return `3px solid black`;
    }

    return `3px solid transparent`;
  }};

  background-color: ${props => {
    if (props.buttonType === BUTTON_TYPES.EDIT) {
      return `#414246`;
    } else if (props.buttonType === BUTTON_TYPES.OPERATION) {
      return `#FF9F0A`;
    } else if (props.buttonType === BUTTON_TYPES.NUMERAL) {
      return `#5D6365`;
    }
  }};

  &:active,
  &:focus {
    background-color: ${props => {
      if (props.buttonType === BUTTON_TYPES.EDIT) {
        return `#5D6365`;
      } else if (props.buttonType === BUTTON_TYPES.OPERATION) {
        return `#CD7D03`;
      } else if (props.buttonType === BUTTON_TYPES.NUMERAL) {
        return `#A0A1A4`;
      }
    }};
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  background-color: #2a3131;
  border: none;
  color: #fff;
  font-size: 5rem;
  padding: 2rem;
  padding-top: 4rem;

  ${mq[0]} {
    font-size: calc(5rem / 1);
    padding: calc(2rem / 1);
    padding-top: calc(4rem / 1);
  }

  ${mq[1]} {
    font-size: calc(5rem / 1.4);
    padding: calc(2rem / 1.4);
    padding-top: calc(4rem / 1.4);
  }

  outline: none;
  text-align: right;
  border-radius: 0;
  -webkit-appearance: none;
`;

const RootContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  touch-action: manipulation;
  overflow: hidden;
`;

const RootButtonsContainer = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 100%;
  grid-column-gap: 0.15rem;
  grid-row-gap: 0.15rem;

  background-color: #2e3236;
`;

const ExperimentalInnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: #131919;
`;

const MainButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 4fr;
  grid-column-gap: 0.15rem;
`;
const EditOperationButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  grid-column-gap: 0.15rem;
  /* grid-row-gap: 0.15rem; */
  padding-bottom: 0.15rem;
`;
const NumeralButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.15rem;
  grid-row-gap: 0.15rem;

  #M {
    grid-column-end: span 2;
  }
`;

const OperationButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.15rem;
  grid-row-gap: 0.15rem;
`;

const ExperimentalOperationButtonsContainer = styled.div`
  padding: 1rem;
  padding-bottom: 1rem;
  display: flex;

  align-items: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 500px;

  button {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 255, 116, 0.3);
    border: 1px solid #00ff74;
    font-family: "IBM Plex Mono";
    font-size: 24px;
    color: #00ff74;
  }
`;

const ExperimentalEditOperationButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: space-between;

  button {
    background: rgba(255, 159, 10, 0.3);
    border: 1px solid #ffc000;

    font-family: "IBM Plex Mono";
    font-size: 20px;
    color: #ffc000;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ExperimentalNumeralButtonsContainer = styled.div`
  padding: 1rem;
  padding-top: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 960px;

  button {
    flex: 1;
    background: rgba(0, 200, 255, 0.3);
    border: 1px solid #00c8ff;
    font-family: "IBM Plex Mono";
    font-size: 32px;
    color: #00c8ff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ExperimentalNumeralRow = styled.div`
  display: flex;
`;

const ExperimentalInputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExperimentalInput = styled.input`
  display: block;
  width: 100%;
  background: none;
  border: none;

  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  text-align: center;
  color: #fff;
  font-family: "IBM Plex Mono";
  font-size: 2rem;
`;

const ExperimentalButton = styled.button`
  background-color: ${props => {
    if (props.active && props.buttonType === BUTTON_TYPES.OPERATION) {
      return `#00ff74 !important`;
    }
  }};

  color: ${props => {
    if (props.active && props.buttonType === BUTTON_TYPES.OPERATION) {
      return `#131919 !important`;
    }
  }};

  &:active,
  &:focus {
    background-color: ${props => {
      if (props.buttonType === BUTTON_TYPES.EDIT) {
        return `#ffc000`;
      } else if (props.buttonType === BUTTON_TYPES.OPERATION) {
        return `#00ff74`;
      } else if (props.buttonType === BUTTON_TYPES.NUMERAL) {
        return `#00c8ff`;
      }
    }};
    color: ${props => {
      if (props.buttonType === BUTTON_TYPES.EDIT) {
        return `#131919`;
      } else if (props.buttonType === BUTTON_TYPES.OPERATION) {
        return `#131919`;
      } else if (props.buttonType === BUTTON_TYPES.NUMERAL) {
        return `#131919`;
      }
    }};
  }
`;

const vibrate = () => {
  navigator.vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

  if (navigator.vibrate) {
    // vibration API supported
    navigator.vibrate(200);
  }
};

function App() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operationMode, setOperationMode] = useState();
  const [previousOperation, setPreviousOperation] = useState();
  const [hasError, setError] = useState(false);
  const [theme, setTheme] = useState(THEMES_KEYS.EXPERIMENTAL);
  const { width } = useWindowSize();

  const showBackspace =
    (!operationMode && first.length > 0) ||
    (operationMode && second.length > 0);

  const ClearButton = () => {
    if (theme === THEMES_KEYS.CLASSIC) {
      return (
        <Button
          buttonType={BUTTON_TYPES.EDIT}
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
    } else if (theme === THEMES_KEYS.EXPERIMENTAL) {
      return (
        <ExperimentalButton
          buttonType={BUTTON_TYPES.EDIT}
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
  };

  const BackspaceButton = () => {
    if (theme === THEMES_KEYS.CLASSIC) {
      return (
        <Button
          buttonType={BUTTON_TYPES.EDIT}
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
    } else if (theme === THEMES_KEYS.EXPERIMENTAL) {
      return (
        <ExperimentalButton
          buttonType={BUTTON_TYPES.EDIT}
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
  };

  const NumeralButton = (numeral, index) => {
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
  };

  const OperationButton = (opKey, index) => {
    if (theme === THEMES_KEYS.CLASSIC) {
      return (
        <Button
          tabIndex={index + 9}
          key={opKey}
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
          key={opKey}
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
  };

  // EXPERIMENTAL THEME
  if (theme === THEMES_KEYS.EXPERIMENTAL) {
    const maxHeight = 300;
    const height = width > maxHeight ? maxHeight : width;
    const r1 = maxHeight / 2.5;
    const r2 = maxHeight / 2.9;
    const cx = width / 2;
    const cy = height / 2;

    const stroke = hasError
      ? "#ffc000"
      : !previousOperation
      ? "white"
      : "#00ff74";

    return (
      <RootContainer>
        <ExperimentalInnerContainer>
          <ExperimentalInputContainer>
            <svg width={width} height={height}>
              <circle
                cx={cx}
                cy={cy}
                r={r1}
                strokeDasharray="1,6"
                strokeWidth={1}
                stroke={stroke}
                fill="transparent"
              >
                {!previousOperation && (
                  <animate
                    attributeType="XML"
                    attributeName="stroke-width"
                    from={1}
                    to={10}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>

              <circle
                cx={cx}
                cy={cy}
                r={r2}
                strokeWidth={1}
                stroke={stroke}
                fill="transparent"
                opacity={!previousOperation ? 0.1 : 1}
              >
                {!previousOperation && (
                  <animate
                    attributeType="XML"
                    attributeName="opacity"
                    from={0}
                    to={0.3}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </svg>
            {!operationMode || operationMode === OPERATIONS_KEYS.EQUALS ? (
              <ExperimentalInput value={first} readOnly />
            ) : (
              <ExperimentalInput value={second} readOnly />
            )}
          </ExperimentalInputContainer>

          <ExperimentalEditOperationButtonsContainer>
            {ClearButton()}
            {BackspaceButton()}
          </ExperimentalEditOperationButtonsContainer>

          <ExperimentalNumeralButtonsContainer>
            <ExperimentalNumeralRow>
              {["I", "V", "X"].map((numeral, index) =>
                NumeralButton(numeral, index)
              )}
            </ExperimentalNumeralRow>
            <ExperimentalNumeralRow>
              {["L", "C", "D", "M"].map((numeral, index) =>
                NumeralButton(numeral, index)
              )}
            </ExperimentalNumeralRow>
          </ExperimentalNumeralButtonsContainer>

          <ExperimentalOperationButtonsContainer>
            {Object.keys(OPERATIONS).map((opKey, index) =>
              OperationButton(opKey, index)
            )}
          </ExperimentalOperationButtonsContainer>
          <ThemeBar theme={theme} setTheme={setTheme} />
        </ExperimentalInnerContainer>
      </RootContainer>
    );
  }

  // CLASSIC THEME
  return (
    <RootContainer>
      {!operationMode || operationMode === OPERATIONS_KEYS.EQUALS ? (
        <Input value={first} readOnly />
      ) : (
        <Input value={second} readOnly />
      )}

      <RootButtonsContainer>
        <MainButtonsContainer>
          <EditOperationButtonsContainer>
            {ClearButton()}
            {BackspaceButton()}
          </EditOperationButtonsContainer>

          <NumeralButtonsContainer>
            {Object.keys(NUMERALS).map((numeral, index) =>
              NumeralButton(numeral, index)
            )}
          </NumeralButtonsContainer>
        </MainButtonsContainer>

        <OperationButtonsContainer>
          {Object.keys(OPERATIONS).map((opKey, index) =>
            OperationButton(opKey, index)
          )}
        </OperationButtonsContainer>
      </RootButtonsContainer>
      <ThemeBar theme={theme} setTheme={setTheme} />
    </RootContainer>
  );
}

export default App;
