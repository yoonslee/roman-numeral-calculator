import React from "react";
import styled from "@emotion/styled";
import startCase from "lodash/startCase";
import lowerCase from "lodash/lowerCase";

import UI from "../utils/UI";

const ThemeBarContainer = styled.div`
  display: flex;
  align-items: center;
  /* padding: 0.5rem; */
  background-color: #fff;

  button {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;

const ThemeButton = styled.button`
  background-color: ${props => (props.active ? `#444` : `transparent`)};
  color: ${props => (props.active ? `#fff` : `#444`)};
`;

function ThemeBar({ theme, setTheme }) {
  return (
    <ThemeBarContainer>
      {Object.keys(UI.THEMES_KEYS).map(themeKey => (
        <ThemeButton
          key={themeKey}
          onClick={() => setTheme(themeKey)}
          active={theme === themeKey}
        >
          {startCase(lowerCase(themeKey))}
        </ThemeButton>
      ))}
    </ThemeBarContainer>
  );
}

export default ThemeBar;
