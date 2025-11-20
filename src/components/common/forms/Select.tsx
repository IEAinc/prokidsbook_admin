import React, { useState } from 'react'
import { BsChevronDown,BsChevronUp } from 'react-icons/bs'

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  width?: string
  openDirection?: "top" | "bottom"
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, width = "100%", openDirection = "bottom" }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative" style={{ width }}>
      {/* 셀렉트 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full 
          p-2 
          border 
          rounded 
          bg-white 
          dark:bg-zinc-700 
          flex 
          justify-between 
          items-center
          transition-colors
          ${isOpen
                ? 'border-[#33BB9A]'
                : 'border-gray-300 hover:border-[#33BB9A]'
              }
        `}
        >
        <span>{value}</span>
        {isOpen
          ? <BsChevronUp className="ml-1 text-[#33BB9A]" />
          : <BsChevronDown className="ml-1" />
        }
      </button>


      {/* 드롭다운 목록 */}
      {isOpen && (
        <ul
          className={`absolute w-full border border-gray-200 rounded bg-white dark:bg-zinc-700 shadow-md z-50 overflow-hidden ${
            openDirection === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              className={`p-2 cursor-pointer ${
                value === option ? "bg-[#E0ECE9] dark:bg-gray-500" : "hover:bg-gray-100 hover:dark:bg-gray-600"
              }`}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select