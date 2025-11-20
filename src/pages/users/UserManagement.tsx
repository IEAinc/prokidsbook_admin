import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '../../components/common/grids/Grid.tsx'
import SearchFilter from '../../components/pages/users/SearchFilter.tsx'
import { HiOutlineChevronRight } from "react-icons/hi"

import nebula_1 from '../../assets/images/level/nebula_1.svg'
import star_2 from '../../assets/images/level/star_2.svg'
import star_3 from '../../assets/images/level/star_3.svg'
import star_4 from '../../assets/images/level/star_4.svg'
import star_5 from '../../assets/images/level/star_5.svg'
import star_6 from '../../assets/images/level/star_6.svg'
import star_7 from '../../assets/images/level/star_7.svg'
import star_8 from '../../assets/images/level/star_8.svg'
import star_9 from '../../assets/images/level/star_9.svg'
import star_10 from '../../assets/images/level/star_10.svg'
import star_11 from '../../assets/images/level/star_11.svg'
import Title from "../../components/common/customs/Title.tsx";

const levelImages: { [key: string]: string } = {
    "성운": nebula_1,
    "작은 별(빨강)": star_2,
    "작은 별(주황)": star_3,
    "작은 별(노랑)": star_4,
    "작은 별(초록)": star_5,
    "작은 별(하늘)": star_6,
    "작은 별(파랑)": star_7,
    "작은 별(보라)": star_8,
    "반짝반짝 작은 별": star_9,
    "알록달록 무지개 별": star_10,
    "초신성": star_11
}

const getLevelImage = (level: string) => levelImages[level] || nebula_1

const generateRandomData = (count: number) => {
    const names = ["김서준", "이지우", "박하윤", "최민서", "정유진", "강도현", "윤지호", "조하린", "임준호", "한예린"]
    const memberships = ["경고", "일시정지", "영구정지", "멤버십 "]
    const levels = Object.keys(levelImages)
    const domains = ["@kakao.com", "@google.com"]
    const sampleData = []

    const getRandomDate = () => {
        const start = new Date(2024, 0, 1)
        const end = new Date()
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        return date.toISOString().split('T')[0]
    }

    for (let i = 1; i <= count; i++) {
        const randomName = names[Math.floor(Math.random() * names.length)]
        const randomUsername = `user${Math.floor(Math.random() * 100) + 1}${domains[Math.floor(Math.random() * domains.length)]}`
        const randomPhone = `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`
        const randomMembership = memberships[Math.floor(Math.random() * memberships.length)]
        const randomWarnings = Math.floor(Math.random() * 4)
        const randomVisits = Math.floor(Math.random() * 100)
        const randomMake = `${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 20)}`
        const randomLevel = levels[Math.floor(Math.random() * levels.length)]
        const randomJoinDate = getRandomDate()
        const randomRecentDate = getRandomDate()

        sampleData.push({
            id: i.toString(),
            username: randomUsername,
            name: randomName,
            phone: randomPhone,
            membership: randomMembership,
            warning: randomWarnings,
            visit: randomVisits,
            make: randomMake,
            level: randomLevel,
            levelImage: getLevelImage(randomLevel),
            join: randomJoinDate,
            recent: randomRecentDate,
        })
    }
    return sampleData
}

const UserManagement: React.FC = () => {

    const navigate = useNavigate()

    const handleRowClick = (row: { id: string | number }) => {
        navigate(`/users/detail/${String(row.id)}`)
    }

    const handleMakeClick = (row: { id: string }) => {
        navigate(`/users/images/${row.id}`)
    }

    const columns = [
        { key: 'id', label: 'No', width: 12, centerType: "text-center" },
        { key: 'username', label: '아이디', width: 35, centerType: "text-center" },
        { key: 'name', label: '이름', width: 20, centerType: "text-center" },
        { key: 'phone', label: '연락처', width: 30, centerType: "text-center" },
        { key: 'membership', label: '멤버십', width: 25, centerType: "text-center" },
        { key: 'warning', label: '경고 횟수', width: 12, centerType: "text-center", render: (row: any) => <p className="text-center">{row.warning}</p> },
        {
            key: 'actions', label: '', width: 12, centerType: "text-center",
            render: (row: any) => (
                <div className="flex justify-center">
                    {row.warning === 2 && (
                      <span className="inline-flex items-center rounded-xl bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">일시정지</span>
                    )}
                    {row.warning === 3 && (
                      <span className="inline-flex items-center rounded-xl bg-red-200 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">영구정지</span>
                    )}
                </div>
            )
        },
        { key: "visit", label: "방문 횟수", width: 12, centerType: "text-center" },
        { key: "make", label: "캐릭터/동화 제작", width: 30, centerType: "text-center",
            render: (row: any) =>
              <div className="flex justify-center items-center">
                  <p className="text-center w-10">{row.make}</p>
                  <HiOutlineChevronRight
                    className="cursor-pointer ml-2 text-gray-400 hover:text-gray-900"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleMakeClick(row)
                    }}
                  />
              </div>
        },
        {
            key: "level", label: '레벨', width: 8, centerType: "items-center",
            render: (row: any) => (
                <div className="flex items-center">
                    <img src={row.levelImage} alt={row.level} className="h-5 w-6" />
                </div>
            )
        },
        { key: 'join', label: '가입일', width: 25, centerType: "text-center" },
        { key: 'recent', label: '최근 접속일', width: 25, centerType: "text-center" },
    ]

    const sampleData = useMemo(() => generateRandomData(100), [])

    return (
        <div>
            <Title title="회원 관리" />
            <SearchFilter/>
            <Grid columns={columns} data={sampleData} isPaginated={true} showTotal={true} maxHeight="455px" onRowClick={handleRowClick}/>
        </div>
    )
}

export default UserManagement