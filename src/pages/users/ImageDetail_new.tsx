/* 미사용 페이지 */
import { useEffect,useState, useMemo } from 'react';
import {useNavigate} from "react-router-dom";

/* 이미지 */
import arrow_l from "../../assets/images/arrow_l.svg";

/* 아이콘 */
import { IoCheckmark } from "react-icons/io5";

/* 컴포넌트 */
import SearchFilter from "../../components/pages/users/ImageSearchFilter.tsx";
import ImageList from "../../components/pages/users/ImageList.tsx";
import Btn from "../../components/common/buttons/Btn.tsx";

/* 임시 이미지 */
import ch_img from "./../../assets/images/ch_img_active.svg"
import ch_img1 from "./../../assets/images/ch_img2.png"
import ch_img_sm from './../../assets/images/ch_sm_img.png'
import ch_img_md from './../../assets/images/ch_md_img.png'
import ch_story from './../../assets/images/ch_story.png'

/* 모달 */
import CustomModalFairy from "../../components/common/modals/CustomModalFairy.tsx";
import ImageDetailModal from "../../components/pages/users/ImageDetailModal.tsx";
import FairyTale from "../../components/pages/users/swiperContents/FairyTale.tsx";
import { useCustomToast, CustomToastContainer } from '../../components/common/modals/CustomToast';
import { toast } from 'react-toastify'; // toast.dismiss() 사용을 위해 추가


/* 인터페이스 정의 */
// 사용자에 관한 정보
interface User {
  id: string;
  userName: string;
  userImage: string;
}

// 프롬프트 정보
interface Prompt {
  words: string[];
}

// 캐릭터 정보
interface Character {
  id: string;
  image: string;
  createdAt: string;
  prompt: Prompt;
  creator: User;
  isDeleted?: boolean; // 삭제되었는지
  isBanned?: boolean; // 벤 처리 당했는지
}

// 이야기
interface Story {
  id: string;
  title: string;
  createdAt: string;
  characterId: string | null; // 해당 동화를 만든 캐릭터 ID (삭제될 가능성 고려)
  pages: StoryPage[];
}

// 동화 페이지 구성
interface StoryPage {
  image: string;
  content: string;
  prompt: Prompt;
  createdAt: string;
}

// 최종 인터페이스 구조
interface ImageGroup {
  title: string;
  date: string;
  characters: Character[];
  stories: Story[];
}

export default function ImageDetail() {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  /* UseState */
  const [filterBan, setFilterBan] = useState<boolean>(false); // 'Ban' 버튼 클릭 시 전체 이미지가 필터링 되어 나타남(핸재 기준 isBanned로 구분됨)
  const [isActive, setIsActive] = useState(false); // '선택'버튼 클릭시 체크박스가 나타나는데 체크되면 isActivie = true, 아니면 isActive = false
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // 체크박스 활성화 시 > 선택된 이미지
  const [customTitle, setCustomTitle] = useState(false); // 모달창 제목 위치 : 캐릭터인지 동화인지에 따라 '닫기'버튼에 관한 위치 조절
  const [viewMode, setViewMode] = useState<'image'|'story'>('image'); // 캐릭터인지 동화인지
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null); // 제작된 동화 > 선택된 동화가 무엇인지 찾기 위함.
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null); // 제작된 동화 > 선택된 동화
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열고 닫음 확인을 위함
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [bannedImage, setBannedImage] = useState<boolean | null>(null); // 밴 당한 이미지인지 판단 후 > 이미지 클릭하면 모달 화면에 회색박스가 나옴

  // 모달 열기/닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false); // 모달창 닫기
    setViewMode('image');  // 모달이 닫힐 때 viewMode를 'image'로 초기화
    setActiveStoryId(null); // 선택한 동화 초기화
  };
  const { showDeleteToast } = useCustomToast();

  /* [삭제 예정] 임시 데이터 */
  /* 바꿀 데이터 형식 */
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "data_1",
      image: ch_img,
      createdAt: "2024/03/19 10:00",
      prompt: { words: ["귀여운 강아지 캐릭터", "고양이"] },
      creator: {
        id: "user_1",
        userName: "조현지",
        userImage: ch_img_sm
      }
    },
    {
      id: "data_2",
      image: ch_img1,
      createdAt: "2024/03/19 10:00",
      prompt: { words: ["귀여운 강아지 캐릭터", "고양이"] },
      creator: {
        id: "user_1",
        userName: "조현지",
        userImage: ch_img_sm
      }
    }
  ]);

  const [stories, setStories] = useState<Story[]>([
    {
      id: "data_1_story_1",
      title: "강아지의 모험",
      createdAt: "2024/03/19 11:00",
      characterId: "data_1", // 캐릭터 ID 참조
      pages: [
        { image: ch_story, content: "강아지의 모험 시작", prompt: { words: ["강아지", "모험"] }, createdAt: "2024/03/19 11:00" },
        { image: ch_story, content: "두번째장 이야기", prompt: { words: ["강아지", "모험"] }, createdAt: "2024/03/19 11:00" }
      ]
    },
    {
      id: "data_2_story_1",
      title: "루리와 리루의 모험",
      createdAt: "2024/03/20 11:00",
      characterId: "data_2", // 캐릭터 ID 참조
      pages: [
        { image: ch_story, content: "루리와 리루의 이야기", prompt: { words: ["루리", "리루", "모험"] }, createdAt: "2024/03/19 11:00" }
      ]
    }
  ]);


  /* [공통] : 전체 이미지 수 구하기 */
  const totalImages = useMemo(() => {
    if (!filterBan) {
      // filterBan이 false일 때는 모든 이미지 포함
      return characters.length;
    }
    // filterBan이 true일 때만 차단된 이미지 필터링
    const bannedImages = characters.filter(character => character.isBanned);
    return bannedImages.length;
  }, [characters, filterBan]);


  /* 1. Ban 버튼 클릭시 (필터링 역할) : isBanned 가 true인 요소를 조회함. */
  // Ban 클릭 관련 토글 함수 : 해당 버튼 클릭시 버튼 색 변화 및 ban인 요소가 조회됨.
  const toggleBanFilter = () => {
    setFilterBan(prev => !prev);
  };

  // 필터링된 이미지 목록을 계산
  const filteredImages = characters.filter(character =>
    // filterBan이 true일 때는 차단된 캐릭터만 표시
    filterBan ? character.isBanned : true
  );

  const handleImageSelect = (imageId: string) => {
    if (!isActive) return;

    setSelectedImages(prev => {
      const newSelected = prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId];
      return newSelected;
    });
  };

  /* 2. "선택" 버튼 클릭 시 (체크박스 - 삭제 역할)  */
  // 하단에 나타나는 toast ui 닫는 기능 : closeToast 함수 정의
  const handleCloseToast = () => {
    toast.dismiss(); // 현재 표시된 모든 토스트를 닫습니다
    setSelectedImages([]); // 선택된 이미지 초기화
    setIsActive(false); // 선택 모드 비활성화
  };

  /* 1-2. 일반 상태 (Ban을 클릭한 상황이 아닌 경우 이미지를 클릭했을 경우) */
  // 이미지 클릭
  const handleImageClick = (imageId: string, isBanned?: boolean) => {
    if (isActive) return;
    setSelectedImageId(imageId);  // selectedImageId 설정
    setBannedImage(isBanned ?? null); //밴당한 이미지인지 체크
    setIsModalOpen(true); // 모달 열기
  }

  /* UseEffect 모음 */
  /* 1. isActive가 활성화 되었을 경우 : 하단 toast ui에 선택된 체크 수 반영 및 삭제기능 */
  useEffect(() => {
    if (isActive) {
      // 선택 모드가 활성화 상태일 때
      showDeleteToast(
        selectedImages.length,
        () => {
          // 선택된 이미지가 없을 때 알림
          if(selectedImages.length === 0) {
            alert('선택한 캐릭터가 없습니다.');
          }

          // 선택된 캐릭터들을 제외한 새로운 캐릭터 배열 생성
          const newCharacters = characters.filter(character =>
            !selectedImages.includes(character.id)
          );

          // 상태 업데이트
          setCharacters(newCharacters);

          // 선택 목록 초기화
          setSelectedImages([]);

          // toast ui 닫기
          handleCloseToast();
        }
      );
    } else {
      setSelectedImages([]);
      toast.dismiss();
    }
  }, [isActive, selectedImages.length, characters]); // 의존성 배열에 characters 추가
  /* 2. 팝업이 열릴 때 캐릭터 / 동화인지에 따라 '닫기'버튼의 위치 조절 위함 */
  useEffect(() => {
    setCustomTitle(viewMode === 'story');
  }, [viewMode]);

  return (
    <div className="pb-30">
      {/* 상단 제목 */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4 ">
          <h2 className="flex items-center text-2xl font-bold">
            <img
              src={arrow_l}
              alt="arrow_l"
              className="h-5 mr-2 cursor-pointer fill-[#000000]"
              onClick={handleGoBack}
            />
            캐릭터/동화 제작
          </h2>
          <Btn
            type="button"
            background={filterBan ? "color" : "regular"}
            size="sm"
            pointColor="red"
            color={filterBan ? "red" : undefined}
            onClick={toggleBanFilter}
          >
            Ban
          </Btn>
        </div>
      </div>
      <SearchFilter />
      <div className="flex items-center justify-end mb-4 mt-4">
        <Btn
          type="button"
          background="color"
          color="green"
          size="sm"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <IoCheckmark className="mr-1"/>{!isActive ? '선택' : '취소'}
        </Btn>
      </div>
      <div className="flex items-center justify-start mt-2 mb-4">
        <p className="text-lg font-bold text-black">총 {totalImages}개</p>
      </div>
      {/* 이미지 리스트 */}
      <ImageList
        imageGroups={filteredImages}
        isSelectionMode={isActive}
        selectedImages={selectedImages}
        onImageSelect={handleImageSelect}
        onImageClick={handleImageClick}
      />
      {/* '선택'버튼 클릭시 제시되는 컨테이너 */}
      <CustomToastContainer />
      {/* 이미지 클릭시 제시되는 모달 */}
      <CustomModalFairy
        isOpen={isModalOpen}
        onClose={handleModalClose}
        customTitle={customTitle}
        sidebarContent={
          (() => {
            const selectedCharacter = characters.find(character => character.id === selectedImageId);
            const characterStories = stories.filter(story => story.characterId === selectedImageId);

            return selectedCharacter ? (
              <ImageDetailModal
                userName={selectedCharacter.creator.userName}
                userImage={selectedCharacter.creator.userImage}
                createdAt={selectedCharacter.createdAt}
                prompt={selectedCharacter.prompt.words.join(', ')}
                referenceImage={selectedCharacter.image}
                stories={characterStories.map(story => ({
                  id: story.id,
                  title: story.title
                }))}
                onStoryClick={(story) => {
                  setActiveStoryId(story.id);
                  setSelectedStoryId(story.id);
                  setViewMode('story');
                }}
                activeStoryId={activeStoryId}
              />
            ) : null;
          })()
        }
        sidebarWidth="400px"
      >
        {viewMode === 'image' ? (
          <div className="w-[70vh] h-[70vh]">
            <img
              src={characters.find(character => character.id === selectedImageId)?.image || ''}
              alt="사용자 이미지"
              className="h-full object-contain"
            />
          </div>

        ) : (
          <>
            {selectedStoryId && selectedImageId && (() => {
              const selectedStory = stories.find(story => story.id === selectedStoryId);

              return selectedStory?.pages ? (
                <FairyTale
                  title={selectedStory.title}
                  pages={selectedStory.pages}
                />
              ) : null;
            })()}
          </>
        )}
      </CustomModalFairy>
    </div>
  )
}