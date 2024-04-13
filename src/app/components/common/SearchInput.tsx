'use client'

import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import ArrowUpIcon from '../icons/ArrowUpIcon';

type SearchInputProps = {
  text?: string;
  onChange?: (search: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

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

  @media (max-width: 534px) {
    width: 300px;
  }
`;

const Button = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 14px;
  top: -14px;
  width: 54px;
  height: 54px;
  border-radius: 22px;
  background-color: #0459F7;
  font-size: 24px;
  color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0E6EF2;
  }
  &:active {
    background-color: #0A5AD9;
  }
`;


export default function SearchInput({ text = '', onChange = () => {}, onSubmit = () => {} }: SearchInputProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(text);
  }, [text])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
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
        <ArrowUpIcon style={{ transform: 'rotate(90deg)' }} />
      </Button>
    </Form>
  );
}