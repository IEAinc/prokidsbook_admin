import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
/* 아이콘 */
import {AiOutlinePlus} from "react-icons/ai";

/* 컴포넌트 */
import Title from '../../components/common/customs/Title.tsx'
import SearchFilter from '../../components/pages/notices/SearchFilter';
import Btn from "../../components/common/buttons/Btn.tsx";
import Input from '../../components/common/forms/Input';

/* 모달 */
import Modal from "../../components/common/modals/Modal.tsx";

/* 에디터 */
import FileUploader from "../../components/common/forms/FileUpload.tsx";
import { CustomQuillEditor } from '../../components/common/forms/CustomQuillEditor';
import CustomDatePicker from "../../components/common/datePickers/DatePicker.tsx";
import Grid from "../../components/common/grids/Grid.tsx";

/* [삭제 예정] 임시 데이터 */
const generateRandomData = (count: number) => {
  const sampleData = []

  const getRandomDate = () => {
    const start = new Date(2024, 0, 1)
    const end = new Date()
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split('T')[0]
  }
  const titles = ["프로키즈북 신기능 안내", "[동화 만들기 대회] 최대 상금 100만원!", "반짝 이벤트 참여해요!", "출시 기념 전 기능 무제한 오픈", "프로키즈북 리뉴얼 업데이트"]
  const statuses = ['활성','비활성']

  for (let i = 1; i <= count; i++) {
    const randomTitles = titles[Math.floor(Math.random() * titles.length)]
    const randomCreatedDate = getRandomDate()
    const randomExposurePeriod = `${getRandomDate()} ~ ${getRandomDate()}`
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    sampleData.push({
      id: i.toString(),
      title: randomTitles,
      createdDate: randomCreatedDate,
      exposurePeriod: randomExposurePeriod,
      status: randomStatus,
    })
  }
  return sampleData
}

export default function Notices() {
  const navigate = useNavigate();
  const handleRowClick = (row: { id: string | number }) => {
    navigate(`/notices/detail/${String(row.id)}`)
  }
  /* UseState */
  const [isModalOpen, setModalOpen] = useState(false); // 팝업
  const [title, setTitle] = useState(""); // 팝업 - 제목
  const [titleError] = useState<string>("");  // 팝업 - 제목: string 타입으로 변경
  const [content, setContent] = useState(""); // 팝업 - 에디터 내용 상태 추가
  const [, setStartDate] = useState<Date | null>(new Date()) // 노출 기간 - 시작
  const [, setEndDate] = useState<Date | null>(new Date()) // 노출 기간  - 마감

  /* handler */
  const handleFileSelect = (file: File) => {
    // 파일 처리 로직
    console.log("Selected file:", file);
  };
  const columns = [
    { key: 'id', label: 'No', width: 5, centerType: "text-center" },
    { key: 'title', label: '제목', width: 20, centerType: "text-center" },
    { key: 'createdDate', label: '입력일', width: 10, centerType: "text-center" },
    { key: 'exposurePeriod', label: '노출 기간', width: 10, centerType: "text-center" },
    { key: 'status', label: '카테고리', width: 10, centerType: "text-center",
      render: (row: any) =>
        <span className={`inline-flex py-1 px-2 min-w-[50px] justify-center text-sm rounded-full text-white ${row.status === '활성' ? 'bg-[#33BB3E]' : 'bg-[#A5A5A5]'}`}>
      {row.status}
    </span>
    },
  ]
  const sampleData = useMemo(() => generateRandomData(100), [])
  return (
    <div>
      <Title title="공지사항">
        {/* 공지사항 등록 버튼 */}
        <Btn
          type="button"
          background="regular"
          size="sm"
          onClick={() => setModalOpen(true)}
        >
          <AiOutlinePlus className="mr-1" />공지사항 등록
        </Btn>
      </Title>
      <SearchFilter />
      <Grid columns={columns} data={sampleData} isPaginated={true} showTotal={true} maxHeight="455px" onRowClick={handleRowClick}/>
      {/* [팝업] 공지사항 등록 */}
      <Modal
        isOpen={isModalOpen}
        title="공지사항 등록"
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
        }}
      >
        {/* 제목 */}
        <div className="w-full mt-4">
          <Input
            id="title"
            label="제목"
            value={title}
            onChange={setTitle}
            column={true}
            placeholder="공지사항 제목을 입력해주세요."
            required
            error={titleError || ""}
          />
        </div>

        {/* 파일 첨부 */}
        <div className="w-full mt-4">
          <p className="text-sm font-bold text-black mb-1">파일 첨부</p>
          <FileUploader
            onFileSelect={handleFileSelect}
            acceptedFileTypes={{ "image/*": [] }}
            maxFileSize={5 * 1024 * 1024} // 5MB
          />
        </div>

        {/* 노출 기간 */}
        <div className="w-full mt-4">
          <p className="text-sm font-bold text-black mb-1">노출 기간</p>
          <CustomDatePicker setDates={(start, end) => {
            setStartDate(start ?? new Date())
            setEndDate(end ?? new Date())
          }} />
        </div>

        {/* 내용 */}
        <div className="w-full mt-4">
          <p className="text-sm font-bold text-black mb-1">내용</p>
          <CustomQuillEditor
            initialValue={content}
            onChange={(content: string) => setContent(content)}
          />
        </div>
      </Modal>
    </div>
  )
}