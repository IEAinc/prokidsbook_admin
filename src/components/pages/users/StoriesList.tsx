/**
 * @file StoriesList.tsx
 * @description 회원 관리 > 생성 이미지 관리 > 동화 이미지 리스트
 */
import { useState, useEffect } from 'react'
import { isToday, isYesterday } from 'date-fns'
import Checkbox from '../../common/forms/Checkbox'

interface StoryImage {
  chapter_no: number
  story_img_url: string
  ban?: boolean
  alt?: string
}

interface StoryItem {
  user_id: string
  story_no: number
  story_img_list: StoryImage[]
}

interface DateGroupedImageList {
  date: string
  items: StoryItem[]
}

interface StoriesListProps {
  storyList: DateGroupedImageList[]
  selectedMode: boolean
  onStoryClick?: (userId: string, storyNo: number, isBanned?: boolean) => void
  onSelectCountChange?: (count: number) => void
}

const StoriesList = ({ storyList, selectedMode, onStoryClick, onSelectCountChange }: StoriesListProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})

  /** 날짜 표시 포맷팅 (오늘/어제/날짜) */
  const getDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isToday(date)) return '오늘'
    if (isYesterday(date)) return '어제'
    return dateStr
  }

  /* 개별 체크 */
  const handleCheckboxChange = (storyNo: number, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [storyNo]: checked,
    }))
  }

  /* 날짜별 전체 선택 */
  const handleSelectAllChange = (checked: boolean, items: StoryItem[]) => {
    const updated = { ...checkedItems }
    items.forEach((item) => {
      updated[item.story_no] = checked
    })
    setCheckedItems(updated)
  }

  /* 날짜별 전체 선택 상태 */
  const isAllChecked = (items: StoryItem[]) =>
    items.length > 0 && items.every((item) => checkedItems[item.story_no] === true)

  /* 카드 클릭 */
  const handleCardClick = (item: StoryItem, img: StoryImage) => {
    if (selectedMode) {
      const current = checkedItems[item.story_no] || false
      handleCheckboxChange(item.story_no, !current)
      return
    }
    onStoryClick?.(item.user_id, item.story_no, img.ban)
  }

  /* 선택 개수 카운트 */
  useEffect(() => {
    const count = Object.values(checkedItems).filter(Boolean).length
    onSelectCountChange?.(count)
  }, [checkedItems])

  return (
    <div>
      {storyList.map(({ date, items }) => (
        <div key={date}>

          {/* 날짜 / 전체 체크 */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
              <p>{getDisplayDate(date)}</p>
              <p><span>{items.length}</span>개</p>
            </div>

            {selectedMode && (
              <Checkbox
                id={`select-all-${date}`}
                checked={isAllChecked(items)}
                onChange={(checked) => handleSelectAllChange(checked, items)}
              />
            )}
          </div>

          {/* 스토리(동화) 리스트 */}
          <ul className="grid grid-cols-8 gap-2 p-4">
            {items.map((item) => {
              const isChecked = checkedItems[item.story_no] || false

              return item.story_img_list.map((img) => (
                <li
                  key={img.chapter_no}
                  className="relative border border-gray-200 rounded aspect-square overflow-hidden cursor-pointer"
                  onClick={() => handleCardClick(item, img)}
                >
                  {/* 체크박스 - chapter_no가 1인 경우에만 표시 */}
                  {selectedMode && img.chapter_no === 1 && (
                    <div
                      className="absolute top-2 left-2 z-10 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        id={`${item.story_no}-${img.chapter_no}-checkbox`}
                        checked={isChecked}
                        onChange={(checked) => handleCheckboxChange(item.story_no, checked)}
                      />
                    </div>
                  )}

                  {/* === ban 이미지 처리 === */}
                  {img.ban ? (
                    <div
                      className={`w-full h-full bg-rose-50 flex justify-center items-center transition-transform ${selectedMode && isChecked ? 'scale-90' : 'scale-100'
                        }`}
                    >
                      생성 실패 이미지
                    </div>
                  ) : (
                    <img
                      src={img.story_img_url}
                      alt={img.alt || 'thumbnail'}
                      className={`w-full h-full object-contain transition-transform duration-200 ${selectedMode && isChecked ? 'scale-90' : 'scale-100'
                        }`}
                    />
                  )}
                </li>
              ))
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default StoriesList