import { useNavigate } from 'react-router-dom'
import { useCardData } from './../../hooks/useCardData'
import MainCard from '../../components/pages/dashBoard/MainCard'
import List from '../../components/pages/dashBoard/List'
import LineChart from '../../components/pages/dashBoard/LineChart'
import arrowIcon from '../../assets/images/arrow_r.svg'
import star_yellow from "../../assets/images/star_yellow.svg"

interface CardData {
    id: number
    title: string
    details: { [key: string]: string }
    labels: { [key: string]: string }
}

interface TabData {
    name: 'visitor' | 'download' | 'account' | 'characters' | 'stories'
    title: string
    component: JSX.Element
    data: number[]
    columns: number
    headers: string[]
}

export default function Dashboard() {
    const navigate = useNavigate()
    const { data, error } = useCardData()

    const cardLinks: { [key: string]: string } = {
        '방문자 수': '/dashboard/visitor',
        '다운로드 수': '/dashboard/download',
        '가입자 현황': '/dashboard/user',
        '동화 생성 현황': '/dashboard/story',
        '캐릭터 생성 현황': '/dashboard/character',
        '1:1 문의 내역': '/dashboard',
    }

    const handleIconClick = (link: string) => {
        navigate(link)
    }

    const getCountStyle = (count: string) => {
        if (count === '-') return '' // '-'만 있을 경우 검정색
        if (count.startsWith('-')) return 'text-blue-500' // 음수일 경우 파란색
        if (count !== '0') return 'text-red-500' // 0이 아닐 경우 빨간색
        return ''
    }

    if (error) return <p className="text-red-500">{error}</p>

    const cards: CardData[] = [
        {
            id: 1,
            title: '방문자 수',
            details: {
                today: data?.visitor.today ?? '-',
                todayCount: data?.visitor.todayCount ?? '',
                week: data?.visitor.week ?? '-',
                month: data?.visitor.month ?? '-',
                total: data?.visitor.total ?? '-',
            },
            labels: {
                todayLabel: '오늘(+전일대비 증감)',
                weekLabel: '최근 7일',
                monthLabel: '이번 달',
                totalLabel: '전체',
            },
        },
        {
            id: 2,
            title: '다운로드 수',
            details: {
                today: data?.download.today ?? '-',
                todayCount: data?.download.todayCount ?? '',
                week: data?.download.week ?? '-',
                month: data?.download.month ?? '-',
                total: data?.download.total ?? '-',
            },
            labels: {
                todayLabel: '오늘(+전일대비 증감)',
                weekLabel: '최근 7일',
                monthLabel: '이번 달',
                totalLabel: '전체',
            },
        },
        {
            id: 3,
            title: '가입자 현황',
            details: {
                today: data?.account.today ?? '-',
                todayCount: data?.account.todayCount ?? '',
                week: data?.account.week ?? '-',
                month: data?.account.month ?? '-',
                total: data?.account.total ?? '-',
            },
            labels: {
                todayLabel: '신규 회원가입(+전일대비 증감)',
                weekLabel: '최근 7일',
                monthLabel: '신규 회원탈퇴(+전일대비 증감)',
                totalLabel: '총 회원탈퇴',
            },
        },
        {
            id: 4,
            title: '동화 생성 현황',
            details: {
                today: data?.stories.today ?? '-',
                todayCount: data?.stories.todayCount ?? '',
                week: data?.stories.week ?? '-',
                month: data?.stories.month ?? '-',
                total: data?.stories.total ?? '-',
            },
            labels: {
                todayLabel: '오늘 제작 동화(+전일대비 증감)',
                weekLabel: '총 제작 동화',
                monthLabel: '오늘 삭제 동화(+전일대비 증감)',
                totalLabel: '총 삭제 동화',
            },
        },
        {
            id: 5,
            title: '캐릭터 생성 현황',
            details: {
                today: data?.characters.today ?? '-',
                todayCount: data?.characters.todayCount ?? '',
                week: data?.characters.week ?? '-',
                month: data?.characters.month ?? '-',
                total: data?.characters.total ?? '-',
            },
            labels: {
                todayLabel: '오늘 제작 캐릭터(+전일대비 증감)',
                weekLabel: '총 제작 캐릭터',
                monthLabel: '오늘 삭제 캐릭터(+전일대비 증감)',
                totalLabel: '총 삭제 캐릭터',
            },
        },
        {
            id: 6,
            title: '1:1 문의 내역',
            details: {
                today: '-',
                week: '-',
            },
            labels: {
                todayLabel: '문의 대기',
                weekLabel: '문의 완료',
            },
        },
    ]

    const tabsData: TabData[] = [
        { name: 'visitor', title: '방문자 수', component: <LineChart type="visitor" periodType="LAST_7_DAYS" date="" height="300px" />, data: [12, 15], columns: 2, headers: ["월", "누적방문자 수"] },
        { name: 'download', title: '다운로드 수', component: <LineChart type="download" periodType="LAST_7_DAYS"  date="" height="300px" />, data: [5, 6], columns: 2, headers: ["월", "누적다운로드 수"] },
        { name: 'account', title: '가입자 현황', component: <LineChart type="account" periodType="LAST_7_DAYS"  date="" height="300px" />, data: [5, 6], columns: 3, headers: ["월", "가입", "탈퇴"] },
        { name: 'stories', title: '동화 생성 현황', component: <LineChart type="stories" periodType="LAST_7_DAYS"  date="" height="300px" />, data: [5, 6], columns: 3, headers: ["월", "제작", "삭제"] },
        { name: 'characters', title: '캐릭터 생성 현황', component: <LineChart type="characters" periodType="LAST_7_DAYS" date="" height="300px" />, data: [5, 6], columns: 3, headers: ["월", "제작", "삭제"] },
    ]

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <img src={star_yellow} alt="star" className="h-5 mr-2"/>
                대시보드
            </h2>


            {/* 카드 리스트 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cards.map((card) => (
                    <div key={card.id} className="block">
                        <MainCard
                            title={card.title}
                            height="190px"
                            onNavigate={() => handleIconClick(cardLinks[card.title])}
                            navigateIcon={arrowIcon}
                        >
                            <div>
                                {Object.keys(card.labels).map((key) => {
                                    const label = card.labels[key]
                                    const detailKey = key.replace('Label', '').toLowerCase()
                                    const detail = card.details[detailKey]
                                    const detailCount = card.details[detailKey + 'Count']

                                    if (label && detail) {
                                        return (
                                            <p key={key} className="flex justify-between mt-1">
                                                <span className="text-gray-800 dark:text-gray-200">{label}</span>
                                                <span className="font-semibold text-l">
                                                    {detail}{' '}
                                                    {detailCount && (
                                                        <span className={`${getCountStyle(detailCount)}`}>
                                                            ({detailCount})
                                                        </span>
                                                    )}
                                                </span>
                                            </p>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </MainCard>
                    </div>
                ))}
            </div>
            {/* 차트 & 리스트 영역 */}
            <div className="mt-5">
                <MainCard
                    title="최근 7일 주요 현황"
                    height="400px"
                    tabs={tabsData.map((tab) => ({
                        title: tab.title,
                        content: (
                            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 lg:space-x-8 w-full">
                                <div className="flex-1 min-w-[400px]">{tab.component}</div>
                                <List name={tab.name} columns={tab.columns} headers={tab.headers} />
                            </div>
                        ),
                    }))}
                />
            </div>
        </div>
    )
}