
import React, { useState, useEffect } from 'react';

import { styled } from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 80px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171A20;
  color: #fff;
  border-radius: 24px;
  font-size: 10px;
  line-height: 12.1px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  width: 169px;
  top: calc(100% + 4px);
  right: 0;
  background-color: #171A20;
  border-radius: 8px;
  padding: 8px 0;
`;

const ScrollArea = styled.div`
  overflow-y: auto;
  overscroll-behavior: contain;
  &::-webkit-scrollbar-thumb {
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
`;


const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: right;
  color: #fff;
  background-color: #171A20;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.selected {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

interface DropdownProps {
  items: string[];
  selected: string;
  defaultText?: string;
  onSelect: (item: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const { items = [], selected = '', defaultText = '', onSelect } = props;
  const [isDropdown, setIsDropdown] = useState(false);
  const scrollAreaEl = React.createRef<HTMLDivElement>();
  const selectedIdx = items.findIndex(item => item === selected);

  function toggleDropdown() {
    setIsDropdown(!isDropdown);
  }

  function selectItem(idx: number) {
    setIsDropdown(false);
    onSelect(items[idx]);
    toggleDropdown();
  }

  useEffect(() => {
    if (!isDropdown) return;

    const scrollTarget = document.querySelector('.infinite-scroll-component');
    if (!scrollTarget) return;

    const closeDropdown = () => {
      setIsDropdown(false);
    }
    scrollTarget.addEventListener('scroll', closeDropdown);
    return () => {
      scrollTarget.removeEventListener('scroll', closeDropdown);
    }
  }, [isDropdown]);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isDropdown && !scrollAreaEl.current?.contains(e.currentTarget as Node)) {
        setIsDropdown(false);
      }
    }
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    }
  }
  , [isDropdown]);


  useEffect(() => {
    if (!isDropdown) return;

    const closeDropdown = () => {
      setIsDropdown(false);
    }
    window.addEventListener('resize', closeDropdown);
    return () => {
      window.removeEventListener('resize', closeDropdown);
    }
  }, [isDropdown]);

  useEffect(() => {
    const calculateOverrideValues = () => {
      if (!isDropdown) return;
      const scrollArea = scrollAreaEl.current;
      
      if (!scrollArea) return;
      const maxHeight = 572;
      const gap = 40;
      const scrollAreaTop = scrollArea.getBoundingClientRect().top;
      const windowContentHeight = window.innerHeight;

      if (scrollAreaTop + maxHeight > windowContentHeight) {
        scrollArea.style.height = `${windowContentHeight - scrollAreaTop - gap}px`;
      } else {
        scrollArea.style.height = maxHeight + 'px';
      }
  }
    calculateOverrideValues();
  }, [isDropdown]);


  return (
    <Container>
      <Button onClick={toggleDropdown}>
        {selected || defaultText}
      </Button>
      {
        isDropdown && (
          <DropdownWrapper>
            <ScrollArea ref={scrollAreaEl}>
              {
                items.map((item, idx) => (
                  <DropdownItem 
                    key={idx} 
                    onClick={() => selectItem(idx)}
                    className={selectedIdx === idx ? 'selected' : ''}
                    >
                    {item}
                  </DropdownItem>
                ))
              }
            </ScrollArea>
          </DropdownWrapper>
        )
      }
    </Container>
  );
}