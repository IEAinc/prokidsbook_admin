import {useNavigate} from "react-router-dom";
/* 이미지 */
import arrow_l from "../../../assets/images/arrow_l.svg";
/* 컴포넌트 */
import DetailCard from "../../../components/pages/prompts/DetailCard.tsx";

export default function UserPromptsDetail() {
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
          사용자 입력
        </h2>
      </div>
      <DetailCard />
    </div>
  )
}