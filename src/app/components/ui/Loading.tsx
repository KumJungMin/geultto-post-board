import { styled, keyframes } from 'styled-components';

const Container = styled.div<{ $fullWindow: boolean }>`
  position: 'relative';
  width: 100%;
  display: flex;
  z-index: 100;
  background-color: #DFDFE0;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: ${props => props.$fullWindow ? '300px' : 'auto'};
`;


const LoadingAnimation = keyframes`
  0%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const LoadingCircle = styled.span`
  display: inline-block; 
  width: 10px;
  height: 10px;
  background-color: gray;
  border-radius: 50%; 
  animation: ${LoadingAnimation} 1s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
    background-color: #9FA0A1;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
    background-color: #fff;
  }
`;


export default function Loading({ fullWindow = false, style = {} }) {
  return (
    <Container $fullWindow={ fullWindow } style={style} >
      <LoadingCircle />
      <LoadingCircle />
      <LoadingCircle />
    </Container>
  );
}