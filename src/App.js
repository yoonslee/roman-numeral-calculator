import React, { useState } from "react";
import styled from "@emotion/styled";

import NUMERALS from "./data/NUMERALS";

const Button = styled.button``;
const Input = styled.input``;

function App() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [inputMode, setInputMode] = useState(0);

  return (
    <div className="App">
      <Input value={first} />
      <Input value={second} />

      {Object.keys(NUMERALS).map(numeral => (
        <Button
          key={numeral}
          onClick={() => {
            console.log(numeral, NUMERALS[numeral].value);
            return setFirst(`${first}${numeral}`);
          }}
        >
          {numeral}
        </Button>
      ))}
    </div>
  );
}

export default App;
