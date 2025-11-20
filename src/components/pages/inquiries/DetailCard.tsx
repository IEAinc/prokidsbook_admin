import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {HiChevronLeft} from "react-icons/hi";
/* 컴포넌트 */
import Btn from "../../common/buttons/Btn.tsx";
import Modal from '../../common/modals/Modal.tsx'
import Input from "../../common/forms/Input.tsx";
import Textarea from '../../common/forms/Textarea.tsx'

const DetailCard: React.FC = () => {
  const navigate = useNavigate();
  /* useState */
  const [isModalOpen, setModalOpen] = useState(false); // 팝업
  const [title, setTitle] = useState(""); // 팝업 - 이름
  const [titleError] = useState<string>("");  // 팝업 - 이름: string 타입으로 변경
  const [content, setContent] = useState(''); // 팝업 - 내용
  const [error, setError] = useState(''); // 팝업 - 내용: 오류

  const handleContentChange = (value: string) => {
    setContent(value);

    // 유효성 검사 예시
    if (value.length < 10) {
      setError('내용을 10자 이상 입력해주세요.');
    } else {
      setError('');
    }
  };

  /* [삭제 예정] 임시 데이터 */
  const fieldData = {
    name: '조현지',
    userId : 'adbde@iea.co.kr',
    createdDate: '2025.03.12',
    title: '캐릭터 다운로드가 되지 않아요',
    email: 'abdce@iea.co.kr',
    deviceInfo: 'iPhone 14 Pro/IOS 17.2',
    content:'안녕하세요. 캐릭터 다운로드 과정에서 문제가 발생하여 문의드립니다.'
  }
  return (
    <div>
      {/* 카드 (필터 영역) */}
      <div className="bg-white  dark:bg-[#252731]  rounded-lg shadow-md">
        <div className="border-b border-gray-300  dark:border-gray-600  rounded-t-lg col-span-8 p-4 bg-[#E0ECE9] dark:bg-zinc-700  font-bold flex text-lg items-center">1:1 문의내역 상세</div>
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

          {/* 제목 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            제목
          </div>
          <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
            {fieldData.title}
          </div>

          {/* 답변 받을 이메일 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            답변 받을 이메일
          </div>
          <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
            {fieldData.email}
          </div>

          {/* 기기 정보 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
            기기 정보
          </div>
          <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
            {fieldData.deviceInfo}
          </div>

          {/* 입력 내용 */}
          <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center rounded-bl-lg">
            입력 내용
          </div>
          <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600 rounded-br-lg">
            {fieldData.content}
          </div>
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

        {/* 2. 답변하기 버튼 */}
        <Btn
          type="button"
          background="color"
          color="green"
          onClick={() => setModalOpen(true)}
        >
          답변하기
        </Btn>
      </div>
      {/* 답변하기 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="1:1 문의 답변하기"
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
        <div className="w-full">
          <Input
            id="title"
            label="제목"
            value={title}
            onChange={setTitle}
            placeholder="제목을 입력해 주세요."
            required
            error={titleError || ""}
          />
        </div>
        {/* 내용 */}
        <div className="w-full mt-4">
          <Textarea
            id="content"
            label="내용"
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요"
            required
            error={error}
            rows={6}
          />
        </div>
      </Modal>
    </div>
  )
}

export default DetailCard;