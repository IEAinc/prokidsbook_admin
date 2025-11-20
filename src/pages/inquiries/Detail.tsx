import DetailCard from "../../components/pages/inquiries/DetailCard.tsx"
import arrow_l from "../../assets/images/arrow_l.svg";
import {useNavigate} from "react-router-dom";

export default function InquiriesDetail() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <img
          src={arrow_l}
          alt="arrow_l"
          className="h-5 mr-2 cursor-pointer fill-[#000000]"
          onClick={handleGoBack}
        />
        1:1 문의 내역
      </h2>
      <DetailCard />
    </div>
  )
}