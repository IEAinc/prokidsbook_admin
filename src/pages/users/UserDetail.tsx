/**
 * @file UserDetail.tsx
 * @description 회원 관리 > 회원 상세 페이지
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow_l from "../../assets/images/arrow_l.svg";

import CustomDatePicker from "../../components/common/datePickers/DatePicker.tsx";
import Btn from '../../components/common/buttons/Btn';
import Input from '../../components/common/forms/Input';
import Radio from '../../components/common/forms/Radio';
import Textarea from '../../components/common/forms/Textarea';
import Modal from '../../components/common/modals/Modal.tsx';

import DetailCard from "../../components/pages/users/DetailCard.tsx";

export default function UserDetail() {
    const [isModalOpen, setModalOpen] = useState(false); // 팝업
    const [title, setTitle] = useState(""); // 팝업 - 이름
    const [titleError] = useState<string>("");  // 팝업 - 이름: string 타입으로 변경
    const [startDate, setStartDate] = useState<Date | null>(new Date()) // 팝업 - 날짜(시작일)
    const [endDate, setEndDate] = useState<Date | null>(new Date()) // 팝업 - 날짜(종료일)
    const [content, setContent] = useState(''); // 팝업 - 내용
    const [error, setError] = useState(''); // 팝업 - 내용: 오류

    const handleContentChange = (value: string) => {
        setContent(value);

        if (value.length < 1) {
            setError('내용을 입력해주세요.');
        } else {
            setError('');
        }
    };

    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="flex items-center text-2xl font-bold">
                    <img
                      src={arrow_l}
                      alt="arrow_l"
                      className="h-5 mr-2 cursor-pointer fill-[#000000]"
                      onClick={handleGoBack}
                    />
                    회원 관리
                </h2>
                <Btn
                  type="button"
                  background="regular"
                  size="sm"
                  onClick={() => setModalOpen(true)}
                >
                    경고 팝업 발송
                </Btn>
                {/* [팝업] 경고 팝업 */}
                <Modal
                  isOpen={isModalOpen}
                  title="경고 팝업 발송"
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
                    {/* 오늘 하루 보지 않기 */}
                    <div className="w-full mt-4">
                        <p className="text-sm font-bold text-black mb-1">오늘 하루 보지 않기</p>
                        <div className="flex items-center gap-4">
                            <Radio name="option" value="option1">
                                <span className="text-sm">포함</span>
                            </Radio>
                            <Radio name="option" value="option2">
                                <span className="text-sm">미포함</span>
                            </Radio>
                        </div>
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
            <DetailCard />
        </div>
    )
}