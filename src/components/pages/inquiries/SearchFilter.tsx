import React, { useState } from 'react'
/* 아이콘 */
import {MdOutlineAutorenew} from "react-icons/md";
import {IoSearch} from "react-icons/io5";
/* 컴포넌트 */
import Select from "../../common/forms/Select.tsx";
import Input from "../../common/forms/Input.tsx"

const SearchFilter: React.FC = () => {
    const [searchType, setSearchType] = useState("전체")
    const [searchQuery, setSearchQuery] = useState("")
    const resetFilters = () => {
        setSearchType("전체")
        setSearchQuery("")
    }

    return (
        <div>
            {/* 필터 섹션 */}
            <div className="flex justify-end items-center gap-1">
                <Select
                    width="100px"
                    value={searchType}
                    onChange={setSearchType}
                    options={["전체", "아이디", "이름", "연락처"]}
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
                    <button
                        onClick={resetFilters}
                        className="px-4 py-2 rounded font-semibold cursor-pointer text-semibold bg-gray-200 hover:bg-gray-300 flex items-center"
                    >
                        <MdOutlineAutorenew className="mr-1" /> 초기화
                    </button>
                    <button className="px-4 py-2 bg-primary-main cursor-pointer font-semibold text-white flex items-center rounded hover:bg-[#2BAA8B]">
                        <IoSearch className="mr-1" /> 검색
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter