import styled from "@emotion/styled";

import UI from "../utils/UI";

const ExperimentalButton = styled.button`
  background-color: ${props => {
    if (props.active && props.buttonType === UI.BUTTON_TYPES.OPERATION) {
      return `#00ff74 !important`;
    }
  }};

  color: ${props => {
    if (props.active && props.buttonType === UI.BUTTON_TYPES.OPERATION) {
      return `#131919 !important`;
    }
  }};

  &:active,
  &:focus {
    background-color: ${props => {
      if (props.buttonType === UI.BUTTON_TYPES.EDIT) {
        return `#ffc000`;
      } else if (props.buttonType === UI.BUTTON_TYPES.OPERATION) {
        return `#00ff74`;
      } else if (props.buttonType === UI.BUTTON_TYPES.NUMERAL) {
        return `#00c8ff`;
      }
    }};
    color: ${props => {
      if (props.buttonType === UI.BUTTON_TYPES.EDIT) {
        return `#131919`;
      } else if (props.buttonType === UI.BUTTON_TYPES.OPERATION) {
        return `#131919`;
      } else if (props.buttonType === UI.BUTTON_TYPES.NUMERAL) {
        return `#131919`;
      }
    }};
  }
`;

export default ExperimentalButton;
