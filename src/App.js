import React, { useState } from "react";
import styled from "@emotion/styled";

import NUMERALS from "./data/NUMERALS";
import OPERATIONS, { OPERATIONS_KEYS } from "./data/OPERATIONS";

const Button = styled.button``;
const Input = styled.input``;

function App() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operationMode, setOperationMode] = useState();

  return (
    <div className="App">
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
            console.log(opKey, OPERATIONS[opKey].symbol);

            if (opKey === OPERATIONS_KEYS.EQUALS) {
              let isThisEqualClickValid = true;

              // check to see if valid: current `operationMode` is not equals but is something else AND two inputs received
              if (!operationMode || operationMode === OPERATIONS_KEYS.EQUALS)
                isThisEqualClickValid = false;

              if (!first || !second) isThisEqualClickValid = false;

              // we should not set `operationMode` to EQUALS if the equal click is not valid or output any result
              if (!isThisEqualClickValid) return;

              // if valid, calculate result and set it to first input, remove second input for subsequent calculation
              setFirst(`RESULT`);
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
