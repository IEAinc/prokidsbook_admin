import { IoIosWarning } from "react-icons/io";
import { FaRegPauseCircle } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
const AccountUsageRestrictionCriteria = () => {
  return (
    <div>
      <p>{'<'}계정 이용 제한 기준{'>'}</p>
      <p>* 관리자는 아래를 참고하여 상황에 따라 적절한 조치를 결정할 수 있습니다.</p>
      <div className="mt-1">
        <p><IoIosWarning size={12}/>경고(Warning)</p>
        <p>사용자의 의도 여부와 관계없이 미드저니, GPT에 벤 프롬프트 전달 또는 부적절한 이미지/텍스트 생성한 경우</p>
        <p>-{'>'} 사용자 앱 접속 시 화면에 경고 창 노출</p>
      </div>
      <div className="mt-1">
        <p><FaRegPauseCircle size={12}/>일시정지(Temporary Suspention)</p>
        <p>사용자의 의도 여부와 관계없이 미드저니, GPT에 벤 프롬프트 전달 또는 부적절한 이미지/텍스트 생성한 경우</p>
        <p>-{'>'} 사용자 앱 접속 시 화면에 경고 창 노출</p>
      </div>
      <div className="mt-1">
        <p><AiFillStop size={12}/>영구정지 (Permanent Ban)</p>
        <p>사용자의 의도 여부와 관계없이 미드저니, GPT에 벤 프롬프트 전달 또는 부적절한 이미지/텍스트 생성한 경우</p>
        <p>-{'>'} 사용자 앱 접속 시 화면에 경고 창 노출</p>
      </div>
    </div>
  )
}

export default AccountUsageRestrictionCriteria;