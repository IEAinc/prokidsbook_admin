import { useEffect,useState, useMemo } from 'react';
import {useNavigate} from "react-router-dom";
/* Zustand */
import { useImageSelectionStore } from '../../stores/imageSelectionStore';

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
// 타입 정의
// 기본 사용자 정보
interface User {
  id: string;
  userName: string;
  userImage: string;
}

// 프롬프트 정보
interface Prompt {
  words: string[];      // 이미지 생성에 사용된 단어들
  originalText?: string // 원본 텍스트 (선택적)
}

// 페이지 정보
interface Page {
  image: string;        // 동화 페이지 이미지
  content: string;      // 동화 페이지 텍스트
  prompt: Prompt;       // 이미지 생성에 사용된 프롬프트
  createdAt: string;    // 페이지 생성 시간
}

// 동화 정보
interface Story {
  id: string;          // 동화 ID
  title: string;       // 동화 제목
  createdAt: string;   // 동화 생성 시간
  pages: Page[];       // 동화 페이지들
}

// 캐릭터 정보
interface Character {
  id: string;          // 캐릭터 ID
  image: string;       // 캐릭터 이미지
  createdAt: string;   // 생성 시간
  prompt: Prompt;      // 캐릭터 생성 프롬프트
  creator: User;       // 생성한 사용자 정보
  isBanned?: boolean;  // 차단 여부
  stories: Story[];    // 캐릭터로 만든 동화들
}

// 날짜별 그룹
interface ImageGroup {
  title: string;       // "오늘", "어제" 등
  date: string;        // YYYY-MM-DD 형식의 실제 날짜
  characters: Character[]; // 해당 날짜의 캐릭터들
}

export default function ImageDetail() {
  const navigate = useNavigate();
  const { showDeleteToast } = useCustomToast();
  // Zustand 스토어에서 필요한 상태와 액션들 모음
  const {
    isActive,
    selectedImages,
    selectedRows,
    viewMode,
    selectedStoryId,
    activeStoryId,
    selectedImageId,
    filterBan,
    customTitle,
    isModalOpen,
    bannedImage,
    setIsActive,
    setSelectedImages,
    setSelectedRows,
    setViewMode,
    setSelectedStoryId,
    setActiveStoryId,
    setSelectedImageId,
    setFilterBan,
    setCustomTitle,
    setIsModalOpen,
    setBannedImage,
    toggleImageSelection,
    toggleRowSelection,
    clearSelections,
    handleModalClose
  } = useImageSelectionStore();

  const handleGoBack = () => {
    navigate(-1)
  }
  /* UseState */
  const [searchType, setSearchType] = useState("캐릭터");// SearchFilter에서 선택된 타입을 관리하기 위한 상태 추가
  const isSelectionMode = true

  /* [삭제 예정] 임시 데이터 */
  const [imageGroups, setImageGroups] = useState<ImageGroup[]>([
    {
      title: "오늘", //
      date: "2024-03-19",
      characters: [
        // 오늘 생성된 캐릭터에 대한 정보 (배열로 들어옴 각 캐릭터에 대해)
        {
          id: "data_1", // 캐릭터 고유 id
          image: ch_img, // 캐릭터 이미지
          createdAt: "2024/03/19 10:00", // 캐릭터 생성 일시
          prompt: {
            words: ["귀여운 강아지 캐릭터", "고양이"]
          }, // 캐릭터 생성시 사용된 프롬프트
          creator: {
            id: "user_1",
            userName: "조현지",
            userImage: ch_img_sm
          },
          // 생성한 캐릭터로 생성한 동화 목록
          stories: [
            {
              id: "data_1_story_1", // 생성된 동화의 고유한 id
              title: "강아지의 모험", // 생성된 동화의 이름
              createdAt: "2024/03/19 11:00",
              // 생성된 동화의 페이지 구성
              pages: [
                {
                  image: ch_story,
                  content: "강아지의 모험에 관한 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "두번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "세번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "네번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "다섯번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "여섯번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },        {
                  image: ch_story,
                  content: "일곱번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "여덟번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                }
              ]
            },
            {
              id: "data_1_story_2", // 생성된 동화의 고유한 id
              title: "강아지의 모험", // 생성된 동화의 이름
              createdAt: "2024/03/19 11:00",
              // 생성된 동화의 페이지 구성
              pages: [
                {
                  image: ch_story,
                  content: "강아지의 모험에 관한 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "두번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "세번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "네번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "다섯번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "여섯번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },        {
                  image: ch_story,
                  content: "일곱번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "여덟번째장 이야기",
                  prompt: {
                    words: ["강아지", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                }
              ]
            },
          ]
        },
        {
          id: "data_2", // 캐릭터 고유 id
          image: ch_img1, // 캐릭터 이미지
          createdAt: "2024/03/19 10:00", // 캐릭터 생성 일시
          prompt: {
            words: ["귀여운 강아지 캐릭터", "고양이"]
          }, // 캐릭터 생성시 사용된 프롬프트
          creator: {
            id: "user_1",
            userName: "조현지",
            userImage: ch_img_sm
          },
          // 생성한 캐릭터로 생성한 동화 목록
          stories: [
            {
              id: "data_2_story_1", // 생성된 동화의 고유한 id
              title: "루리와 리루의 모험", // 생성된 동화의 이름
              createdAt: "2024/03/20 11:00",
              // 생성된 동화의 페이지 구성
              pages: [
                {
                  image: ch_story,
                  content: "루리와 리루의 모험에 관한 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "두번째장 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "세번째장 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "네번째장 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "다섯번째장 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "여섯번째장 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },        {
                  image: ch_story,
                  content: "일곱번째장 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                },
                {
                  image: ch_story,
                  content: "여덟번째장 이야기",
                  prompt: {
                    words: ["루리","리루", "모험"]
                  },
                  createdAt: "2024/03/19 11:00"
                }
              ]
            },
          ]
        }
      ]
    },
  ]);
  const storyImageGroups = useMemo(() => {
    return imageGroups.map(group => ({
      ...group,
      characters: group.characters.flatMap(char =>
        char.stories?.flatMap(story =>
          story.pages.map(page => ({
            ...char,
            id: `${char.id}_${story.id}_${page.createdAt}`,
            image: page.image,
            storyId: story.id,
            storyTitle: story.title
          }))
        ) || []
      )
    })).filter(group => group.characters.length > 0);
  }, [imageGroups]);

  /* [공통] : 전체 이미지 수 구하기 */
  const totalImages = useMemo(() => {
    return imageGroups.reduce((sum, group) => {
      if (!filterBan) {
        // filterBan이 false일 때는 모든 캐릭터 포함
        return sum + group.characters.length;
      }
      // filterBan이 true일 때는 차단된 캐릭터만 필터링
      const filteredCharacters = group.characters.filter(character => character.isBanned);
      return sum + filteredCharacters.length;
    }, 0);
  }, [imageGroups, filterBan]);

  /* 1. Ban 버튼 클릭시 (필터링 역할) : isBanned 가 true인 요소를 조회함. */
  // Ban 클릭 관련 토글 함수 : 해당 버튼 클릭시 버튼 색 변화 및 ban인 요소가 조회됨.
  const toggleBanFilter = () => {
    setFilterBan(!filterBan);
  };


  // 필터링된 이미지 목록을 계산
  const filteredImages = imageGroups.map(group => ({
    ...group,
    characters: group.characters.filter(character =>
      // filterBan이 true일 때는 차단된 이미지만 표시
      filterBan ? character.isBanned : true
    )
  })).filter(group => group.characters.length > 0); // 빈 그룹 제거

  const handleImageSelect = (character: Character) => {
    if (!isActive) return;

    const isSelected = selectedImages.some(
      selectedChar => selectedChar.id === character.id
    );

    setSelectedImages(
      isSelected
        ? selectedImages.filter(selectedChar => selectedChar.id !== character.id)
        : [...selectedImages, character]
    );
  };

  const handleRowSelect = (rowId: string) => {
    setSelectedRows(
      selectedRows.includes(rowId)
        ? selectedRows.filter(id => id !== rowId)
        : [...selectedRows, rowId]
    );
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
          // 선택된 이미지들을 제외한 새 배열 생성
          if(selectedImages.length === 0) {
            alert('선택한 이미지가 없습니다.');
          }
          // 선택된 이미지들을 제외한 새로운 이미지 그룹을 생성
          const newImageGroups = imageGroups.map(group => ({
            ...group,
            characters: group.characters.filter(character =>
              !selectedImages.some(selectedChar => selectedChar.id === character.id)
            )
          }));

          // 상태 업데이트
          setImageGroups(newImageGroups);

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
  }, [isActive, selectedImages.length]); // isActive와 selectedImages.length 변경 시 실행
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
      <SearchFilter
        searchType={searchType}
        onSearchTypeChange={setSearchType}
      />
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
      {/* 검색 타입에 따른 조건부 렌더링 */}
      {searchType === "캐릭터" ? (
        <ImageList
          imageGroups={filteredImages}
          isSelectionMode={isActive}
          selectedImages={selectedImages}
          onImageSelect={handleImageSelect}
          onImageClick={handleImageClick}
        />
      ) : (
        <ImageList
          imageGroups={storyImageGroups}
          isSelectionMode={isActive}
          selectedImages={selectedImages}
          onImageSelect={handleImageSelect}
          onImageClick={handleImageClick}
          displayMode="set"
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
        />
      )}
      {/* '선택'버튼 클릭시 제시되는 컨테이너 */}
      <CustomToastContainer />
      {/* 이미지 클릭시 제시되는 모달 */}
      <CustomModalFairy
        isOpen={isModalOpen}
        onClose={handleModalClose}
        customTitle={customTitle}
        sidebarContent={
          (() => {
            const selectedImage = imageGroups
              .flatMap(group => group.characters)
              .find(character => character.id === selectedImageId);

            return selectedImage ? (
              <ImageDetailModal
                userName={selectedImage.creator.userName}
                userImage={selectedImage.creator.userImage}
                createdAt={selectedImage.createdAt}
                prompt={selectedImage.prompt}
                referenceImage={selectedImage.image}
                stories={selectedImage.stories}
                isBanned={bannedImage ?? undefined}
                activeStoryId={activeStoryId}
                onStoryClick={(story) => {
                  setActiveStoryId(story.id);
                  setSelectedStoryId(story.id);
                  setViewMode('story');
                }}
              />
            ) : null;
          })()
        }
        sidebarWidth="400px"
      >
        {viewMode === 'image' ? (
          <div className="w-[70vh] h-[70vh]">
            {bannedImage ? (
              <div className="w-full h-full flex justify-center items-center rounded-lg text-sm font-bold text-black bg-gray-300">
                생성되지 못한 이미지
              </div>
            ) : (
              <img
                src={selectedImageId ?
                  imageGroups.flatMap(group => group.characters).find(img => img.id === selectedImageId)?.image : ''
                }
                alt="사용자 이미지"
                className="h-full object-contain"
              />
            )}
          </div>
        ) : (
          <>
            {selectedStoryId && selectedImageId && (() => {
              const selectedImage = imageGroups
                .flatMap(group => group.characters)
                .find(img => img.id === selectedImageId);
              const selectedStory = selectedImage?.stories.find(story => story.id === selectedStoryId);

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