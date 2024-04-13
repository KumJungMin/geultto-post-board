import { styled, keyframes } from 'styled-components';

import CircleIcon from "../icons/CircleIcon";

const Opacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 10px auto 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${Opacity} 0.7s linear forwards;
`;

const IconWrapper = styled.div`
  animation: ${Rotate} 0.7s linear infinite;
`;

export default function FullToRefresh() {
  return <Container>
    <IconWrapper>
      <CircleIcon color="#9FA0A1" />
    </IconWrapper>
  </Container>
}