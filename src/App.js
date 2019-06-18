import React, { useState } from "react";
import styled from "@emotion/styled";

import ThemeBar from "./components/ThemeBar";
import ClearButton from "./components/ClearButton";
import BackspaceButton from "./components/BackspaceButton";
import Input from "./components/Input";
import NumeralButton from "./components/NumeralButton";
import OperationButton from "./components/OperationButton";

import NUMERALS from "./data/NUMERALS";
import OPERATIONS, { OPERATIONS_KEYS } from "./data/OPERATIONS";
import THEMES_KEYS from "./data/THEMES_KEYS";
import convert from "./utils/convert";
import useWindowSize from "./utils/useWindowSize";

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
            <ClearButton
              theme={theme}
              vibrate={vibrate}
              setError={setError}
              first={first}
              second={second}
              setPreviousOperation={setPreviousOperation}
              operationMode={operationMode}
              setFirst={setFirst}
              setSecond={setSecond}
            />
            <BackspaceButton
              theme={theme}
              operationMode={operationMode}
              first={first}
              second={second}
              vibrate={vibrate}
              setFirst={setFirst}
              setSecond={setSecond}
            />
          </ExperimentalEditOperationButtonsContainer>

          <ExperimentalNumeralButtonsContainer>
            <ExperimentalNumeralRow>
              {["I", "V", "X"].map((numeral, index) => (
                <NumeralButton
                  key={numeral}
                  index={index}
                  vibrate={vibrate}
                  operationMode={operationMode}
                  setFirst={setFirst}
                  first={first}
                  setSecond={setSecond}
                  second={second}
                />
              ))}
            </ExperimentalNumeralRow>
            <ExperimentalNumeralRow>
              {["L", "C", "D", "M"].map((numeral, index) => (
                <NumeralButton
                  key={numeral}
                  index={index}
                  vibrate={vibrate}
                  operationMode={operationMode}
                  setFirst={setFirst}
                  first={first}
                  setSecond={setSecond}
                  second={second}
                />
              ))}
            </ExperimentalNumeralRow>
          </ExperimentalNumeralButtonsContainer>

          <ExperimentalOperationButtonsContainer>
            {Object.keys(OPERATIONS).map((opKey, index) => (
              <OperationButton
                key={opKey}
                theme={theme}
                index={index}
                opKey={opKey}
                operationMode={operationMode}
                vibrate={vibrate}
                first={first}
                convert={convert}
                setError={setError}
                previousOperation={previousOperation}
                setPreviousOperation={setPreviousOperation}
                setOperationMode={setOperationMode}
                setFirst={setFirst}
                second={second}
                setSecond={setSecond}
              />
            ))}
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
            <ClearButton
              theme={theme}
              vibrate={vibrate}
              setError={setError}
              first={first}
              second={second}
              setPreviousOperation={setPreviousOperation}
              operationMode={operationMode}
              setFirst={setFirst}
              setSecond={setSecond}
            />
            <BackspaceButton
              theme={theme}
              operationMode={operationMode}
              first={first}
              second={second}
              vibrate={vibrate}
              setFirst={setFirst}
              setSecond={setSecond}
            />
          </EditOperationButtonsContainer>

          <NumeralButtonsContainer>
            {Object.keys(NUMERALS).map((numeral, index) => (
              <NumeralButton
                key={numeral}
                index={index}
                vibrate={vibrate}
                operationMode={operationMode}
                setFirst={setFirst}
                first={first}
                setSecond={setSecond}
                second={second}
              />
            ))}
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
