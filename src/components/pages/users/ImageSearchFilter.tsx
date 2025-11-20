import React, { useState } from 'react'
import { subDays } from 'date-fns';
/* 아이콘 */
import {MdOutlineAutorenew} from "react-icons/md";
import {IoSearch} from "react-icons/io5";
/* 컴포넌트 */
import CustomDatePicker from "../../common/datePickers/DatePicker.tsx";
import Btn from "../../common/buttons/Btn.tsx";
import Input from "../../common/forms/Input.tsx"
import Select from "../../common/forms/Select.tsx";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  setDates: (start: Date | null, end: Date | null) => void;
  onSearch: () => void;
  onReset: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
                                                     searchQuery,
                                                     setSearchQuery,
                                                     searchType,
                                                     setSearchType,
                                                     startDate,
                                                     endDate,
                                                     setDates,
                                                     onSearch,
                                                     onReset,
                                                   }) => {
  return (
    <div>
      <div className="flex justify-end items-center gap-1">
        <p className="text-sm font-bold mr-2">등록일</p>
        <CustomDatePicker
          setDates={(start, end) => setDates(start, end)}
          initStartDate={startDate ?? subDays(new Date(), 1)}
          initEndDate={endDate ?? new Date()}
          hideButtons
        />
        <Select
          width="100px"
          value={searchType}
          onChange={setSearchType}
          options={["캐릭터", "동화"]}
        />
        <div className="max-w-[250px] mr-2">
          <Input
            id="title"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="검색할 프롬프트를 입력해주세요."
          />
        </div>
        <div className="flex justify-center items-center gap-1">
          <Btn type="button" background="color" color="green" size="md" onClick={onSearch}>
            <IoSearch className="mr-1" /> 검색
          </Btn>
          <Btn type="button" background="regular" size="md" onClick={onReset}>
            <MdOutlineAutorenew className="mr-1" /> 초기화
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;