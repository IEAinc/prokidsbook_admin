import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays } from 'date-fns'
import { ko }from 'date-fns/locale/ko'
import { HiCalendar } from 'react-icons/hi2'

interface CustomDatePickerProps {
  setDates: (start: Date, end: Date) => void;
  hideButtons?: boolean; // 버튼 숨김 옵션 추가
  initStartDate?: Date;  // 시작일 초기값 옵션 추가
  initEndDate?: Date;    // 종료일 초기값 옵션 추가
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
                                                             setDates,
                                                             hideButtons = false,
                                                             initStartDate = new Date(),
                                                             initEndDate = addDays(new Date(), 7)}) => {
  /* UseState */
  const [startDate, setStartDate] = useState(initStartDate)
  const [endDate, setEndDate] = useState(initEndDate)
  const [selectedButton, setSelectedButton] = useState<number | null>(null)
  const [isStartDateFocused, setIsStartDateFocused] = useState(false);
  const [isEndDateFocused, setIsEndDateFocused] = useState(false);


  const handleDateChange = (start: Date | null, end: Date | null) => {
    if (!start || !end) return
    setStartDate(start)
    setEndDate(end)
    setDates(start, end)
  }

  const handleQuickSelect = (days: number) => {
    const today = new Date()
    const newStartDate = addDays(today, -days)
    setStartDate(newStartDate)
    setEndDate(today)
    setDates(newStartDate, today)
    setSelectedButton(days) // 선택된 버튼 업데이트
  }


  return (
    <div className="relative flex items-center gap-2 flex-wrap">
      {/* 날짜 선택 컨테이너 */}
      <div className="flex items-center flex-wrap max-w-80">
        <div
          className={`
          w-[calc(50%-10px)]
          flex
          items-center
          space-x-2
          px-1
          py-1
          cursor-pointer
          border
          rounded
          transition-colors
          bg-white
         dark:bg-zinc-700 
          ${isStartDateFocused ? 'border-[#33BB9A]' : 'border-gray-300'}
        `}>
          <HiCalendar className="text-[#33BB9A] w-10" />
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date as Date, endDate)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
            dateFormat="yyyy-MM-dd"
            className={`outline-none bg-transparent cursor-pointer w-full py-1 z-50 
            ${!startDate ? 'text-[12px] text-gray-400 py-2' : ''}`}
            placeholderText="날짜를 선택해주세요"
            onFocus={() => setIsStartDateFocused(true)}
            onBlur={() => setIsStartDateFocused(false)}
            calendarClassName="border border-gray-300 rounded-lg shadow-lg bg-white"
            popperClassName="z-[50]"
          />
        </div>

        <span className="mx-1 text-gray-500">~</span>
        <div
          className={`
          w-[calc(50%-10px)]
          flex
          items-center
          space-x-2
          px-1
          py-1
          cursor-pointer
          border
          rounded
         bg-white
         dark:bg-zinc-700 
          transition-colors
          ${isEndDateFocused ? 'border-[#33BB9A]' : 'border-gray-300'}
          `}
        >
          <HiCalendar className="text-[#33BB9A] w-10" />
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange(startDate, date as Date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy-MM-dd"
            className="outline-none bg-transparent cursor-pointer w-full py-1 z-20"
            calendarClassName="border border-gray-300 rounded-lg shadow-lg p-2 bg-white"
            onFocus={() => setIsEndDateFocused(true)}
            onBlur={() => setIsEndDateFocused(false)}
            popperClassName="z-[50]"
            popperPlacement="bottom-end"
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center space-x-2 ">
        {/* hideButtons가 false일 때만 버튼들이 보이도록 수정 */}
        {!hideButtons && (
          <div className="flex justify-start flex-wrap gap-2">
            {[
              { label: "오늘", days: 0 },
              { label: "7일", days: 7 },
              { label: "1개월", days: 30 },
              { label: "3개월", days: 90 },
              { label: "6개월", days: 180 },
              { label: "1년", days: 365 },
            ].map(({ label, days }) => (
              <button
                key={label}
                onClick={() => handleQuickSelect(days)}
                className={`px-2 py-1 text-sm rounded transition-colors
          ${selectedButton === days
                  ? 'bg-primary-main text-white' // 선택된 버튼 스타일
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 hover:dark:bg-gray-500'  // 기본 버튼 스타일
                }`}

              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomDatePicker