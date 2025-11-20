import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
/* 아이콘 */
import {HiPencilAlt, HiSave, HiChevronLeft} from "react-icons/hi"

/* 컴포넌트 */
import CustomDatePicker from "../../common/datePickers/DatePicker.tsx";
import Btn from '../../common/buttons/Btn.tsx'

/* 에디터 */
import { CustomQuillEditor } from '../../common/forms/CustomQuillEditor.tsx';

const DetailCard: React.FC = () => {
    const navigate = useNavigate();
    /* [삭제 예정] 임시 데이터 */
    const fieldData = {
        title: '조현지',
        createdDate : 'adbde@iea.co.kr',
        lastUpdatedDate : '-',
        attachment : '공지사항.png',
        exposurePeriod : ['2025-03-01', '2025-03-31'],
        content : '2025.02.27',
    }
    /* useState 모음 */
    const [isEdit, setIsEdit] = useState(false); // 수정모드
    const [startDate, setStartDate] = useState<Date | null>(new Date()) // 노출 기간 - 시작
    const [endDate, setEndDate] = useState<Date | null>(new Date()) // 노출 기간  - 마감
    const [content, setContent] = useState(""); // 입력내용 - 에디터
    return (
        <div>
            {/* 카드 (필터 영역) */}
            <div className="bg-white dark:bg-[#252731] rounded-lg shadow-md">
                <div className="border-b border-gray-300 dark:border-gray-600 rounded-t-lg col-span-8 p-4 bg-[#E0ECE9] dark:bg-zinc-700  font-bold flex text-lg items-center">공지사항 상세</div>
                <div className="grid grid-cols-8 text-m">
                    {/* 제목 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700  font-semibold flex items-center">
                        제목
                    </div>
                    <div className="p-4 col-span-7 border-b  border-gray-200 dark:border-gray-600">
                        {fieldData.title}
                    </div>

                    {/* 등록일 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700  font-semibold flex items-center">
                        등록일
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.createdDate}</div>

                    {/* 최종 수정일 */}
                    <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700  font-semibold flex items-center">
                        최종 수정일
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.createdDate}</div>

                    {/* 첨부파일 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700  font-semibold flex items-center">
                        첨부파일
                    </div>
                    <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                            {fieldData.attachment}
                            <Btn
                              type="button"
                              background="regular"
                              size="sm"
                              onClick={() => {console.log('미리보기')}}
                            >
                                미리보기
                            </Btn>
                            <Btn
                              type="button"
                              background="regular"
                              size="sm"
                              onClick={() => {console.log('다운로드')}}
                            >
                                다운로드
                            </Btn>
                        </div>
                    </div>

                    {/* 노출 기간 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700  font-semibold flex items-center">
                        노출 기간
                    </div>
                    <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
                        <CustomDatePicker setDates={(start, end) => {
                            setStartDate(start ?? new Date())
                            setEndDate(end ?? new Date())
                        }} />
                    </div>
                    
                    {/* 입력 내용 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700  font-semibold flex items-center rounded-bl-lg">
                        입력 내용
                    </div>
                    <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600 rounded-br-lg">
                        <CustomQuillEditor
                          initialValue={content}
                          onChange={(content: string) => setContent(content)}
                        />
                    </div>
                </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-center space-x-2 mt-4">
                {/* 1. 이전 버튼 */}
                <Btn
                  type="button"
                  background="regular"
                  onClick={() => {
                      /* 날짜: 닫기 버튼 실행시 리셋 */
                      setStartDate(startDate)
                      setEndDate(endDate)
                      /* 이전으로 이동 */
                      navigate(-1)
                  }}
                >
                    <HiChevronLeft className="mr-1"/>이전
                </Btn>
                {/* 수정 버튼 */}
                <Btn
                  type="button"
                  background="color"
                  color="green"
                  onClick={() => {
                      if (isEdit) {
                          // 저장 로직 실행
                          // 저장이 완료되면 편집 모드 종료
                          setIsEdit(false);
                      } else {
                          // 수정 모드 시작
                          setIsEdit(true);
                      }
                  }}
                >
                    {isEdit ? (
                      <>
                          <HiSave className="mr-1"/>저장
                      </>
                    ) : (
                      <>
                          <HiPencilAlt className="mr-1"/>수정
                      </>
                    )}
                </Btn>

                {/* 3. 삭제 버튼 */}
                <Btn
                  type="button"
                  background="color"
                  color="red"
                  onClick={() => {
                  }}
                >
                    삭제
                </Btn>
            </div>
        </div>
    )
}

export default DetailCard