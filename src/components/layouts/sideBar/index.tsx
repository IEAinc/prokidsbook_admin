import React from 'react'
import SidebarSection from './SidebarSection.tsx'

const Sidebar: React.FC = () => {
  const sections = [
    {
      title: '대시보드',
      titleLink: '/dashboard',
      links: [
        { to: '/dashboard/visitor', label: '방문자 수' },
        { to: '/dashboard/download', label: '다운로드 수' },
        { to: '/dashboard/user', label: '가입자 현황' },
        { to: '/dashboard/story', label: '동화 생성 현황' },
        { to: '/dashboard/character', label: '캐릭터 생성 현황' },
      ],
    },
    {
      title: '사용자관리',
      links: [
        { to: '/users/management', label: '회원 관리' },
        { to: '/users/withdrawn', label: '탈퇴 회원' },
      ],
    },
    {
      title: '1:1 문의 내역',
      titleLink: '/inquiries',
      links: [
      ],
    },
    /*{
      title: '생성 이미지 관리',
      links: [
        { to: '/images/characters', label: '캐릭터 이미지' },
        { to: '/images/illustrations', label: '삽화 이미지' },
      ],
    },*/
    {
      title: '내용 프롬프트 관리',
      links: [
        { to: '/prompts/user', label: '사용자 입력' },
        { to: '/prompts/gpt', label: 'GPT' },
        { to: '/prompts/trans', label: '단어 변환 관리' },
        { to: '/prompts/banned', label: '벤 단어 관리' },
      ],
    },
    {
      title: '공지사항',
      titleLink: '/notices',
    },
  ]

  return (
      <div className="h-screen">
        {/* Sidebar Container */}
        <div
            className="fixed left-0 top-0 mt-16 w-52 h-[calc(100vh-64px)]   overflow-y-auto bg-[#E0ECE9] dark:bg-[#252731] border-r border-gray-200 dark:border-gray-700">
          <h2 className="text-xl mt-6 text-[#33BB9A] font-bold text-center">Administrator</h2>
          {/* Navigation Menu */}
          <nav className="py-2">
            {sections.map((section) => (
                <SidebarSection
                    key={section.title}
                    title={section.title}
                    links={section.links || []}
                    titleLink={section.titleLink}
                />
            ))}
          </nav>
        </div>
      </div>
  )
}

export default Sidebar
