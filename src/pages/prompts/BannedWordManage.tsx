import React, {useMemo, useState} from "react";
/* 아이콘 */
import { AiOutlinePlus } from 'react-icons/ai';

/* 컴포넌트 */
import Title from '../../components/common/customs/Title.tsx';
import SearchFilter from '../../components/pages/bannedWordManage/SearchFilter';
import DoubleGrid from '../../components/common/grids/DoubleGrid.tsx';
import Btn from '../../components/common/buttons/Btn';
import Input from '../../components/common/forms/Input';
import Radio from '../../components/common/forms/Radio';
/* 모달 */
import Modal from "../../components/common/modals/Modal.tsx";

/* [삭제 예정] 임시 데이터 */
const generateRandomData = (count: number) => {
  const sampleData = []

  const getRandomDate = () => {
    const start = new Date(2024, 0, 1)
    const end = new Date()
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split('T')[0]
  }
  const names = ["조현지", "김도현", "이희수", "김상혁", "이우현", "윤영은", "홍길동", "김다은"]
  const locations = ['우주정거장', '숲속', '꿈속'];
  const storyContents = ['우주정거장에서 루리는 리루와 놀아요・・・','숲 속에서 강아지와 함께 루리는 뛰어 놀아요・・・']
  const gptContents = ['루리와 리루의 우주 정거장 탐험','민준이와 준민의 우주 정거장 탐험']
  const categories = ['4~5세','모험']

  for (let i = 1; i <= count; i++) {
    const randomUsername = names[Math.floor(Math.random() * names.length)]
    const randomCreatedDate = getRandomDate()
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomStoryContent = storyContents[Math.floor(Math.random() * storyContents.length)];
    const randomGptStory = gptContents[Math.floor(Math.random() * gptContents.length)];
    const randomCategory = [...categories]

    sampleData.push({
      id: i.toString(),
      username: randomUsername,
      createdDate: randomCreatedDate,
      location: randomLocation,
      storyContent: randomStoryContent,
      gptStory: randomGptStory,
      category: randomCategory,
    })
  }
  return sampleData
}


const BannedWordManage:React.FC = () => {
  /* Usestate */
  const [isModalOpen, setModalOpen] = useState(false); // 팝업
  const [banWord, setBanWord] = useState(""); // 팝업 - 벤 단어
  const [banWordError] = useState<string>("");  // 팝업 - 벤 단어: string 타입으로 변경
  const [startDate, setStartDate] = useState<Date | null>(new Date()) // 팝업 - 날짜(시작일)
  const [endDate, setEndDate] = useState<Date | null>(new Date()) // 팝업 - 날짜(종료일)

  /* handler */
  const handleDelete = (id: string) => {
    console.log('삭제',id);
  }

  // 사용 예시
  const columns = [
    { key: 'id', label: 'No', width: 15, centerType: 'items-center'},
    { key: 'word', label: '벤 단어', width: 45, centerType: 'items-center' },
    { key: 'regDate', label: '등록일', width: 25, centerType: 'items-center' },
    { key: 'delete', label: '삭제', width: 15, centerType: 'items-center',
      render: (row:any) => (
        <Btn
          type="button"
          background="color"
          color="red"
          size="sm"
          onClick={() => handleDelete(row.id)}
        >
          삭제
        </Btn>
      )

    }
  ]
  const data = [
    { id: '1', word: '금지어1', regDate: '2024-03-15' },
    { id: '2', word: '금지어2', regDate: '2024-03-15' },
    { id: '3', word: '금지어2', regDate: '2024-03-15' },
    { id: '4', word: '금지어2', regDate: '2024-03-15' },
    { id: '5', word: '금지어2', regDate: '2024-03-15' },
    { id: '6', word: '금지어2', regDate: '2024-03-15' },
    { id: '7', word: '금지어2', regDate: '2024-03-15' },
    { id: '8', word: '금지어2', regDate: '2024-03-15' },
    { id: '9', word: '금지어2', regDate: '2024-03-15' },
    { id: '10', word: '금지어2', regDate: '2024-03-15' },
    { id: '11', word: '금지어2', regDate: '2024-03-15' },
    { id: '12', word: '금지어2', regDate: '2024-03-15' },
    { id: '13', word: '금지어2', regDate: '2024-03-15' },
    { id: '14', word: '금지어2', regDate: '2024-03-15' },
    { id: '15', word: '금지어2', regDate: '2024-03-15' },
    { id: '16', word: '금지어2', regDate: '2024-03-15' },
    { id: '17', word: '금지어2', regDate: '2024-03-15' },
    { id: '18', word: '금지어2', regDate: '2024-03-15' },
    { id: '19', word: '금지어2', regDate: '2024-03-15' },
    { id: '20', word: '금지어2', regDate: '2024-03-15' },
    { id: '21', word: '금지어2', regDate: '2024-03-15' },
    { id: '22', word: '금지어2', regDate: '2024-03-15' },
    { id: '23', word: '금지어2', regDate: '2024-03-15' },
    { id: '24', word: '금지어2', regDate: '2024-03-15' },
    { id: '25', word: '금지어2', regDate: '2024-03-15' },
    { id: '26', word: '금지어2', regDate: '2024-03-15' },
    { id: '27', word: '금지어2', regDate: '2024-03-15' },
    { id: '28', word: '금지어2', regDate: '2024-03-15' },
    { id: '29', word: '금지어2', regDate: '2024-03-15' },
    { id: '30', word: '금지어2', regDate: '2024-03-15' },
    { id: '31', word: '금지어2', regDate: '2024-03-15' },
    { id: '32', word: '금지어2', regDate: '2024-03-15' },
    { id: '33', word: '금지어2', regDate: '2024-03-15' },
    { id: '34', word: '금지어2', regDate: '2024-03-15' },
    { id: '35', word: '금지어2', regDate: '2024-03-15' },
    { id: '36', word: '금지어2', regDate: '2024-03-15' },
    { id: '37', word: '금지어2', regDate: '2024-03-15' },
    { id: '38', word: '금지어2', regDate: '2024-03-15' },
    { id: '39', word: '금지어2', regDate: '2024-03-15' },
    { id: '40', word: '금지어2', regDate: '2024-03-15' },
    { id: '41', word: '금지어2', regDate: '2024-03-15' },
    { id: '42', word: '금지어2', regDate: '2024-03-15' },
    { id: '43', word: '금지어2', regDate: '2024-03-15' },
    { id: '44', word: '금지어2', regDate: '2024-03-15' },
    { id: '45', word: '금지어2', regDate: '2024-03-15' },
  ]

  // const sampleData = useMemo(() => generateRandomData(100), [])
  return (
    <div>
      <Title title="벤 단어 관리">
        {/* 벤 단어 등록 버튼 */}
        <Btn
          type="button"
          background="regular"
          size="sm"
          onClick={() => setModalOpen(true)}
        >
          <AiOutlinePlus className="mr-1" />단어 등록
        </Btn>
      </Title>
      <SearchFilter/>
      <div className="flex items-start gap-4 h-full overflow-hidden">
        <DoubleGrid
          columns={columns}
          data={data}
          showTotal={true}
          maxHeight="500px"
        />
      </div>
      {/* [팝업] 벤 단어 등록 */}
      <Modal
        isOpen={isModalOpen}
        title="벤 단어 등록"
        buttons={
          <>
            <Btn type="button" background="regular" onClick={() => setModalOpen(false)}>
              취소
            </Btn>
            <Btn type="button" background="color" color="green" onClick={() => setModalOpen(false)}>
              등록
            </Btn>
          </>
        }
        onClose={() => {
          setModalOpen(false)
          /* 날짜: 닫기 버튼 실행시 리셋 */
          setStartDate(startDate)
          setEndDate(endDate)
        }}
      >
        {/* 언어 */}
        <div className="flex items-center w-full mt-4">
          <p className="min-w-[80px] text-sm font-bold text-black dark:text-gray-400 mb-1">언어</p>
          <div className="flex items-center gap-4">
            <Radio name="option" value="KR">
              <span className="text-sm">KR</span>
            </Radio>
            <Radio name="option" value="EN">
              <span className="text-sm">EN</span>
            </Radio>
            <Radio name="option" value="CN">
              <span className="text-sm">CN</span>
            </Radio>
            <Radio name="option" value="JP">
              <span className="text-sm">JP</span>
            </Radio>
            <Radio name="option" value="VN">
              <span className="text-sm">VN</span>
            </Radio>
          </div>
        </div>
        {/* 벤 단어 */}
        <div className="w-full mt-4">
          <Input
            id="banWord"
            label="벤 단어"
            value={banWord}
            onChange={setBanWord}
            placeholder="벤 단어를 입력해 주세요."
            required
            error={banWordError || ""}
          />
        </div>
      </Modal>
    </div>
  )
}
export default BannedWordManage;