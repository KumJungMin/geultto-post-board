import { styled } from 'styled-components';
import Link from 'next/link';
import dayjs from 'dayjs';

import LabelGroup from './LabelGroup';

interface CardProps {
  data: {
    title: string;
    name: string;
    cohort: string;
    tags: string;
    dt: string;
    content_url: string;
  }
}

const Container = styled.div`
  background-color: #fff;
  height: 100%;
  min-height: 200px;
  padding: 28px 34px;
  border-radius: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.1s;
  &:hover {
    background-color: #f9f9f9;
  }
  &:active {
    background-color: #f1f1f1;
  }
`;

const Title = styled.h3`
  font-size: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 23px;
  height: 47px;
`;

const Font = styled.p<{fontSize: number}>`
  font-size: ${props => props.fontSize}px;
`;

const Content = styled.div`
  display: grid;
  gap: 8px;
`;


export default function Card({ data }:CardProps) {
  function formatDt(dt: string) {
    if (!dt) return '';
    return dayjs(dt).format('YYYY MM월 DD일 작성');
  }
  return (
    <Link href={data.content_url} target="_blank">
      <Container>
        <Title>{data.title}</Title>
        <Content>
          <Font fontSize={14}>{data.cohort} {data.name}</Font>
          <Font fontSize={10}>{formatDt(data.dt)}</Font>
          { data.tags && <LabelGroup labels={data.tags.split(',')} /> }
        </Content>
      </Container>
    </Link>      
  );
}