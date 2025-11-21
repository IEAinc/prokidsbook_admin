// 캐릭터 상세 모달

import { useEffect } from 'react';
import { format, parseISO, addHours } from 'date-fns';
/* 아이콘 */
import { HiChevronRight, HiX } from "react-icons/hi";

/* 컴포넌트 */
import Btn from '../buttons/Btn.tsx'
interface UserData {
  user_id: string;
  user_name: string;
  user_img: string;
  charc_no: number;
  charc_dt: string;
  charc_prompt: string;
  charc_img_url: string;
  story_list: {
    story_no: number;
    story_title: string;
  }[];
}

interface CustomModalCharcProps {
  isOpen: Boolean;
  onClose: () => void;
  isBanned?: boolean;
  onStoryClick?: (storyNo: number) => void;
  sidebarWidth?: string; // 사이드바 너비 (기본값 설정 가능)
  activeStoryId?: string | null;  // 현재 활성화된 스토리 ID
  userData: UserData;
}

const CustomModalCharc = ({
  isOpen,
  onClose,
  isBanned = false,
  onStoryClick,
  userData,
  sidebarWidth = "300px", // 기본 너비
}: CustomModalCharcProps) => {

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body 스크롤 막기
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트가 언마운트될 때 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (!isOpen) return null;

  /* 날짜 변환 */


  const formatDate = (dt: string) => {
    const date = parseISO(dt);
    const formatted = format(date, 'yyyy-MM-dd hh:mm:ss');
    return formatted;
  }

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

        {/* 생성일 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">생성일</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-light">{formatDate(userData.charc_dt)}</p>
          </div>
        </div>

        {/* 프롬프트 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">프롬프트</p>
          <div className="flex items-center gap-2">
            <p className={`text-sm font-light ${isBanned ? 'text-rose-500' : 'text-black'}`}>
              {userData.charc_prompt}
            </p>
          </div>
        </div>

        {/* 사용자 이미지 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">사용자 이미지</p>
          <div className="flex items-center gap-2">
            <img src={userData.charc_img_url} alt="사용자 이미지" className="w-20 h-20" />
          </div>
        </div>
        {/* 모달 컨테이너 */}
        <div>
          {/* 제작한 동화 : 1개 이상 존재할 경우에만 렌더링 */}
          {userData.story_list && userData.story_list.length > 0 && (
            <div className="mt-4">
              <p className="text-base font-bold text-black mb-2">제작한 동화</p>
              <div className="flex flex-col items-center gap-2">
                {userData.story_list.map((story) => (
                  <button
                    key={story.story_no}
                    type="button"
                    className={`w-full py-2 border-gray-200 border-b flex items-center justify-between transition-colors
                  `
                    }
                    onClick={() => {
                      onStoryClick?.(story.story_no);
                    }}
                  >
                    <span className="text-sm font-bold">{story.story_title}</span>
                    <HiChevronRight />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 캐릭터 화면 */}
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
        <div className="w-[70vh] h-[70vh] bg-white rounded-xl overflow-hidden">
          <img
            src={userData.charc_img_url}
            alt="사용자 이미지"
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomModalCharc;