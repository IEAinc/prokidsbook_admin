import React, { useState } from 'react'
/* 아이콘 */
import {MdOutlineAutorenew} from "react-icons/md";
import {IoSearch} from "react-icons/io5";
/* 컴포넌트 */
import CustomDatePicker from "../../common/datePickers/DatePicker.tsx";
import Btn from "../../common/buttons/Btn.tsx";
import Input from "../../common/forms/Input.tsx"

const SearchFilter: React.FC = () => {
  /* UseState */
  const [startDate, setStartDate] = useState<Date | null>(null);
  // 팝업 - 날짜(시작일)
  const [endDate, setEndDate] = useState<Date | null>(new Date()) // 팝업 - 날짜(종료일)
  const [, setSearchType] = useState("전체") //searchType
  const [searchQuery, setSearchQuery] = useState("")
  const resetFilters = () => {
    setSearchType("전체");
    setSearchQuery("");
    setStartDate(startDate);
    setEndDate(endDate);
  }

  return (
    <div>
      {/* 필터 섹션 */}
      <div className="flex justify-end items-center gap-1">
        <p className="text-sm font-bold mr-2">등록일</p>
        <CustomDatePicker
          setDates={(start, end) => {
            // 날짜가 변경될 때 실행될 콜백 함수
            setStartDate(start);
            setEndDate(end);
          }}
          initStartDate={new Date()} // null 체크 추가
          initEndDate={new Date()}   // 종료일을 오늘 날짜로 설정
          hideButtons={true}         // 빠른 선택 버튼 숨기기
        />
        <div className="max-w-[200px]">
          <Input
            id="title"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="검색어를 입력해주세요."
          />
        </div>
        <div className="flex justify-center items-center gap-1">
          {/* 검색 버튼 */}
          <Btn
            type="button"
            background="color"
            color="green"
            size="md"
            onClick={() => {
              console.log('검색')
            }}
          >
            <IoSearch className="mr-1" /> 검색
          </Btn>
          {/* 초기화 버튼 */}
          <Btn
            type="button"
            background="regular"
            size="md"
            onClick={resetFilters}
          >
            <MdOutlineAutorenew className="mr-1" /> 초기화
          </Btn>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter