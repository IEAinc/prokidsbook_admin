/**
 * @file ImageList.tsx
 * @description 회원 관리 > 생성 이미지 관리 > 캐릭터 이미지 리스트
 */
import { useState, useEffect } from 'react'
import Checkbox from '../../common/forms/Checkbox'

interface ImageItem {
  charcNo: number
  user_id: string
  img_url?: string
  alt?: string
  time_stamp: string
  ban: boolean
}

interface DateGroupedImageList {
  date: string
  items: ImageItem[]
}

interface ImageListProps {
  imageList: DateGroupedImageList[]
  selectedMode: boolean
  onImageClick?: (userId: any, charcId: any) => void
  onSelectCountChange?: (count: number) => void
}

const ImageList = ({
  imageList,
  selectedMode,
  onImageClick,
  onSelectCountChange
}: ImageListProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})

  /** 개별 체크 */
  const handleCheckboxChange = (charcNo: number, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [charcNo]: checked,
    }))
  }

  /** 날짜별 전체 선택 */
  const handleSelectAllChange = (checked: boolean, items: ImageItem[]) => {
    const updated = { ...checkedItems }
    items.forEach((item) => (updated[item.charcNo] = checked))
    setCheckedItems(updated)
  }

  /** 카드 클릭 시 동작 분기 */
  const handleCardClick = (item: ImageItem) => {
    if (selectedMode) {
      const current = checkedItems[item.charcNo] || false // 선택 모드 → 체크박스만 토글
      handleCheckboxChange(item.charcNo, !current)
      return
    }
    onImageClick?.(item.user_id, item.charcNo) // 선택 모드가 아닐 때만 모달 콜백 호출
  }

  useEffect(() => {
    const count = Object.values(checkedItems).filter(Boolean).length
    onSelectCountChange?.(count)
  }, [checkedItems])

  return (
    <div>
      {imageList.map(({ date, items }) => {
        const allChecked =
          items.length > 0 &&
          items.every((item) => checkedItems[item.charcNo] === true)

        return (
          <div key={date} className="mb-4">
            {/* ===== 날짜 헤더 ===== */}
            <div className="flex justify-between items-center py-2">
              {/* 날짜 영역 */}
              <div className="flex items-center gap-4">
                <p className="font-semibold">{date}</p>
                <p className="text-gray-500">
                  <span>{items.length}</span>개
                </p>
              </div>
              {/* === 전체 선택 체크박스 === */}
              {selectedMode && (
                <Checkbox
                  id={`select-all-${date}`}
                  checked={allChecked}
                  onChange={(checked) => handleSelectAllChange(checked, items)}
                />
              )}
            </div>
            {/* ===== 이미지 리스트 ===== */}
            <div className="p-4">
              <ul className="grid grid-cols-8 gap-2">
                {items.map((item) => {
                  const isChecked = checkedItems[item.charcNo] || false
                  return (
                    <li
                      key={`${item.charcNo}-${item.time_stamp}`}
                      className="relative border border-gray-200 rounded aspect-square overflow-hidden cursor-pointer"
                      onClick={() => handleCardClick(item)}
                    >
                      {/* === 개별 체크박스 === */}
                      {selectedMode && (
                        <div
                          className="absolute top-2 left-2 z-10"
                          onClick={(e) => e.stopPropagation()} // 이미지 클릭 이벤트 방지
                        >
                          <Checkbox
                            id={`checkbox-${item.charcNo}`}
                            checked={isChecked}
                            onChange={(checked) =>
                              handleCheckboxChange(item.charcNo, checked)
                            }
                          />
                        </div>
                      )}
                      {/* === 이미지 === */}
                      {!item.ban ? (
                        <img
                          src={item.img_url}
                          alt={item.alt || 'image'}
                          className={`w-full h-full object-contain transition-transform duration-200 ${selectedMode && isChecked ? 'scale-90' : 'scale-100'
                            }`}
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-rose-50 flex justify-center items-center transition-transform ${selectedMode && isChecked ? 'scale-90' : 'scale-100'
                            }`}
                        >
                          생성 실패 이미지
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ImageList