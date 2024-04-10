'use client'
// TODO: 애니메이션 추가하기
// TODO: 이벤트 동작 수정하기

import React, { useState } from 'react';
import { styled } from 'styled-components';

const Form = styled.form`
  position: relative;
`;

const Input = styled.input`
  width: 342px;
  height: 56px;
  border-radius: 23px;
  background-color: #1E1E1E;
  padding: 0 84px 0 24px;
  color: #fff;
  font-size: 13px;
  transition: box-shadow 0.2s;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 14px;
  top: -14px;
  width: 54px;
  height: 54px;
  border-radius: 22px;
  background-color: #0459F7;
  font-size: 24px;
  color: #fff;
`;

export default function SearchInput() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="‘전체보기’를 입력하면 전체 글을 불러옵니다."
      />
      <Button>
        {'>'}
      </Button>
    </Form>
  );
}