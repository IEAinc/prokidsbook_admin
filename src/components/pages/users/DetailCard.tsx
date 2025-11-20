import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  format } from 'date-fns'; // parse

/* 아이콘 */
import {HiPencilAlt, HiSave, HiChevronLeft, HiExclamation, HiOutlineChevronRight} from "react-icons/hi"
import { FaCircleExclamation } from "react-icons/fa6";

/* 컴포넌트 */
import CustomDatePicker from "../../common/datePickers/DatePicker.tsx";
// import Tooltip from '../../common/tooltipMessages/Tooltip.tsx'
import { useCustomToastTooltip, } from '../../common/tooltipMessages/CustomToastTooltip'; //CustomToastTooltipContainer
import Radio from '../../common/forms/Radio.tsx'
import Btn from '../../common/buttons/Btn.tsx'
import StarLevel from '../../common/customs/StarLevel.tsx'

// 임시 이미지 (삭제 예정)
import ch_img_sm from '../../../assets/images/ch_sm_img.png'
import {CustomToastContainer} from "../../common/modals/CustomToast.tsx";

const DetailCard: React.FC = () => {
    const navigate = useNavigate();
    /* toast UI 관련 */
    const { showToast } = useCustomToastTooltip();
    // toast UI에 들어가는 내용
    const handleShowToast = () => {
        showToast(
            <div className="flex flex-col items-start">
                <p className="text-xs font-bold text-black">
                    &lt;계정 이용 제한 기준&gt;
                </p>
                <p className="text-xs font-bold text-[#33BB9A]">
                    관리자는 아래를 참고하여 상황에 따라 적절한 조치를 결정할 수 있습니다.
                </p>
                {/* 경고 */}
                <p className="text-xs font-bold text-black mt-2">⚠️ 경고 (Warning)</p>
                <p className="text-xs text-black font-light pl-[10px] relative before:content-['•'] before:absolute before:left-0 before:top-0">
                    사용자의 의도 여부와 관계없이 미드저니, GPT에 벤 프롬프트 전달또는 부적절한 이미지/텍스트 생성한 경우
                    <span className="block">
                    -&gt; 사용자 앱 접속 시 화면에 경고 창 노출
                    </span>
                </p>
                {/* 일시정지 */}
                <p className="text-xs font-bold text-black mt-2">⏸ 일시정지 (Temporary Suspension)</p>
                <p className="text-xs text-black font-light pl-[10px] relative before:content-['•'] before:absolute before:left-0 before:top-0">
                    경고를 2회 이상 받은 사용자가 의도적으로 문제 콘텐츠를 생성한 경우
                    <span className="block">
                     -&gt; 일정 기간 동안 서비스 이용 제한
                    </span>
                </p>
                <p className="text-xs text-black font-light pl-[10px] relative before:content-['•'] before:absolute before:left-0 before:top-0">
                    예외: 3회 중 1회가 비의도적인 실수라면, 관리자의 판단하에 경고 유지 또는 감면 가능 (ex. 아이 배변 교육에 관련된 컨텐츠였으나 벤 당한 경우)
                </p>
                {/* 영구정지 */}
                <p className="text-xs font-bold text-black mt-2">🚫 영구정지 (Permanent Ban)</p>
                <p className="text-xs text-black font-light pl-[10px] relative before:content-['•'] before:absolute before:left-0 before:top-0">지속적인 문제 콘텐츠 생성으로 서비스 운영에 영향을 주는 경우</p>
                <p className="text-xs text-black font-light pl-[10px] relative before:content-['•'] before:absolute before:left-0 before:top-0">경고 3회 이상 + 일시정지 이력 보유</p>
                <p className="text-xs text-black font-light pl-[10px] relative before:content-['•'] before:absolute before:left-0 before:top-0">
                악의적인 패턴이 반복적으로 발견되는 경우
                    <span className="block">
                     -&gt; 관리자가 즉시 영구 정지 처리 가능
                    </span>
                </p>
            </div>
        );
    };


    // 삭제 처리 함수
    // const handleDelete = () => {
    //     console.log('삭제 처리');
    //     // 여기에 실제 삭제 로직 구현
    // };


    /* [삭제 예정] 임시 데이터 */
    const fieldData = {
        id:'1',
        name: '조현지',
        userId : 'adbde@iea.co.kr',
        phone : '010-0000-0000',
        join : '카카오',
        joinDate : '2025-02-27T14:30:25.000Z',
        recentVisit : '2025-02-27T14:30:25.000Z',
        membership: 'Premium',
        charactersCount:24,
        fairyCount: 5,
        level: 2,
        rewardCount: 1268,
        visitCount: 11,
        warningCount: 1,
        accountUsageRestriction: '',
        restrictionPeriod: '',
        warning1: '',
        warning1Date: '',
        warning1Reason: '외설적인 동화 내용으로 미드저니 경고 받음',
        warning1Action: '',
    }
    /* useState 모음 */
    const [warning1Reason, setWarning1Reason] = useState(fieldData.warning1Reason || "");
    const [isEdit, setIsEdit] = useState(false); // 수정모드
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())

    const handleMoveFairy = (userId: string) => {
        navigate(`/users/images/${userId}`)
    }
        return (
        <div>
            {/* 카드 (필터 영역) */}
            <div className="bg-white dark:bg-[#252731] rounded-lg shadow-md">
                <div className="border-b border-gray-300 dark:border-gray-600 rounded-t-lg col-span-8 p-4 bg-[#E0ECE9] dark:bg-zinc-700  font-bold flex text-lg items-center">회원 관리 상세</div>
                <div className="grid grid-cols-8 text-m">
                    {/* 이름 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100  dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        이름
                    </div>
                    <div className="p-4 col-span-3 border-b  border-gray-200 dark:border-gray-600">
                        <div className="flex items-center h-full gap-2">
                            <img src={ch_img_sm} alt={fieldData.name} className="w-[24px] h-[24px] rounded-full" />
                            {fieldData.name}
                        </div>
                    </div>
                    {/* 아이디 */}
                    <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100  dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        아이디
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.userId}</div>

                    {/* 연락처 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        연락처
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.phone}</div>

                    {/* 가입 구분 */}
                    <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        가입 구분
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.join}</div>

                    {/* 가입일 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        가입일
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">
                        {format(new Date(fieldData.joinDate), 'yyyy.MM.dd')}
                        <span className="text-xs text-gray-500 ml-1">
                            ({format(new Date(fieldData.joinDate), 'HH:mm:ss')})
                        </span>
                    </div>

                    {/* 최근 접속일 */}
                    <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold  flex items-center">
                        최근 접속일
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">
                        {format(new Date(fieldData.recentVisit), 'yyyy.MM.dd')}
                        <span className="text-xs text-gray-500 ml-1">
                            ({format(new Date(fieldData.recentVisit), 'HH:mm:ss')})
                        </span>
                    </div>

                    {/* 멤버십 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        멤버십
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.membership}</div>

                    {/* 캐릭터/동화 제작 */}
                    <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        캐릭터/동화 제작
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-1">
                            {fieldData.charactersCount}/{fieldData.fairyCount}
                            <HiOutlineChevronRight
                              className="cursor-pointer ml-2 text-gray-400 hover:text-gray-900"
                              onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveFairy(fieldData.id)
                              }}
                            />
                        </div>
                    </div>

                    {/* 레벨 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        레벨
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">
                        <StarLevel level={fieldData.level}   />
                    </div>

                    {/* 리워드 별 */}
                    <div className="border-b border-r border-l border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        리워드 별
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.rewardCount}</div>

                    {/* 방문 횟수 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        방문 횟수
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.visitCount}</div>

                    {/* 경고 횟수 */}
                    <div className="border-b border-r border-l  border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        경고 횟수
                    </div>
                    <div className="p-4 col-span-3 border-b border-gray-200 dark:border-gray-600">{fieldData.warning1}</div>

                    {/* 계정 이용 제한 */}
                    <div className="border-b border-r border-gray-300 py-4 pl-4 pr-2 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold">
                        <div className="flex items-center flex-wrap gap-1">
                            계정 이용 제한
                            <div className="flex items-center">
                                {/* '툴팁'버튼 클릭시 제시되는 모달창 */}
                                <FaCircleExclamation onClick={handleShowToast}/>
                                <CustomToastContainer />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                            <Radio name="option" value="option1">
                                <span className="inline-flex py-1 px-2 bg-[#888888] rounded-4xl text-sm text-white">일시 정지</span>
                            </Radio>
                            <Radio name="option" value="option1">
                                <span className="inline-flex py-1 px-2 bg-[#F56060] rounded-4xl text-sm text-white">영구 정지</span>
                            </Radio>
                        </div>
                    </div>

                    {/* 경고 1차*/}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        제한 기간
                    </div>
                    <div className="p-4 col-span-7 border-b border-gray-200 dark:border-gray-600">
                        <CustomDatePicker setDates={(start, end) => {
                            setStartDate(start ?? new Date())
                            setEndDate(end ?? new Date())
                        }} />
                    </div>

                    {/* 경고 1차*/}
                    <div className="border-b border-r row-span-8 border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center rounded-bl-lg">
                        경고 1차
                    </div>
                    {/* 날짜 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        날짜
                    </div>
                    <div className="p-4 col-span-6 border-b border-gray-200 dark:border-gray-600">날짜입력</div>
                    {/* 원인 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        원인
                    </div>
                    <div className="p-4 col-span-6 border-b border-gray-200 dark:border-gray-600">
                        <input
                          type="text"
                          value={warning1Reason} // State 값을 value로 설정
                          onChange={(e) => setWarning1Reason(e.target.value)} // State 업데이트
                          className={`p-2 rounded flex-1 w-full max-w-full focus:outline-gray-400 bg-white dark:bg-[#252731] ${
                            isEdit ? 'border border-gray-400' : 'border-0'
                          }`}
                          disabled={!isEdit}
                        />
                    </div>
                    {/* 조치 */}
                    <div className="border-b border-r border-gray-300 p-4 bg-gray-100 dark:border-gray-600 dark:bg-zinc-700 font-semibold flex items-center">
                        조치
                    </div>
                    <div className="p-4 col-span-6 border-b border-gray-200 dark:border-gray-600 rounded-br-lg">
                        앱 내 팝업 경고창, 메일로 경고 내용, 주의 전달
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

                {/* 3. 회원탈퇴 버튼 */}
                <Btn
                  type="button"
                  background="color"
                  color="red"
                  onClick={() => {
                  }}
                >
                    <HiExclamation className="mr-1"/>회원 탈퇴
                </Btn>
            </div>
        </div>
    )
}

export default DetailCard