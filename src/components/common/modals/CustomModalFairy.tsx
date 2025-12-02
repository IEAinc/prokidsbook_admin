/**
 * @file CustomModalFairy.tsx
 * @description 회원 관리 > 생성 이미지 관리 > 동화 상세 모달
 */
import { useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { HiX } from "react-icons/hi"

import Btn from '../buttons/Btn.tsx'
import FairyTale from '../../pages/users/swiperContents/FairyTale.tsx'

interface UserFairyData {
  user_id: string
  user_name: string
  user_img: string
  story_no: number
  story_title: string
  story_dt: string
  stories: {
    story_no: number | null
    story_prompt: string
    story_img_url: string
    story_text: string
  }[]
  user_img_list: {
    charcNo: number
    charc_img_url: string
  }[]
}

interface CustomModalFairyProps {
  isOpen: Boolean
  isBanned?: boolean
  sidebarWidth?: string // 사이드바 너비 (기본값 설정 가능)
  activeStoryId?: string | null  // 현재 활성화된 스토리 ID
  userData: UserFairyData
  onClose: () => void
  onUserClick?: (charcNo: number) => void
}

/* 날짜 변환 TODO: util로 이동 */
const formatDate = (dt: string) => {
  const date = parseISO(dt)
  const formatted = format(date, 'yyyy-MM-dd hh:mm:ss')
  return formatted
}

const CustomModalFairy = ({
  isOpen,
  userData,
  onClose,
  isBanned = false,
  onUserClick,
  sidebarWidth = "300px"
}: CustomModalFairyProps) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' //모달이 열릴 때 body 스크롤 막기
    } else {
      document.body.style.overflow = 'unset' //모달이 닫힐 때 body 스크롤 복원
    }
    return () => {
      document.body.style.overflow = 'unset' // 컴포넌트가 언마운트될 때 스크롤 복원
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex z-50">
      {/* 배경 */}
      <div
        className="fixed inset-0 bg-black/20 transition-opacity"
        onClick={onClose}
      />
      {/* 사이드바 */}
      <div
        className="fixed bg-white right-0 top-0 h-screen  shadow-xl p-4 overflow-auto z-[51]"
        style={{ width: sidebarWidth || '300px' }}
      >
        {/* 회원정보 */}
        <div>
          <p className="text-base font-bold text-black mb-2">회원정보</p>
          <div className="flex items-center gap-2">
            <img src={userData.user_img} alt="프로필 이미지" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-light">{userData.user_name}</span>
          </div>
        </div>
        {/* 동화 제목 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">동화 제목</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-light">{userData.story_title}</p>
          </div>
        </div>
        {/* 동화 생성일 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">생성일</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-light">{formatDate(userData.story_dt)}</p>
          </div>
        </div>
        {/* 프롬프트 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">프롬프트</p>
          <div className="flex items-center gap-2">
            <p className={`text-sm font-light ${isBanned ? 'text-rose-500' : 'text-black'}`}>
              {userData.stories[0]?.story_prompt}
            </p>
          </div>
        </div>
        {/* 사용자 이미지 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">사용자 이미지</p>
          <div className="flex items-center gap-2">
            {userData?.user_img_list && userData.user_img_list.length > 0 ? (
              userData.user_img_list.map((userImg) => (
                <img
                  key={userImg.charcNo} // 고유한 key 추가
                  src={userImg.charc_img_url}
                  alt="사용자 이미지"
                  className="h-full object-contain"
                  onClick={() => onUserClick?.(userImg.charcNo)}
                />
              ))
            ) : (
              <p className="text-gray-500">사용자 이미지를 찾을 수 없습니다.</p> // user_img_list가 없거나 비어 있을 경우 메시지 표시
            )}
          </div>
        </div>
      </div>
      {/* 동화책 이미지 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex items-center justify-end">
          <Btn
            type="button"
            background="icon"
            onClick={onClose}
          >
            <HiX className="w-8 h-8 text-black" />
          </Btn>
        </div>
        <div className="w-[90vh] h-[50vh] bg-white rounded-xl overflow-hidden">
          {isBanned ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
              이미지 생성 실패
            </div>
          ) : (
            <FairyTale
              title={userData.story_title}
              pages={userData.stories.map(story => ({
                image: story.story_img_url,
                content: story.story_text
              }))}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomModalFairy