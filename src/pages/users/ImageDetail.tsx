// 이미지 상세 페이지

import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { subDays } from "date-fns";
/* 이미지 */
import arrow_l from "../../assets/images/arrow_l.svg";

/* 아이콘 */
// import { IoCheckmark } from "react-icons/io5";

/* 컴포넌트 */
import SearchFilter from "../../components/pages/users/ImageSearchFilter.tsx";
import ImageList from "../../components/pages/users/ImageList.tsx";
import StoriesList from "../../components/pages/users/StoriesList.tsx";
import Btn from "../../components/common/buttons/Btn.tsx";

// /* 임시 이미지 */
// import ch_img from "./../../assets/images/ch_img_active.svg"
// import ch_img1 from "./../../assets/images/ch_img2.png"
// import ch_img_sm from './../../assets/images/ch_sm_img.png'
// import ch_img_md from './../../assets/images/ch_md_img.png'
// import ch_story from './../../assets/images/ch_story.png'

// /* 모달 */
// import ImageDetailModal from "../../components/pages/users/ImageDetailModal.tsx";
// import FairyTale from "../../components/pages/users/swiperContents/FairyTale.tsx";
// import CustomModalFariy from "../../components/common/modals/CustomModalFairy.tsx";
// import { useCustomToast, CustomToastContainer } from '../../components/common/modals/CustomToast';
// import { toast } from 'react-toastify';

/* 캐릭터 관련 */
import CharcImageList from "../../mock-data/charc-list.json";
import CharcDetail from "../../mock-data/charc_detail.json"
import CustomModalCharc from "../../components/common/modals/CustomModalCharc.tsx";

/* 동화 관련 */
import FairyImageList from "../../mock-data/fairy_list.json"
// import FairyDetail from "../../mock-data/fairy_detail.json"
import CustomModalFairy from "../../components/common/modals/CustomModalFairy.tsx"; // toast.dismiss() 사용을 위해 추가

/* 인터페이스 정의 */

export default function ImageDetail() {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  /* UseState */
  const [filterBan, setFilterBan] = useState<boolean>(false); // 'Ban' 버튼 클릭 시 전체 이미지가 필터링 되어 나타남(핸재 기준 isBanned로 구분됨)

  const [isCharcModalOpen, setIsCharcModalOpen] = useState(false); // 모달창 열고 닫음 확인을 위함
  const [isFairyModalOpen, setIsFairyModalOpen] = useState(false); // 모달창 열고 닫음 확인을 위함
  const [charList, setCharList] = useState<any>({});
  const [fairyId, setFairyId] = useState<string | number | null>(null);
  const [fairyList, setFairyList] = useState<any>({});
  const [userId, setUserId] = useState<string | number | null>(null);

  /* 검색조건 설정 */
  // 상위 상태
  const [activeType, setActiveType] = useState("캐릭터"); // 실제로 보여줄 리스트 타입
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("캐릭터");
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // 컴포넌트 마운트 시 한 번 검색 실행
  useEffect(() => {
    handleSearch();
  }, []); // 빈 배열이므로 한 번만 실행됨

  // 날짜를 한 번에 설정하는 함수
  const setDates = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  // 검색 버튼 눌렀을 때
  const handleSearch = () => {
    setActiveType(searchType);
    console.log("검색 실행!");
    console.log("Query:", searchQuery);
    console.log("Type:", searchType);
    console.log("Start:", startDate);
    console.log("End:", endDate);
    // → 여기서 실제 API 호출 or 필터링 처리
  };

  // 초기화 버튼 눌렀을 때
  const handleReset = () => {
    setSearchQuery("");
    setSearchType("캐릭터");
    setStartDate(subDays(new Date(), 1));
    setEndDate(new Date());
  };

  // 모달 열기/닫기 핸들러
  /* 1. 캐릭터 팝업 닫기 */
  const handleCharcModalClose = () => {
    setIsCharcModalOpen(false); // 모달창 닫기
    setCharList({});
  };
  /* 1-1. 캐릭터 리스트(작업중) */
  const [selectedMode, setSelectedMode] = useState(false);
  /* 1-2. 캐릭터 팝업 (일부 완료) */
  const handleOpenModalCharc = (userId: any, charcId: any) => {
    /* 예시 데이터 (userID,charId값 일치 시 해당 데이터를 찾아 불러옴) */
    if (userId === 'user1' && charcId === '9007199254740991') {
      setIsCharcModalOpen(true);
      setCharList(CharcDetail);
    } else {
      alert('일치하는 데이터가 없습니다.');
    }
    /* 알맞는 팝업 데이터 불러오기 */
  }

  /* 2. 동화 팝업 닫기 */
  const handleFairyModalClose = () => {
    setIsFairyModalOpen(false); // 모달창 닫기
    setCharList({});
  };
  /* 2-2. 동화 팝업 (일부 완료) */
  const handleOpenModalFairy = (userId: any, storyNo: any) => {
    console.log('sdfsfd', userId, storyNo);
    /* 예시 데이터 (userID,charId값 일치 시 해당 데이터를 찾아 불러옴) */
    if (userId === 'user1' && storyNo === 10001) {
      setIsFairyModalOpen(true);
      setFairyList(FairyImageList);
    } else {
      alert('일치하는 데이터가 없습니다.');
    }
    /* 알맞는 팝업 데이터 불러오기 */
  }


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
          // onClick={toggleBanFilter}
          >
            Ban
          </Btn>
        </div>
      </div>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
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
          onClick={selectedMode ? () => setSelectedMode(false) : () => setSelectedMode(true)}
        >
          {selectedMode ? '취소' : '선택'}
        </Btn>
      </div>
      {/* 이미지 리스트 */}
      {activeType === '캐릭터' ? (
        <ImageList
          imageList={CharcImageList} // ImageItem[] 타입으로 전달
          selectedMode={selectedMode}
          onImageClick={(userId: any, charcId: any) => handleOpenModalCharc(userId, charcId)}
        />
      ) : (
        <StoriesList
          storyList={FairyImageList}
          selectedMode={selectedMode}
          onStoryClick={(userId: any, storyNo: any) => handleOpenModalFairy(userId, storyNo)}
        />
      )}

      {/* 모달 모음 */}
      {/* 1. 캐릭터 */}
      <CustomModalCharc
        isOpen={isCharcModalOpen}
        userData={charList}
        onClose={handleCharcModalClose}
        sidebarWidth='300px'
        onStoryClick={(storyNo: number) => {
          console.log('상위 컴포넌트에서 클릭한 동화 번호:', storyNo);
          /* 캐릭터 모달창 닫기 */
          setFairyId(storyNo); // 열었던 id 저장
          handleCharcModalClose();
          /* 동화 모달창 열기 */
        }}
      />
      {/* 2. 동화 */}
      <CustomModalFairy
        isOpen={isFairyModalOpen}
        userData={fairyList}
        onClose={handleFairyModalClose}
        sidebarWidth='300px'
        onUserClick={(charcNo: number) => {
          console.log(charcNo);
          console.log('상위 컴포넌트에서 클릭한 동화 번호')
          setUserId(charcNo);
          handleFairyModalClose();
          /* 동화 모달창 열기 */
        }}
      />
    </div>
  )
}