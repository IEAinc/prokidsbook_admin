import React, { useState, useEffect } from 'react'
import useChartData from '../../../hooks/useChartData.ts'
import { useYearData } from '../../../hooks/useCommonData.ts'
import useCurrentDate from '../../../hooks/useCurrentDate.ts'
import Select from '../../common/forms/Select.tsx'

interface ListProps {
    name: 'visitor' | 'download' | 'account' | 'characters' | 'stories' // 탭
    columns: number // 열 개수
    headers: string[] // 제목 행
}

const List: React.FC<ListProps> = ({ name, headers }) => {
    const { data: years } = useYearData()
    const { selectedMonth } = useCurrentDate()
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())

    const { chartData } = useChartData({
        type: name,
        periodType: 'YEARLY_MONTHLY',
        date: selectedYear.replace('년', '')
    })

    const handleYearChange = (value: string) => {
        setSelectedYear(value)
    }

    useEffect(() => {
        if (years && years.length > 0) {
            const sortedYears = [...years].reverse()
            setSelectedYear(`${sortedYears[0]}년`)
        }
    }, [years])

    // 데이터가 없을 경우
    const commonData = chartData?.common || []
    const createdData = chartData?.created || []
    const deletedData = chartData?.deleted || []

    const months = [
        "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
    ]

    // 비어있는 값 '-'
    const formatData = (value: any) => (value === null || value === undefined ? '-' : value)

    return (
        <div className="w-[250px]">
            <div className="flex justify-between items-center mb-3 gap-5">
                {/* title */}
                <h2 className="text-l font-bold inline-flex items-center">월별 통계</h2>

                {/* selectbox */}
                <div className="flex items-center">
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
                        options={Array.isArray(years) ? years.slice().reverse().map((year) => `${year}년`) : []}
                        width="100px"
                    />
                </div>
            </div>

            {/* list */}
            <div className="overflow-auto w-full h-[240px] custom-scrollbar">
                {commonData.length > 0 || createdData.length > 0 || deletedData.length > 0 ? (
                    <div className="flex flex-col">
                        {/* 제목 행 */}
                        <div className="flex p-2 font-bold text-red dark:text-light-gray border-b-2 border-gray-300 dark:border-gray-400">
                            {headers.map((header, index) => (
                                <div key={index} className="flex-1 text-center">{header}</div>
                            ))}
                        </div>

                        {months.map((month, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-2 border-b border-gray-300  dark:border-gray-500 ${selectedMonth === (index + 1).toString().padStart(2, '0') ? 'bg-[#E0ECE9] dark:bg-gray-500' : ''}`}
                            >
                                <div className="flex-1 text-center">{month}</div>
                                {['visitor', 'download'].includes(name) ? (
                                    <div className="flex-1 text-center">{formatData(commonData[index]?.value)} 건</div>
                                ) : (
                                    <>
                                        <div className="flex-1 text-center">{formatData(createdData[index]?.value)} 건
                                        </div>
                                        <div className="flex-1 text-center">{formatData(deletedData[index]?.value)} 건
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>통계 데이터가 없습니다.</p>
                )}
            </div>
        </div>
    )
}

export default List