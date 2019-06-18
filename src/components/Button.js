import styled from "@emotion/styled";

import UserInterface from "../utils/UserInterface";

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
  if (props.buttonType === UserInterface.BUTTON_TYPES.OPERATION) {
    return `relative`;
  }
}};

/* top: ${props => {
  if (props.buttonType === UserInterface.BUTTON_TYPES.OPERATION) {
    return `0.05rem`;
  }
}}; */

font-size: ${props => {
  if (props.buttonType === UserInterface.BUTTON_TYPES.OPERATION) {
    return `4rem`;
  }

  return `4rem`;
}};

${UserInterface.MEDIA_QUERIES[0]} {
  font-size: ${props => {
    if (props.buttonType === UserInterface.BUTTON_TYPES.OPERATION) {
      return `calc(4rem / 2)`;
    }

    return `calc(4rem / 2)`;
  }};
}

${UserInterface.MEDIA_QUERIES[1]} {
  font-size: ${props => {
    if (props.buttonType === UserInterface.BUTTON_TYPES.OPERATION) {
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
  if (props.buttonType === UserInterface.BUTTON_TYPES.EDIT) {
    return `#414246`;
  } else if (props.buttonType === UserInterface.BUTTON_TYPES.OPERATION) {
    return `#FF9F0A`;
  } else if (props.buttonType === UserInterface.BUTTON_TYPES.NUMERAL) {
    return `#5D6365`;
  }
}};

&:active,
&:focus {
  background-color: ${props => {
    if (props.buttonType === UserInterface.BUTTON_TYPES.EDIT) {
      return `#5D6365`;
    } else if (props.buttonType === UserInterface.BUTTON_TYPES.OPERATION) {
      return `#CD7D03`;
    } else if (props.buttonType === UserInterface.BUTTON_TYPES.NUMERAL) {
      return `#A0A1A4`;
    }
  }};
}
`;

export default Button;
