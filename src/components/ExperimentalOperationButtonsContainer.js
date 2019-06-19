import styled from "@emotion/styled";

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

export default ExperimentalOperationButtonsContainer;
