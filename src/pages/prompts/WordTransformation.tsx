import { useState} from 'react'

/* 아이콘 */
import { BiDownArrowAlt } from "react-icons/bi";

/* 컴포넌트 */
import Title from '../../components/common/customs/Title.tsx'
import SearchFilter from "../../components/pages/wordsTransformation/SearchFilter";
import Grid from '../../components/common/grids/Grid.tsx'
import Btn from '../../components/common/buttons/Btn'
import Input from "../../components/common/forms/Input.tsx";
/* 모달 */
import Modal from '../../components/common/modals/Modal.tsx'
import {AiOutlinePlus} from "react-icons/ai";

/* [삭제 예정] 임시 데이터 */
const generateRandomData = (count: number) => {
  const sampleData = []

  const getRandomDate = () => {
    const start = new Date(2024, 0, 1)
    const end = new Date()
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split('T')[0]
  }
  const originalWords = ['우주정거장', '숲속', '꿈속'];
  const alternativeWords = ['우주정거장에서 루리는 리루와 놀아요・・・','숲 속에서 강아지와 함께 루리는 뛰어 놀아요・・・']

  for (let i = 1; i <= count; i++) {
    const randomOriginalWords = originalWords[Math.floor(Math.random() * originalWords.length)]
    const randomAlternativeWords = alternativeWords[Math.floor(Math.random() * alternativeWords.length)]

    sampleData.push({
      id: i.toString(),
      originalWord: randomOriginalWords,
      AlternativeWord: randomAlternativeWords,
      createdDate: getRandomDate(),
    })
  }
  return sampleData
}

const WordsTransformation = () => {
  const [data, setData] = useState(() => generateRandomData(100));
  const columns = [
    { key: 'id', label: 'No', width: 5, centerType: "text-center" },
    { key: 'originalWord', label: '원본 단어', width: 20, centerType: "text-center" },
    { key: 'AlternativeWord', label: '대체 단어', width: 20, centerType: "text-center" },
    { key: 'createdDate', label: '등록일', width: 20, centerType: "text-center" },
    { key: 'delete', label: '', width: 10, centerType: "text-center",
      render: (row: any) =>
        <div className="flex items-center justify-center gap-1">
          <Btn
            type="button"
            background="regular"
            size="sm"
            onClick={() => {
              setData(prevData => prevData.filter(item => item.id !== row.id));
            }}
          >
            삭제
          </Btn>
        </div>
    },
  ]
  // const sampleData = useMemo(() => generateRandomData(100), [])
  /* Usestate */
  const [isModalOpen, setModalOpen] = useState(false); // 팝업
  const [title, setTitle] = useState(""); // 팝업 - 원본 단어
  const [alterTitle, setAlterTitle] = useState(""); // 팝업 - 변환 단어
  const [startDate, setStartDate] = useState<Date | null>(new Date()) // 팝업 - 날짜(시작일)
  const [endDate, setEndDate] = useState<Date | null>(new Date()) // 팝업 - 날짜(종료일)

  return (
    <div>
      <Title title="단어 변환 관리">
        {/* 공지사항 등록 버튼 */}
        <Btn
          type="button"
          background="regular"
          size="sm"
          onClick={() => setModalOpen(true)}
        >
          <AiOutlinePlus className="mr-1" />변환 단어 등록
        </Btn>
      </Title>
      <SearchFilter/>
      <Grid columns={columns} data={data} isPaginated={true} showTotal={true} maxHeight="455px"/>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="변환 단어 등록"
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
        {/* 원본 단어 */}
        <div className="w-full">
          <Input
            id="title"
            label="원본 단어"
            value={title}
            onChange={setTitle}
            placeholder="원본 단어를 입력해 주세요."
            required
          />
        </div>
        <div className="mt-4 mb-4">
          <BiDownArrowAlt  className="w-6 h-6" color="#33BB9A"/>
        </div>
        {/* 대체 단어 */}
        <div className="w-full">
          <Input
            id="title"
            label="대체 단어"
            value={alterTitle}
            onChange={setAlterTitle}
            placeholder="대체 단어를 입력해 주세요."
            required
          />
        </div>

      </Modal>
    </div>
  )
}
export default WordsTransformation