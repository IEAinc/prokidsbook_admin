import { Link, useNavigate } from "react-router-dom"
import kkobi_search from './../assets/images/kkobi_search.svg'

const NotFound = () => {
    const navigate = useNavigate() // useNavigate 훅을 사용하여 navigate 함수 생성

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
            <img src={kkobi_search} alt="kkobi_search" className="w-50 mr-2 mb-1"/>
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">페이지를 찾을 수 없습니다.</p>
            <p className="mt-4 text-xl text-gray-600">주소가 잘못 입력되었거나, 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</p>

            <div className="mt-6 flex space-x-4">
                <Link
                    to="/dashboard"
                    className="rounded-lg bg-primary-main px-6 py-3 text-white font-semibold hover:bg-[#2BAA8B] flex items-center"
                >
                    홈으로 돌아가기
                </Link>
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-lg bg-gray-500 px-6 py-3 text-white font-semibold cursor-pointer hover:bg-gray-600 flex items-center"
                >
                    이전으로 돌아가기
                </button>
            </div>
        </div>
    )
}

export default NotFound
