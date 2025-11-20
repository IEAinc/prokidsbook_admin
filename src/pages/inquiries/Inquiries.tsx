import React, { useMemo } from 'react'
import {useNavigate} from "react-router-dom";
/* 컴포넌트 */
import Title from '../../components/common/customs/Title.tsx'
import SearchFilter from "../../components/pages/inquiries/SearchFilter.tsx";
import Grid from '../../components/common/grids/Grid.tsx'

const generateRandomData = (count: number) => {
  const names = ["홍길동","김민지","강민지","윤민지","이민지"]
  const titles = ["제목입니다1","제목입니다2","제목입니다3","제목입니다4"]
  const domains = ["@kakao.com", "@google.com"]
  const sampleData = []

  const getRandomDate = () => {
    const start = new Date(2024, 0, 1)
    const end = new Date()
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split('T')[0]
  }

  for (let i=1; i <= count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomTitle = titles[Math.floor(Math.random() * titles.length)]
    const randomJoinDate = getRandomDate()

    sampleData.push({
      id: i.toString(),
      title: randomTitle,
      name: randomName,
      user_name: `user${Math.floor(Math.random() * 100) + 1}${domains[Math.floor(Math.random() * domains.length)]}`,
      created_date:  randomJoinDate,
      response_status: Math.random() > 0.5 ? "응답 완료" : "미응답"
    })
  }
  return sampleData
}

const Inquiries:React.FC = () => {
  const navigate = useNavigate()
  const handleRowClick = (row: { id: string | number }) => {
    navigate(`/inquiries/${String(row.id)}`)
  }
  const columns = [
    { key: 'id', label: 'No', width: 5, centerType: "text-center" },
    { key: 'title', label: '제목', width: 15 , centerType: "text-center" },
    { key: 'name', label: '이름', width: 10, centerType: "text-center" },
    { key: 'user_name', label: '아이디', width: 15, centerType: "text-center" },
    { key: 'created_date', label: '등록일', width: 15, centerType: "text-center" },
    { key: 'response_status', label: '답변 유무', width: 15, centerType: "text-center" },
  ]
  const sampleData = useMemo(() => generateRandomData(100), [])
  return (
    <div>
      <Title title="1:1 문의" />
      <SearchFilter />
      <Grid columns={columns} data={sampleData} isPaginated={true} showTotal={true} maxHeight="455px" onRowClick={handleRowClick}/>
    </div>
  )
}

export default Inquiries