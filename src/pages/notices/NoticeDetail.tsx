import {useNavigate} from "react-router-dom";
import arrow_l from "../../assets/images/arrow_l.svg";
import DetailCard from "../../components/pages/notices/DetailCard.tsx";

export default function NoticeDetail() {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="flex items-center text-2xl font-bold">
            <img
              src={arrow_l}
              alt="arrow_l"
              className="h-5 mr-2 cursor-pointer fill-[#000000]"
              onClick={handleGoBack}
            />
            공지사항 상세
          </h2>
        </div>
        <DetailCard />
      </div>
    </div>
  )
}