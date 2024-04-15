'use client';

import { styled } from 'styled-components';

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  flex-direction: column;
  &::before {
    content: '';
    display: block;
    width: 400px;
    height: 400px;
    background-image: url('/not-found.png');
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #0459F7;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0E6EF2;
  }
  &:active {
    background-color: #0A5AD9;
  }
`;


export default function NotFound() {
  function goHome() {
    window.location.href = '/';
  }

	return <Container>
    <Button onClick={ goHome }>홈으로 가기</Button>
  </Container>
}