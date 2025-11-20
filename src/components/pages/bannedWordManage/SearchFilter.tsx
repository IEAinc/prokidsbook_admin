import React, { useState } from 'react'
/* 아이콘 */
import {MdOutlineAutorenew} from "react-icons/md";
import {IoSearch} from "react-icons/io5";
/* 컴포넌트 */
import Select from "../../common/forms/Select.tsx";
import Btn from "../../common/buttons/Btn.tsx";
import Input from "../../common/forms/Input.tsx"

const SearchFilter: React.FC = () => {
  /* UseState */
  const [searchType, setSearchType] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")
  const resetFilters = () => {
    setSearchType("전체");
    setSearchQuery("");
  }
  return (
    <div>
      {/* 필터 섹션 */}
      <div className="flex justify-end items-center gap-1">
        <Select
          width="100px"
          value={searchType}
          onChange={setSearchType}
          options={["전체", "KR", "EN", "CN", "JP", "VN"]}
        />
        <div className="max-w-[200px] mr-2">
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