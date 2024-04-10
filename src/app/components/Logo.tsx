import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  letter-spacing: -14px;
`;

const Font = styled.div<{marginTop?: number}>`
  font-size: 40px;
  font-weight: 700;
  margin-top: ${props => props.marginTop}px;
`;

export default function Logo() {
  return (
    <Wrapper>
      <Font>ㄱ</Font>
      <Font marginTop={60}>ㄸ</Font>
    </Wrapper>
  );
}
