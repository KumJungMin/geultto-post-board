'use client';
import { useEffect, useState } from 'react';
import type { Filter } from '../../types'

import Logo from "../ui/Logo";
import SearchInput from './SearchInput';
import { styled } from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 84px;
`;

const Absolute = styled.div`
  position: absolute;
  bottom: 60px;
`;

const SelectBoxWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  gap: 8px;
  transform: translateX(180px);
  bottom: 0;
  @media (max-width: 534px) {
    bottom: -38px;
    transform: translateX(74px);
  }
`;

const SelectBox = styled.input<{$isSelect: boolean}>`
  display: none;
  ~ label {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.$isSelect ? '#0459F7' : '#9FA0A1'};
  }
`;

interface SearchHeaderProps {
  handleSubmit: (data: { keyword: string, filter: Filter }) => void;
  currFilter?: Filter;
  currKeyword?: string;
}

export default function SearchHeader({ handleSubmit, currFilter, currKeyword }: SearchHeaderProps) {
  const [filter, setFilter] = useState<Filter>('dt');
  const [keyword, setKeyword] = useState('');


  useEffect(() => {
    if (currFilter) setFilter(currFilter);
    if (currKeyword) setKeyword(currKeyword);
  }, [currFilter, currKeyword]);

  function changeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value as Filter);
  }

  function isSelect(text: Filter) {
    return filter === text;
  }

  function onSubmit() {
    handleSubmit({ keyword, filter });
  }

  return (
    <Container>
      <Absolute>
        <Logo />
      </Absolute>
      <SearchInput text={keyword} onChange={setKeyword} onSubmit={onSubmit}/>
      <SelectBoxWrapper>
        <div>
          <SelectBox 
            type='radio' 
            id='dt' 
            name="filter" 
            value='dt' 
            $isSelect={isSelect('dt')} 
            onChange={changeFilter} 
          />
          <label htmlFor='dt'>날짜</label>
        </div>
        <div>
          <SelectBox 
            type='radio' 
            id='relevance' 
            name="filter" 
            value='relevance' 
            $isSelect={isSelect('relevance')} 
            onChange={changeFilter}
          />
          <label htmlFor='relevance'>관련순</label>
        </div>
      </SelectBoxWrapper>
    </Container>
  );
}
