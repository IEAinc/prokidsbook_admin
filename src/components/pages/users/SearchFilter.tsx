import React, { useState } from 'react'
/* 아이콘 */
import { MdOutlineAutorenew } from "react-icons/md"
import { IoSearch } from 'react-icons/io5'
/* 컴포넌트 */
import Select from '../../common/forms/Select.tsx'
import Input from '../../common/forms/Input.tsx'
import CustomDatePicker from '../../common/datePickers/DatePicker.tsx'
import Btn from "../../common/buttons/Btn.tsx";

const SearchFilter: React.FC = () => {
    const [searchType, setSearchType] = useState("전체")
    const [searchQuery, setSearchQuery] = useState("")
    const joinOptions = ["카카오", "애플", "구글"]
    const [joinType, setJoinType] = useState<string[]>(["전체", ...joinOptions])
    const [memberType, setMemberType] = useState("전체")
    const [memberLevel, setMemberLevel] = useState("전체")
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())

    const handleCheckboxChange = (value: string) => {
        setJoinType((prev) => {
            const isSelected = prev.includes(value)
            let updatedJoinType

            if (isSelected) {
                updatedJoinType = prev.filter((item) => item !== value && item !== "전체")
            } else {
                updatedJoinType = [...prev, value]
            }

            if (updatedJoinType.length === joinOptions.length) {
                return ["전체", ...joinOptions]
            }

            return updatedJoinType
        })
    }

    const handleAllCheck = (checked: boolean) => {
        setJoinType(checked ? ["전체", ...joinOptions] : [])
    }

    const resetFilters = () => {
        setSearchType("전체")
        setSearchQuery("")
        setJoinType(["전체", "카카오", "구글", "애플"])
        setMemberType("전체")
        setMemberLevel("전체")
        setStartDate(startDate)
        setEndDate(endDate)
    }

    return (
      <div>
          {/* 필터 섹션 */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 dark:bg-zinc-700 dark:border-[#252731]">
              <div className="grid grid-cols-9 text-sm">
                  {/* 검색 */}
                  <div
                    className="border-b border-gray-300 dark:border-gray-600 rounded-tl-lg p-4 bg-[#E0ECE9] dark:bg-zinc-700  font-semibold flex items-center">
                      검색
                  </div>
                  <div className="border-b border-gray-200 dark:border-gray-600 dark:bg-[#252731] p-4 col-span-2 flex items-center space-x-2">
                      <Select
                        width="100px"
                        value={searchType}
                        onChange={setSearchType}
                        options={["전체", "아이디", "이름", "연락처"]}
                      />
                      <Input
                        id="searchQuery"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="검색어를 입력해주세요."
                      />
                  </div>

                  {/* 회원 구분 */}
                  <div className="border-b border-gray-300  dark:border-gray-600 p-4 bg-[#E0ECE9] dark:bg-zinc-700 font-semibold flex items-center">
                      회원 구분
                  </div>
                  <div className="p-4 col-span-2 border-b border-gray-200  dark:border-gray-600  dark:bg-[#252731]">
                      <Select
                        value={memberType}
                        onChange={setMemberType}
                        options={["전체", "경고", "일시정지", "영구정지", "멤버십"]}
                      />
                  </div>

                  {/* 날짜 선택 */}
                  <div className="p-4 bg-[#E0ECE9] dark:bg-zinc-700 font-semibold flex items-center row-span-2">날짜</div>
                  <div className="p-4 col-span-2 flex flex-col items-center justify-center row-span-2 dark:bg-[#252731]">
                      <CustomDatePicker setDates={(start, end) => {
                          setStartDate(start ?? new Date())
                          setEndDate(end ?? new Date())
                      }} />
                  </div>

                  {/* 가입 구분 */}
                  <div className="p-4 bg-[#E0ECE9] dark:bg-zinc-700  font-semibold flex items-center rounded">가입 구분</div>
                  <div className="p-4 col-span-2 flex items-center flex-wrap space-x-4 dark:bg-[#252731]">
                      <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={joinType.includes("전체")}
                            onChange={(e) => handleAllCheck(e.target.checked)}
                            className="w-4 h-4 accent-gray-500"
                          />
                          <span>전체</span>
                      </label>
                      {["카카오", "구글", "애플"].map((type) => (
                        <label key={type} className="flex items-center space-x-1">
                            <input
                              type="checkbox"
                              checked={joinType.includes(type)}
                              onChange={() => handleCheckboxChange(type)}
                              className="w-4 h-4 accent-gray-500"
                            />
                            <span>{type}</span>
                        </label>
                      ))}
                  </div>

                  {/* 회원 레벨 */}
                  <div className="p-4 bg-[#E0ECE9] dark:bg-zinc-700 font-semibold flex items-center">회원 레벨</div>
                  <div className="p-4 col-span-2 dark:bg-[#252731]">
                      <Select
                        value={memberLevel}
                        onChange={setMemberLevel}
                        options={[
                            "전체",
                            "성운",
                            "작은 별(빨강)",
                            "작은 별(주황)",
                            "작은 별(노랑)",
                            "작은 별(초록)",
                            "작은 별(하늘)",
                            "작은 별(파랑)",
                            "작은 별(보라)",
                            "반짝반짝 작은 별",
                            "알록달록 무지개 별",
                            "초신성"
                        ]}
                      />
                  </div>
              </div>
          </div>

          {/* 초기화 및 검색 버튼 */}
          <div className="flex justify-end space-x-2 mt-4">
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
    )
}

export default SearchFilter