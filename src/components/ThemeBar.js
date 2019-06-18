import React from "react";
import styled from "@emotion/styled";

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
      <ThemeButton
        onClick={() => setTheme(UI.THEMES_KEYS.CLASSIC)}
        active={theme === UI.THEMES_KEYS.CLASSIC}
      >
        Classic
      </ThemeButton>
      <ThemeButton
        onClick={() => setTheme(UI.THEMES_KEYS.EXPERIMENTAL)}
        active={theme === UI.THEMES_KEYS.EXPERIMENTAL}
      >
        Experimental
      </ThemeButton>
    </ThemeBarContainer>
  );
}

export default ThemeBar;
