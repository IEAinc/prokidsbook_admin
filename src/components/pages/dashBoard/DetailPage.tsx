import { useState } from 'react'
import { useDetailData } from '../../../hooks/useCardData.ts'
import LineChart from './LineChart.tsx'
import DetailCard from './DetailCard.tsx'
import useCurrentDate from '../../../hooks/useCurrentDate.ts'
import star_yellow from "../../../assets/images/star_yellow.svg"

interface DetailPageProps {
    type: 'visitor' | 'download' | 'account' | 'stories' | 'characters'
    title: string
}

const DetailPage = ({ type, title }: DetailPageProps) => {
    const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } = useCurrentDate()
    const [activeTab, setActiveTab] = useState(0)
    const { data } = useDetailData(type)
    const [selectedWeekMonth, setSelectedWeekMonth] = useState<string>(selectedMonth)

    // visitor, download
    const cards = type === 'visitor' || type === 'download'
        ? [
            { id: 1, title: '오늘', content: data?.common?.today ?? '-', unit: '명' },
            { id: 2, title: '최근 7일', content: data?.common?.last7DaysTotal ?? '-', unit: '명' },
            { id: 3, title: '이번 달', content: data?.common?.thisMonthTotal ?? '-', unit: '명' },
            { id: 4, title: '전체', content: data?.common?.total ?? '-', unit: '명' },
        ]
        : [] // 기본적으로 빈 배열

    // account, stories, characters
    if (type === 'account' || type === 'characters') {
        cards.push(
            { id: 5, title: '오늘', content: data?.created?.today ?? '-', unit: '명' },
            { id: 6, title: '최근 7일', content: data?.created?.last7DaysTotal ?? '-', unit: '명' },
            { id: 7, title: '이번 달', content: data?.created?.thisMonthTotal ?? '-', unit: '명' },
            { id: 8, title: '전체', content: data?.created?.total ?? '-', unit: '명' },
            { id: 9, title: '오늘', content: data?.deleted?.today ?? '-', unit: '명' },
            { id: 10, title: '최근 7일', content: data?.deleted?.last7DaysTotal ?? '-', unit: '명' },
            { id: 11, title: '이번 달', content: data?.deleted?.thisMonthTotal ?? '-', unit: '명' },
            { id: 12, title: '전체', content: data?.deleted?.total ?? '-', unit: '명' }
        )
    }

    if (type === 'stories') {
        cards.push(
          { id: 5, title: '오늘', content: data?.created?.today ?? '-', unit: '권' },
          { id: 6, title: '최근 7일', content: data?.created?.last7DaysTotal ?? '-', unit: '권' },
          { id: 7, title: '이번 달', content: data?.created?.thisMonthTotal ?? '-', unit: '권' },
          { id: 8, title: '전체', content: data?.created?.total ?? '-', unit: '권' },
          { id: 9, title: '오늘', content: data?.deleted?.today ?? '-', unit: '권' },
          { id: 10, title: '최근 7일', content: data?.deleted?.last7DaysTotal ?? '-', unit: '권' },
          { id: 11, title: '이번 달', content: data?.deleted?.thisMonthTotal ?? '-', unit: '권' },
          { id: 12, title: '전체', content: data?.deleted?.total ?? '-', unit: '권' }
        )
    }

    // 제목 설정
    const getTitle = () => {
        switch (type) {
            case 'account':
                return { created: '회원가입', deleted: '회원탈퇴' }
            case 'stories':
                return { created: '제작 동화', deleted: '삭제 동화' }
            case 'characters':
                return { created: '제작 캐릭터', deleted: '삭제 캐릭터' }
            default:
                return { created: '', deleted: '' }
        }
    }

    const tabs = [
        { title: '최근 7일', content: null },
        { title: '주별', content: null },
        { title: '월별', content: null },
        { title: '연별', content: null }
    ]

    const periodTypes: ('LAST_7_DAYS' | 'MONTHLY_WEEKLY' | 'YEARLY_MONTHLY' | 'YEARLY')[] = ['LAST_7_DAYS', 'MONTHLY_WEEKLY', 'YEARLY_MONTHLY', 'YEARLY']
    const periodType = periodTypes[activeTab] || 'LAST_7_DAYS'

    // 날짜
    const getDate = () => {
        if (activeTab === 1) {
            return `${new Date().getFullYear()}-${selectedWeekMonth.replace('월', '').padStart(2, '0')}`
        } else if (activeTab === 2) {
            return selectedYear.replace('년', '')  // '월별'
        }
        return `${selectedYear}-${selectedMonth}`
    }

    const { created, deleted } = getTitle()

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <img src={star_yellow} alt="star" className="h-5 mr-2"/>
                {title}
            </h2>

            {/* visitor, download */}
            {(type === 'visitor' || type === 'download') && (
                <div className="mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {cards.map((card) => (
                            <DetailCard
                                key={card.id}
                                title={card.title}
                                content={card.content}
                                unit={card.unit}
                                height="180px"
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                selectedMonth={selectedMonth}
                                selectedYear={selectedYear}
                                setSelectedMonth={setSelectedMonth}
                                setSelectedYear={setSelectedYear}
                                selectedWeekMonth={selectedWeekMonth}
                                setSelectedWeekMonth={setSelectedWeekMonth}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* account, stories, characters */}
            {(type === 'account' || type === 'stories' || type === 'characters') && (
                <>
                    {/* Created */}
                    <div className="mb-5">
                        <h3 className="text-xl font-bold mb-4 ml-2">{created}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {cards.slice(0, 4).map((card) => (
                                <DetailCard
                                    key={card.id}
                                    title={card.title}
                                    content={card.content}
                                    unit={card.unit}
                                    height="150px"
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                    setSelectedMonth={setSelectedMonth}
                                    setSelectedYear={setSelectedYear}
                                    selectedWeekMonth={selectedWeekMonth}
                                    setSelectedWeekMonth={setSelectedWeekMonth}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Deleted */}
                    <div className="mb-5">
                        <h3 className="text-xl font-bold mb-4 ml-2">{deleted}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {cards.slice(4).map((card) => (
                                <DetailCard
                                    key={card.id}
                                    title={card.title}
                                    content={card.content}
                                    unit={card.unit}
                                    height="150px"
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                    setSelectedMonth={setSelectedMonth}
                                    setSelectedYear={setSelectedYear}
                                    selectedWeekMonth={selectedWeekMonth}
                                    setSelectedWeekMonth={setSelectedWeekMonth}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* LineChart */}
            <DetailCard height="550px" title="" content="" unit="" tabs={tabs} activeTab={activeTab}
                        setActiveTab={setActiveTab} selectedMonth={selectedMonth} selectedYear={selectedYear}
                        setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear}
                        selectedWeekMonth={selectedWeekMonth} setSelectedWeekMonth={setSelectedWeekMonth}>
                <div style={{ height: '100%' }}>
                    <LineChart type={type} periodType={periodType} date={getDate()} height="420px" />
                </div>
            </DetailCard>
        </div>
    )
}

export default DetailPage
