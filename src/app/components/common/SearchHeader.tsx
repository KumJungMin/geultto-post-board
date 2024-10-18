'use client';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import type { Filter, JobCategory } from '../../types'

import Logo from "../ui/Logo";
import SearchInput from './SearchInput';
import Dropdown from './Dropdown';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 100px;
  @media (max-width: 534px) {
    margin-top: 80px;
  }
`;

const Absolute = styled.div`
  position: absolute;
  bottom: 60px;
`;

const SelectBoxWrapper = styled.div`
  position: absolute;
  width: 342px;
  left: 50%;
  bottom: 0;
  display: flex;
  gap: 8px;
  transform: translateX(180px);
  bottom: 0;
  @media (max-width: 734px) {
    justify-content: space-between;
    transform: translate(-50%, 48px);
  }
  @media (max-width: 534px) {
    width: 300px;
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
  handleSubmit: (data: { keyword: string, filter: Filter, selectedItem: JobCategory }) => void;
  onFilterChange?: (data: { keyword: string, filter: Filter, selectedItem: JobCategory }) => void;

  dropdownItems?: string[];
  selectedDropdownItem?: string;
  hasFilter?: boolean;
  currFilter?: Filter;
  currKeyword?: string;
  style?: React.CSSProperties;
}

export default function SearchHeader(props: SearchHeaderProps) {
  const { 
    dropdownItems = [],
    selectedDropdownItem = '',
    currFilter, 
    currKeyword, 
    style, 
    hasFilter = false,
    handleSubmit, 
    onFilterChange = () => {}
  } = props;
  const [filter, setFilter] = useState<Filter>('dt');
  const [keyword, setKeyword] = useState('');
  const [selectedItem, setSelectedItem] = useState(selectedDropdownItem);


  useEffect(() => {
    if (currFilter) setFilter(currFilter);
    if (currKeyword) setKeyword(currKeyword);
  }, [currFilter, currKeyword]);

  useEffect(() => {
    if (selectedDropdownItem) setSelectedItem(selectedDropdownItem);
  }, [selectedDropdownItem]);

  function changeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const filter = e.target.value as Filter;
    setFilter(filter);
    onFilterChange({ keyword, filter, selectedItem });
  }

  function updateSelectedDropdownItem(item: JobCategory) {
    setSelectedItem(item);

    onFilterChange({ keyword, filter, selectedItem: item });
  }

  function isSelect(text: Filter) {
    return filter === text;
  }

  function onSubmit() {
    handleSubmit({ keyword, filter, selectedItem });
  }

  function handleKeywordChange(keyword: string) {
    setKeyword(keyword.trim());
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === ' ' && !keyword.length)  e.preventDefault();
    else if (e.key === 'Escape') setKeyword('');
  }

  return (
    <Container style={style}>
      <Absolute>
        <Logo />
      </Absolute>
        <SearchInput text={keyword} onChange={handleKeywordChange} onSubmit={onSubmit} onKeydown={handleKeydown}/>
      {
        hasFilter && (
          <SelectBoxWrapper>
            <div style={{ display: 'flex', gap: '8px' }}>
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
            </div>
            <Dropdown 
              items={dropdownItems} 
              selected={selectedItem} 
              defaultText='직군선택' 
              onSelect={updateSelectedDropdownItem}
              />
          </SelectBoxWrapper>
        )
      }
      
    </Container>
  );
}
