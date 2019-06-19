import styled from "@emotion/styled";

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

export default ExperimentalEditOperationButtonsContainer;
