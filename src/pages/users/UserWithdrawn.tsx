/**
 * @file UserWithdrawn.tsx
 * @description 탈퇴 회원 관리 페이지
 */
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../components/common/customs/Title.tsx'
import Grid from '../../components/common/grids/Grid.tsx'
import SearchFilter from '../../components/pages/users/SearchFilter.tsx'
import { HiOutlineChevronRight } from "react-icons/hi"
import StarLevel from "../../components/common/customs/StarLevel.tsx"

const generateRandomData = (count: number) => {
  const names = ["김서준", "이지우", "박하윤", "최민서", "정유진", "강도현", "윤지호", "조하린", "임준호", "한예린"];
  const memberships = ["경고", "일시정지", "영구정지", "멤버십 "]
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
    const randomLevel = Math.floor(Math.random() * 11) + 1
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
      join: randomJoinDate,
      withdrawal: randomRecentDate,
    })
  }
  return sampleData
}

const UserWithdrawn: React.FC = () => {

  const navigate = useNavigate()

  const handleRowClick = (row: { id: string | number }) => {
    navigate(`/users/detail/${String(row.id)}`)
  }

  const handleMakeClick = (row: { id: string }) => {
    navigate(`/users/images/${row.id}`)
  }

  const columns = [
    { key: 'id', label: 'No', width: 5, centerType: "text-center" },
    { key: 'name', label: '이름', width: 20, centerType: "text-center" },
    { key: 'username', label: '아이디', width: 35, centerType: "text-center" },
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
    {
      key: "make", label: "캐릭터/동화 제작", width: 30, centerType: "text-center",
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
      key: "level", label: '레벨', width: 20, centerType: "items-center",
      render: (row: any) => (
        <StarLevel level={row.level} />
      )
    },
    { key: 'join', label: '가입일', width: 25, centerType: "text-center" },
    { key: 'withdrawal', label: '탈퇴일', width: 25, centerType: "text-center" },
  ]

  const sampleData = useMemo(() => generateRandomData(100), [])

  return (
    <div>
      <Title title="탈퇴 회원" />
      <SearchFilter />
      <Grid columns={columns} data={sampleData} isPaginated={true} showTotal={true} maxHeight="455px" onRowClick={handleRowClick} />
    </div>
  )
}

export default UserWithdrawn