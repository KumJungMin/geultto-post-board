import { styled } from 'styled-components';

interface LabelGroupProps {
  labels: string[];
}

const LabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;


const Label = styled.span<{$bgColor: string}>`
  padding: 4px 12px;
  background-color: ${props => props.$bgColor};
  border-radius: 16px;
  font-size: 12px;
  color: #fff;
  word-break: break-all;
`;

function isKorean(text: string) {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
}

export default function LabelGroup({ labels }: LabelGroupProps) {
  return (
    <LabelWrapper>
      { labels.map((label, index) => (
        <Label key={index} $bgColor={isKorean(label) ? '#A0A0A0': '#686868'} >{label}</Label>
      ))
      }
    </LabelWrapper>
  )
};