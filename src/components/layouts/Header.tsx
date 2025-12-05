import { Link, useNavigate } from 'react-router-dom'
import character1 from '../../assets/images/kkobi_default.svg'
// import { useTranslation } from 'react-i18next'
// import { useState } from 'react'

export default function Header() {
  // const { t, i18n } = useTranslation()  // i18n과 t 함수 가져오기
  const navigate = useNavigate()
  // const [isDarkMode, setIsDarkMode] = useState(false) // 다크 모드 상태 관리
  // const [isKorean, setIsKorean] = useState(true) // 한국어 상태 관리

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.clear() // 로컬 스토리지에서 모든 아이템 삭제
    window.location.href = '/' // 로그인 페이지로 이동
  }

  // 언어 변경 함수
  // const toggleLanguage = () => {
  //     const newLanguage = isKorean ? 'en' : 'ko'
  //     i18n.changeLanguage(newLanguage) // 언어 변경
  //     setIsKorean(!isKorean) // 한국어 상태 변경
  // }

  // 테마 변경 함수
  // const toggleTheme = () => {
  //     const newTheme = !isDarkMode ? 'dark' : 'light'
  //     document.documentElement.classList.toggle('dark', newTheme === 'dark') // 다크 모드/라이트 모드 토글
  //     setIsDarkMode(!isDarkMode) // 다크 모드 상태 변경
  // }

  // const handleImageClick = () => {
  //     toggleLanguage()  // 언어 토글
  //     // toggleTheme()     // 테마 토글
  // }

  return (
    <header className="flex bg-white items-center justify-between h-16 px-8 shadow-md fixed top-0 left-0 right-0 z-50 dark:bg-zinc-700 dark:border-gray-700">
      <Link to="/dashboard">
        <img src="/logo/proKids_logo.svg" alt="ProKids Logo" className="h-9" />
      </Link>
      <div className="flex items-center">
        <img
          src={character1}
          alt="character1"
          className="h-8"
        // className="h-8 cursor-pointer"
        // onClick={handleImageClick}
        />
        <h2 className="text-base font-bold pl-1 pr-5">프로키즈북 관리자님</h2>

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="bg-primary-main text-white font-semibold px-4 py-2 rounded-md cursor-pointer hover:bg-[#2BAA8B]"
        >
          로그아웃
          {/*{t('header.logout')}*/}
        </button>
      </div>
    </header>
  )
}