'use client';

import Logo from "./Logo";
import SearchInput from './SearchInput';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
const Absolute = styled.div`
  position: absolute;
  bottom: 60px;
`;


export default function Home() {
  return (
    <Wrapper>
      <Absolute>
        <Logo />
      </Absolute>
      <SearchInput />
    </Wrapper>
  );
}
