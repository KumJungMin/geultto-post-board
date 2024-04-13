import { styled } from 'styled-components';
import ArrowUpIcon from '../icons/ArrowUpIcon';

interface ScrollToTopProps {
  onClick: () => void;
}

const Container = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  right: 24px;
  bottom: calc(20px + env(safe-area-inset-bottom));
  z-index: 100;
  transition: opacity 0.1s;
  background-color: #919191;
  opacity: 0.6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;


export default function ScrollToTop({ onClick = () => {} }: ScrollToTopProps) {
  return (
    <Container onClick={onClick}>
      <ArrowUpIcon />
    </Container>
  );
}