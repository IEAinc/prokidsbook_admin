/* 미사용 컴포넌트 */
// components/imageDetail/ImageDetailModal.tsx
/* 아이콘 */
import { HiChevronRight } from "react-icons/hi";
interface Story {
  id: string;
  title: string;
}

interface ImageDetailProps {
  userName: string;
  userImage: string;
  createdAt: string;
  prompt: string;
  isBanned?: boolean;
  referenceImage: string;
  stories: Story[];
  onStoryClick?: (story: Story) => void;  // Story 객체 전체를 받도록 수정
  activeStoryId?: string | null;  // 현재 활성화된 스토리 ID
}

const ImageDetailModal = ({
  userName,
  userImage,
  createdAt,
  prompt,
  isBanned,
  referenceImage,
  stories,
  onStoryClick,
  activeStoryId
}: ImageDetailProps) => {
  return (
    <>
      {/* 사이드바 컨텐츠 */}
      <div>
        {/* 회원정보 */}
        <div>
          <p className="text-base font-bold text-black mb-2">회원정보</p>
          <div className="flex items-center gap-2">
            <img src={userImage} alt="프로필 이미지" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-light">{userName}</span>
          </div>
        </div>

        {/* 생성일 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">생성일</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-light">{createdAt}</p>
          </div>
        </div>

        {/* 프롬프트 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">프롬프트</p>
          <div className="flex items-center gap-2">
            <p className={`text-sm font-light ${isBanned ? 'text-rose-500' : 'text-black'}`}>{prompt}</p>
          </div>
        </div>

        {/* 사용자 이미지 */}
        <div className="mt-4">
          <p className="text-base font-bold text-black mb-2">사용자 이미지</p>
          <div className="flex items-center gap-2">
            <img src={referenceImage} alt="사용자 이미지" className="w-20 h-20 object-contain bg-white" />
          </div>
        </div>

        {/* 제작한 동화 : 1개 이상 존재할 경우에만 렌더링 */}
        {stories && stories.length > 0 && (
          <div className="mt-4">
            <p className="text-base font-bold text-black mb-2">제작한 동화</p>
            <div className="flex flex-col items-center gap-2">
              {stories.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  className={`w-full py-2 border-gray-200 border-b flex items-center justify-between transition-colors
            ${activeStoryId === story.id
                      ? 'text-[#33BB9A] border-[#33BB9A]'
                      : 'hover:text-[#33BB9A] hover:border-[#33BB9A]'
                    }`}
                  onClick={() => onStoryClick?.(story)}
                >
                  <span className="text-sm font-bold">{story.title}</span>
                  <HiChevronRight />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDetailModal;