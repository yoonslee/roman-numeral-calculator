import React, { useState } from "react";

import ThemeBar from "./components/ThemeBar";
import ClearButton from "./components/ClearButton";
import BackspaceButton from "./components/BackspaceButton";
import Input from "./components/Input";
import NumeralButton from "./components/NumeralButton";
import OperationButton from "./components/OperationButton";
import ExperimentalInputCircleContainer from "./components/ExperimentalInputCircleContainer";
import RootContainer from "./components/RootContainer";
import RootButtonsContainer from "./components/RootButtonsContainer";
import ExperimentalInnerContainer from "./components/ExperimentalInnerContainer";
import MainButtonsContainer from "./components/MainButtonsContainer";
import EditOperationButtonsContainer from "./components/EditOperationButtonsContainer";
import NumeralButtonsContainer from "./components/NumeralButtonsContainer";
import OperationButtonsContainer from "./components/OperationButtonsContainer";
import ExperimentalOperationButtonsContainer from "./components/ExperimentalOperationButtonsContainer";
import ExperimentalEditOperationButtonsContainer from "./components/ExperimentalEditOperationButtonsContainer";
import ExperimentalNumeralButtonsContainer from "./components/ExperimentalNumeralButtonsContainer";
import ExperimentalNumeralRow from "./components/ExperimentalNumeralRow";
import ExperimentalInputContainer from "./components/ExperimentalInputContainer";
import ExperimentalInput from "./components/ExperimentalInput";

import NUMERALS from "./data/NUMERALS";
import OPERATIONS, { OPERATIONS_KEYS } from "./data/OPERATIONS";
import UI from "./utils/UI";
import convert from "./utils/convert";

function App(props) {
  const [first, setFirst] = useState(props.first || "");
  const [second, setSecond] = useState(props.second || "");
  const [operationMode, setOperationMode] = useState(
    props.operationMode || undefined
  );
  const [previousOperation, setPreviousOperation] = useState();
  const [hasError, setError] = useState(false);
  const [theme, setTheme] = useState(UI.THEMES_KEYS.EXPERIMENTAL);
  const { width } = UI.useWindowSize();

  // EXPERIMENTAL THEME
  if (theme === UI.THEMES_KEYS.EXPERIMENTAL) {
    return (
      <RootContainer>
        <ExperimentalInnerContainer>
          <ExperimentalInputContainer>
            <ExperimentalInputCircleContainer
              width={width}
              hasError={hasError}
              previousOperation={previousOperation}
            />
            {!operationMode || operationMode === OPERATIONS_KEYS.EQUALS ? (
              <ExperimentalInput data-testid="input" value={first} readOnly />
            ) : (
              <ExperimentalInput data-testid="input" value={second} readOnly />
            )}
          </ExperimentalInputContainer>

          <ExperimentalEditOperationButtonsContainer>
            <ClearButton
              theme={theme}
              vibrate={UI.vibrate}
              setError={setError}
              first={first}
              second={second}
              setPreviousOperation={setPreviousOperation}
              operationMode={operationMode}
              setFirst={setFirst}
              setOperationMode={setOperationMode}
              setSecond={setSecond}
            />
            <BackspaceButton
              theme={theme}
              operationMode={operationMode}
              first={first}
              second={second}
              vibrate={UI.vibrate}
              setFirst={setFirst}
              setSecond={setSecond}
            />
          </ExperimentalEditOperationButtonsContainer>

          <ExperimentalNumeralButtonsContainer>
            <ExperimentalNumeralRow>
              {["I", "V", "X"].map((numeral, index) => (
                <NumeralButton
                  key={numeral}
                  theme={theme}
                  numeral={numeral}
                  index={index}
                  vibrate={UI.vibrate}
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
                  theme={theme}
                  numeral={numeral}
                  index={index}
                  vibrate={UI.vibrate}
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
                vibrate={UI.vibrate}
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
        <Input data-testid="input" value={first} readOnly />
      ) : (
        <Input data-testid="input" value={second} readOnly />
      )}

      <RootButtonsContainer>
        <MainButtonsContainer>
          <EditOperationButtonsContainer>
            <ClearButton
              theme={theme}
              vibrate={UI.vibrate}
              setError={setError}
              first={first}
              second={second}
              setPreviousOperation={setPreviousOperation}
              operationMode={operationMode}
              setFirst={setFirst}
              setOperationMode={setOperationMode}
              setSecond={setSecond}
            />
            <BackspaceButton
              theme={theme}
              operationMode={operationMode}
              first={first}
              second={second}
              vibrate={UI.vibrate}
              setFirst={setFirst}
              setSecond={setSecond}
            />
          </EditOperationButtonsContainer>

          <NumeralButtonsContainer>
            {Object.keys(NUMERALS).map((numeral, index) => (
              <NumeralButton
                key={numeral}
                theme={theme}
                numeral={numeral}
                index={index}
                vibrate={UI.vibrate}
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
          {Object.keys(OPERATIONS).map((opKey, index) => (
            <OperationButton
              key={opKey}
              theme={theme}
              index={index}
              opKey={opKey}
              operationMode={operationMode}
              vibrate={UI.vibrate}
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
        </OperationButtonsContainer>
      </RootButtonsContainer>
      <ThemeBar theme={theme} setTheme={setTheme} />
    </RootContainer>
  );
}

export default App;
