import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {HiChevronLeft} from "react-icons/hi";
/* 컴포넌트 */
import Btn from "../../common/buttons/Btn.tsx";
import Modal from '../../common/modals/Modal.tsx'
import BadgeCheckbox from "../../common/forms/BadgeCheckbox.tsx";

const DetailCard: React.FC = () => {
  const navigate = useNavigate();
  /* useState */
  const [isModalOpen, setModalOpen] = useState(false); // 팝업
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /* Handler */
  const handleEditClick = () => {
    // 모달 열 때 fieldData.categories 값으로 초기화
    setSelectedCategories(fieldData.categories);
    setModalOpen(true);
  };

  /* [삭제 예정] 임시 데이터 */
  const categoryData = ['전래동화','창작동화','명작동화','문학','영어/언어','수학','과학','역사/문화','위인전','예술','동물','식물','직업','예절/인성','안전','모험','판타지','공주/왕자']
  const fieldData = {
    name: '조현지',
    userId : 'adbde@iea.co.kr',
    createdDate: '2025.03.12',
    location: '우주정거장',
    content:' 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조용한 시간을 보냈습니다. 어느 날, 한 아이가 책장 구석에서 낡은 동화책을 발견했습니다. 책을 펼치는 순간, 환한 빛과 함께 신비로운 이야기가 시작되었죠. 아이는 마법처럼 펼쳐지는 이야기 속으로 빠져들었습니다.',
    title:'루리와 리루의 우주 정거장 탐험',
    editTitle: '우주정거장에서 벌어진 일들',
    categories:['4~5세','모험'],
    pages:[
      {
        content: ' 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조용한 시간을 보냈습니다. 어느 날, 한 아이가 책장 구석에서 낡은 동화책을 발견했습니다. 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조',
        benWords: ['happy','girl','looking at moon','pointing the moon','astonishment', 'on the moon surface']
      },
      {
        content: ' 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조용한 시간을 보냈습니다. 어느 날, 한 아이가 책장 구석에서 낡은 동화책을 발견했습니다. 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조',
        benWords: ['happy','girl','looking at moon','pointing the moon','astonishment', 'on the moon surface']
      },
      {
        content: ' 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조용한 시간을 보냈습니다. 어느 날, 한 아이가 책장 구석에서 낡은 동화책을 발견했습니다. 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조',
        benWords: ['happy','girl','looking at moon','pointing the moon','astonishment', 'on the moon surface']
      },
      {
        content: ' 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조용한 시간을 보냈습니다. 어느 날, 한 아이가 책장 구석에서 낡은 동화책을 발견했습니다. 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조',
        benWords: ['happy','girl','looking at moon','pointing the moon','astonishment', 'on the moon surface']
      },
      {
        content: ' 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조용한 시간을 보냈습니다. 어느 날, 한 아이가 책장 구석에서 낡은 동화책을 발견했습니다. 어느 마을에 작은 책방이 하나 있었습니다. 그 책방은 오래된 나무 문과 따뜻한 조명이 인상적인 곳이었죠. 마을 사람들은 이곳에서 책을 읽으며 조',
        benWords: ['happy','girl','looking at moon','pointing the moon','astonishment', 'on the moon surface']
      }
    ]
  }
  return (
    <div>
      {/* 카드 (필터 영역) */}
      <div className="bg-white  dark:bg-[#252731] rounded-lg shadow-md">
        <div className="border-b border-gray-300 dark:border-gray-600  rounded-t-lg col-span-8 p-4 bg-[#E0ECE9] dark:bg-zinc-700 font-bold flex text-lg items-center">GPT 입력</div>
        <div className="grid grid-cols-8 text-m">
          {/* 사용자 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            이름
          </div>
          <div className="p-4 col-span-3 border-b  border-gray-200 dark:border-gray-600">
            {fieldData.name}
          </div>
          {/* 아이디 */}
          <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            아이디
          </div>
          <div className="p-4 col-span-3 border-b  border-gray-200 dark:border-gray-600">
            {fieldData.userId}
          </div>

          {/* 입력일 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            입력일
          </div>
          <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
            {fieldData.createdDate}
          </div>

          {/* 입력 장소 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            입력 장소
          </div>
          <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
            {fieldData.location}
          </div>

          {/* 입력 내용 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            입력 내용
          </div>
          <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
            {fieldData.content}
          </div>

          {/* 출력 동화(GPT)*/}
          <div
            className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center rounded-bl-lg"
            style={{ gridRow: `span ${fieldData.pages.length*2 + 2}` }}
          >
          출력 동화(GPT)
          </div>

          {/* 출력 제목 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            출력 제목
          </div>
          <div className="p-4 col-span-2 border-b border-gray-200 dark:border-gray-600">
            {fieldData.title}
          </div>

          {/* 수정 제목 */}
          <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            수정 제목
          </div>
          <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">
            {fieldData.editTitle}
          </div>

          {/* 카테고리 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            카테고리
          </div>
          <div className="p-4 col-span-6 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items center gap-2">
              {/* 카테고리 뱃지 */}
              <div className="flex items-center gap-1">
                {fieldData.categories.map((category, index) => (
                  <React.Fragment key={`category-${index}`}>
                    <span className="inline-flex px-2 py-1 text-sm rounded-2xl bg-gray-300 border-gray-400  border-2 ">{category}</span>
                  </React.Fragment>
                ))}
              </div>
              {/* 카테고리 수정 버튼 */}
              <Btn
                type="button"
                background="color"
                color="green"
                size="sm"
                onClick={handleEditClick}
              >
                수정
              </Btn>
            </div>
          </div>
          
          {/* 페이지 */}
          {fieldData.pages.map((page, index) => (
            <React.Fragment key={index}>
              <div className="border-b border-r row-span-2 border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                페이지{index + 1}
              </div>
              <div className="p-4 col-span-6 border-b border-gray-200 dark:border-gray-600">
                {page.content}
              </div>
              <div className="p-4 col-span-6 border-b border-gray-200 dark:border-gray-600">
                {page.benWords.join(', ')}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center space-x-2 mt-4">
        {/* 1. 이전 버튼 */}
        <Btn
          type="button"
          background="regular"
          onClick={() => navigate(-1)}
        >
          <HiChevronLeft className="mr-1"/>이전
        </Btn>
      </div>
      {/* 카테고리 수정 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="카테고리 수정"
        buttons={
          <>
            <Btn type="button" background="regular" onClick={() => setModalOpen(false)}>
              취소
            </Btn>
            <Btn type="button" background="color" color="green" onClick={() => setModalOpen(false)}>
              수정
            </Btn>
          </>
        }
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <div className="w-full p-4">
          <BadgeCheckbox
            categories={categoryData}
            selectedCategories={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
      </Modal>
    </div>
  )
}

export default DetailCard;