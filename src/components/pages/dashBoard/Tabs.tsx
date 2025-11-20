import React from 'react'

interface Tab {
    title: string
    content: React.ReactNode
}

interface TabsProps {
    tabs: Tab[] // 탭 제목과 내용을 가진 배열
    activeTab: number // 활성화된 탭의 인덱스
    onTabClick: (index: number) => void // 탭 클릭 시 호출되는 함수
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
    return (
        <div className="flex space-x-6 mb-4 border-b border-gray-300 dark:border-gray-700">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => onTabClick(index)}
                    className={`pb-2 px-4 text-s font-medium ${index === activeTab ? 'border-b-3 border-[#33BB9A] text-[#33BB9A]' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:dark:text-[#33BB9A]'}`}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    )
}

export default Tabs
