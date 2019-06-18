import styled from "@emotion/styled";
import UserInterface from "../utils/UserInterface";

const Input = styled.input`
  display: block;
  width: 100%;
  background-color: #2a3131;
  border: none;
  color: #fff;
  font-size: 5rem;
  padding: 2rem;
  padding-top: 4rem;

  ${UserInterface.MEDIA_QUERIES[0]} {
    font-size: calc(5rem / 1);
    padding: calc(2rem / 1);
    padding-top: calc(4rem / 1);
  }

  ${UserInterface.MEDIA_QUERIES[1]} {
    font-size: calc(5rem / 1.4);
    padding: calc(2rem / 1.4);
    padding-top: calc(4rem / 1.4);
  }

  outline: none;
  text-align: right;
  border-radius: 0;
  -webkit-appearance: none;
`;

export default Input;
