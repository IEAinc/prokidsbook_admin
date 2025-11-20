import React from 'react'
import Tabs from './Tabs.tsx'
import { useYearData } from '../../../hooks/useCommonData.ts'
import Select from '../../common/forms/Select.tsx'

interface CardProps {
    height?: string
    width?: string
    title?: string
    content: string
    unit: string
    children?: React.ReactNode
    tabs?: { title: string; content: React.ReactNode }[]
    activeTab?: number
    setActiveTab?: React.Dispatch<React.SetStateAction<number>>
    selectedMonth?: string
    selectedYear?: string
    setSelectedMonth?: (month: string) => void
    setSelectedYear?: (year: string) => void
    selectedWeekMonth?: string
    setSelectedWeekMonth?: (month: string) => void
}

const DetailCard: React.FC<CardProps> = ({ height = 'auto', width = '100%', title, content, unit, children, tabs, activeTab, setActiveTab, selectedYear, setSelectedYear, selectedWeekMonth, setSelectedWeekMonth }) => {
    const { data: years } = useYearData()

    return (
        <div
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 dark:bg-[#1E2028] dark:border-gray-700 flex flex-col items-center justify-center"
            style={{ height, width }}
        >
            <div className="w-full flex flex-col">
                <div className="flex justify-between items-center">
                    {/* title */}
                    {title && !tabs && (
                        <h3 className="text-2xl font-bold text-center text-[#33BB9A] flex-1">{title}</h3>
                    )}

                    {/* tabs 있을 경우 */}
                    {tabs && (
                        <div className="flex item-top space-x-4">
                            <Tabs tabs={tabs.map((tab) => ({ title: tab.title, content: tab.content }))} activeTab={activeTab!} onTabClick={setActiveTab!} />
                        </div>
                    )}

                    {/* 주별 : 월 선택 */}
                    {(tabs && tabs[activeTab!]?.title === '주별') && (
                        <Select
                            value={selectedWeekMonth ? `${parseInt(selectedWeekMonth, 10)}월` : '월 선택'}
                            onChange={setSelectedWeekMonth!}
                            options={Array.from({ length: 12 }, (_, i) => `${i + 1}월`)}
                            width="100px"
                        />
                    )}

                    {/* 월별 : 연도 선택 */}
                    {(tabs && tabs[activeTab!]?.title === '월별') && (
                        <Select
                            value={selectedYear?.includes('년') ? selectedYear : selectedYear ? `${selectedYear}년` : '연도 선택'}
                            onChange={setSelectedYear!}
                            options={Array.isArray(years) ? years.slice().reverse().map((year) => `${year}년`) : []}
                            width="100px"
                        />
                    )}
                </div>

                <div className="mt-3 w-full">
                    {tabs ? (
                        <>
                            <div>{tabs[activeTab!]?.content}</div>
                            <div>{children}</div>
                        </>
                    ) : (
                        children
                    )}
                </div>

                <div className="mt-2 flex w-full items-end justify-center">
                    <h3 className="mr-1 font-bold text-5xl">{content}</h3>
                    <h3 className="font-bold text-2xl">{unit}</h3>
                </div>
            </div>
        </div>
    )
}

export default DetailCard