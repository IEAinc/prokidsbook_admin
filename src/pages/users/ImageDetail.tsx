/**
 * @file ImageDetail.tsx
 * @description 회원 관리 > 생성 이미지 관리
 */
import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { subDays } from "date-fns"
import { toast } from 'react-toastify'; // toast.dismiss() 사용을 위해 추가

import { useCustomToast, CustomToastContainer } from '../../components/common/modals/CustomToast';
import Btn from "../../components/common/buttons/Btn.tsx"
import SearchFilter from "../../components/pages/users/ImageSearchFilter.tsx"

/* 캐릭터 */
import ImageList from "../../components/pages/users/ImageList.tsx"
import CustomModalCharc from "../../components/common/modals/CustomModalCharc.tsx"
/* 동화 */
import StoriesList from "../../components/pages/users/StoriesList.tsx"
import CustomModalFairy from "../../components/common/modals/CustomModalFairy.tsx"

import arrow_l from "../../assets/images/arrow_l.svg"

/* 임시 데이터 - api 연결 시 삭제 */
import CharcImageList from "../../mock-data/charc-list.json"
import CharcDetail from "../../mock-data/charc_detail.json"
import FairyImageList from "../../mock-data/fairy_list.json"
import FairyDetail from "../../mock-data/fairy_detail.json"

export default function ImageDetail() {
  const [charList, setCharList] = useState<any>({}) // 캐릭터 리스트
  const [fairyList, setFairyList] = useState<any>({}) // 동화 리스트
  const [isCharcModalOpen, setIsCharcModalOpen] = useState(false) // 캐릭터 모달
  const [isFairyModalOpen, setIsFairyModalOpen] = useState(false) // 동화 모달
  // const [fairyId, setFairyId] = useState<string | number | null>(null) // 동화 ID
  const [filterBan, setFilterBan] = useState<boolean>(false) // 벤 이미지 필터
  const [selectedCount, setSelectedCount] = useState(0)
  const [isBanned, setIsBanned] = useState(false) // 벤 상태 관리
  const { showDeleteToast } = useCustomToast()
  /* 검색 */
  const [activeType, setActiveType] = useState<"캐릭터" | "동화">("캐릭터")  // 실제 렌더링 하고 있는 값 
  const [searchType, setSearchType] = useState<"캐릭터" | "동화">("캐릭터") // selectbox 값
  const [selectedMode, setSelectedMode] = useState(false) //선택 모드
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 1)) // 시작 날짜
  const [endDate, setEndDate] = useState<Date | null>(new Date()) // 종료 날짜
  const [searchQuery, setSearchQuery] = useState("") // 검색할 프롬프트

  const { id } = useParams() // 상세페이지 쿼리 파라미터에서 : 유저 ID 추출
  const userId = id

  const setDates = (start: Date | null, end: Date | null) => {
    setStartDate(start)
    setEndDate(end)
  }

  const handleSearch = () => {
    setActiveType(searchType)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSearchType("캐릭터")
    setStartDate(subDays(new Date(), 1))
    setEndDate(new Date())
  }

  /* userId 기준 이미지 목록 필터링 (api연결 시 수정) */
  // 캐릭터 이미지 필터링
  const filteredCharcList = useMemo(() => {
    if (!userId) return []

    return CharcImageList
      .map(group => ({
        date: group.date,
        items: group.items
          .filter(item => item.user_id === userId)
          .filter(item => (filterBan ? item.ban === true : true))  // 벤 이미지 필터링
      }))
      .filter(group => group.items.length > 0)
  }, [userId, filterBan])

  // 동화 이미지 필터링
  const filteredFairyList = useMemo(() => {
    if (!userId) return [];

    return FairyImageList
      .map(group => {
        const filteredItems = group.items
          .map(story => {
            const filteredImages = filterBan
              ? story.story_img_list.filter(img => img.ban === true) // 벤 이미지 필터링
              : story.story_img_list;
            return {
              ...story,
              story_img_list: filteredImages
            };
          })
          .filter(story => story.story_img_list.length > 0); // ban 이미지 0개 → 제거
        return {
          date: group.date,
          items: filteredItems
        };
      })
      .filter(group => group.items.length > 0); // 날짜 그룹 비면 제거
  }, [userId, filterBan]);

  /* 모달 핸들러 */
  // 캐릭터 상세 모달 
  const handleOpenModalCharc = (userId: string, charcId: number, isBanned?: boolean) => {
    if (CharcDetail.user_id === userId && CharcDetail.charc_no === charcId) {
      setCharList(CharcDetail)
      setIsBanned(!!isBanned)
      setIsCharcModalOpen(true)
      return
    }
    alert("일치하는 캐릭터 데이터가 없습니다.")
  }
  // 캐릭터 상세 모달 사이드바 -> 동화 리스트에서 동화 선택 -> 동화 상세 모달
  const handleOpenModalFairy = (userId: string, storyNo: number, isBanned?: boolean) => {
    if (FairyDetail.user_id !== userId || FairyDetail.story_no !== storyNo) {
      alert("일치하는 동화 데이터가 없습니다.")
      return
    }
    setFairyList(FairyDetail)
    setIsBanned(!!isBanned)
    setIsFairyModalOpen(true)
  }

  // 동화 상세 모달 
  const handleCharModalStoryClick = (storyNo: number) => {
    if (FairyDetail.story_no !== storyNo) {
      alert("동화 상세 데이터를 찾을 수 없습니다.")
      return
    }
    setCharList({})
    setIsCharcModalOpen(false)
    setFairyList(FairyDetail)
    setIsBanned(false) // 모달 전환 시 초기화
    setIsFairyModalOpen(true)
  }
  // 동화 상세 모달 사이드바 -> 캐릭터 리스트에서 캐릭터 선택 -> 캐릭터 상세 모달
  const handleFairyModalUserClick = (charcNo: number) => {
    if (CharcDetail.charc_no !== charcNo) {
      alert("해당 캐릭터 상세를 찾을 수 없습니다.")
      return
    }
    setFairyList({})
    setIsFairyModalOpen(false)
    setCharList(CharcDetail)
    setIsBanned(false) // 모달 전환 시 초기화
    setIsCharcModalOpen(true)
  }

  const handleCharcModalClose = () => {
    setIsCharcModalOpen(false)
    setCharList({})
    setIsBanned(false)
  }

  const handleFairyModalClose = () => {
    setIsFairyModalOpen(false)
    setFairyList({})
    setIsBanned(false)
  }

  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    handleSearch()  // 페이지 초기 진입 시 검색 실행
    if (!selectedMode) { // 선택모드가 아닌 경우 → 토스트 제거 후 종료
      toast.dismiss()
      return
    }
    if (selectedCount === 0) {  // 선택모드 + 선택 개수 0 → 토스트 제거 후 종료
      toast.dismiss()
      return
    }
    showDeleteToast(selectedCount, () => {
      setSelectedMode(false);
    })
  }, [selectedMode, selectedCount])

  return (
    <div>
      <CustomToastContainer />
      {/* 상단 제목 + Ban 버튼 */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4 ">
          <h2 className="flex items-center text-2xl font-bold">
            <img
              src={arrow_l}
              alt="arrow_l"
              className="h-5 mr-2 cursor-pointer"
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
            onClick={() => setFilterBan(prev => !prev)}
          >
            Ban
          </Btn>
        </div>
      </div>

      {/* 검색 영역 */}
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={(type) => setSearchType(type as "캐릭터" | "동화")}
        startDate={startDate}
        endDate={endDate}
        setDates={setDates}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      <div className="flex items-center justify-end mt-2 mb-2">
        <Btn
          type="button"
          background={selectedMode ? "color" : "regular"}
          size="sm"
          color={selectedMode ? "green" : undefined}
          onClick={() => setSelectedMode(prev => !prev)}
        >
          {selectedMode ? '취소' : '선택'}
        </Btn>
      </div>

      {/* 이미지 리스트 - 캐릭터/동화 */}
      {activeType === '캐릭터' ? (
        <ImageList
          imageList={filteredCharcList}
          selectedMode={selectedMode}
          onImageClick={handleOpenModalCharc}
          onSelectCountChange={setSelectedCount}
        />
      ) : (
        <StoriesList
          storyList={filteredFairyList}
          selectedMode={selectedMode}
          onStoryClick={handleOpenModalFairy}
          onSelectCountChange={setSelectedCount}
        />
      )}

      {/* 상세 모달 - 캐릭터/동화 */}
      <CustomModalCharc
        isOpen={isCharcModalOpen}
        userData={charList}
        onClose={handleCharcModalClose}
        sidebarWidth="300px"
        onStoryClick={handleCharModalStoryClick}
        isBanned={isBanned}
      />
      <CustomModalFairy
        isOpen={isFairyModalOpen}
        userData={fairyList}
        onClose={handleFairyModalClose}
        sidebarWidth="300px"
        onUserClick={handleFairyModalUserClick}
        isBanned={isBanned}
      />
    </div>
  )
}