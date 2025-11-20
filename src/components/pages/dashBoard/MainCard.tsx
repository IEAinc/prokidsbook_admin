import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Tabs from './Tabs.tsx'

interface Tab {
    title: string
    content: React.ReactNode
}

interface CardProps {
    title: string // 카드 제목
    height?: string // 높이
    onNavigate?: () => void
    navigateIcon?: string | React.ReactNode // 아이콘
    navigateLink?: string //  링크
    children?: React.ReactNode // 카드 내용
    tabs?: Tab[] // 탭 데이터
}

const MainCard: React.FC<CardProps> = ({ title, height = 'auto', onNavigate, navigateIcon, navigateLink, children, tabs }) => {
    const [activeTab, setActiveTab] = useState<number>(0)
    const isTwoChildren = React.Children.count(children) === 2

    return (
        <div
            className="bg-white p-5 w-full rounded-xl shadow-md border border-gray-200 dark:bg-zinc-700/50 dark:border-gray-700"
            style={{ height }}
        >
            <div className="flex justify-between items-top mb-3">
                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">{title}</h1>

                <div className="flex items-center space-x-4 space-y-10">
                    {tabs ? (
                        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
                    ) : (
                        onNavigate && navigateIcon && navigateLink ? (
                            <Link to={navigateLink}>
                                <button className="hover:opacity-80 transition-opacity cursor-pointer">
                                    <img src={navigateIcon as string} alt="이동하기" className="h-5 w-5" />
                                </button>
                            </Link>
                        ) : (
                            onNavigate && navigateIcon && (
                                <button onClick={onNavigate} className="hover:opacity-80 transition-opacity cursor-pointer">
                                    <img src={navigateIcon as string} alt="이동하기" className="h-5 w-5" />
                                </button>
                            )
                        )
                    )}
                </div>
            </div>

            <div className={`flex ${isTwoChildren ? 'flex-row space-x-5' : 'flex-col space-y-15'}`}>
                {tabs ? tabs[activeTab]?.content : children}
            </div>
        </div>
    )
}

export default MainCard