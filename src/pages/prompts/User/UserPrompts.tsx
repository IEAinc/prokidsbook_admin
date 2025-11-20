import React, { useMemo } from 'react'
import {useNavigate} from "react-router-dom";
/* 컴포넌트 */
import Title from '../../../components/common/customs/Title.tsx'
import SearchFilter from "../../../components/pages/prompts/SearchFilter";
import Grid from '../../../components/common/grids/Grid.tsx'

/* [삭제 예정] 임시 데이터 */
const generateRandomData = (count: number) => {
  const sampleData = []

  const getRandomDate = () => {
    const start = new Date(2024, 0, 1)
    const end = new Date()
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split('T')[0]
  }
  const names = ["조현지", "김도현", "이희수", "김상혁", "이우현", "윤영은", "홍길동", "김다은"]
  const locations = ['우주정거장', '숲속', '꿈속'];
  const storyContents = ['우주정거장에서 루리는 리루와 놀아요・・・','숲 속에서 강아지와 함께 루리는 뛰어 놀아요・・・']
  const gptContents = ['루리와 리루의 우주 정거장 탐험','민준이와 준민의 우주 정거장 탐험']
  const categories = ['4~5세','모험']

  for (let i = 1; i <= count; i++) {
    const randomUsername = names[Math.floor(Math.random() * names.length)]
    const randomCreatedDate = getRandomDate()
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomStoryContent = storyContents[Math.floor(Math.random() * storyContents.length)];
    const randomGptStory = gptContents[Math.floor(Math.random() * gptContents.length)];
    const randomCategory = [...categories]

    sampleData.push({
      id: i.toString(),
      username: randomUsername,
      createdDate: randomCreatedDate,
      location: randomLocation,
      storyContent: randomStoryContent,
      gptStory: randomGptStory,
      category: randomCategory,
    })
  }
  return sampleData
}


const UsersPrompts:React.FC = () => {
  const navigate = useNavigate();
  const handleRowClick = (row: { id: string | number }) => {
    navigate(`/prompts/user/detail/${String(row.id)}`)
  }
  const columns = [
    { key: 'id', label: 'No', width: 5, centerType: "text-center" },
    { key: 'username', label: '사용자', width: 10, centerType: "text-center" },
    { key: 'createdDate', label: '입력일', width: 10, centerType: "text-center" },
    { key: 'location', label: '장소', width: 10, centerType: "text-center" },
    { key: 'storyContent', label: '동화 내용', width: 20, centerType: "text-center" },
    { key: 'gptStory', label: '출력동화(GPT)', width: 20, centerType: "text-center" },
    { key: 'category', label: '카테고리', width: 10, centerType: "text-center",
      render: (row: any) =>
        <div className="flex items-center justify-center gap-1">
          {row.category.map((category: string, index: number) => (
            <span
              key={`category-${index}`}
              className="px-2 py-1 bg-gray-100 dark:text-gray-700 rounded-full text-sm"
            >
               {category}
            </span>
          ))}
        </div>
    },
  ]
  const sampleData = useMemo(() => generateRandomData(100), [])
  return (
    <div>
      <Title title="사용자 입력" />
      <SearchFilter/>
      <Grid columns={columns} data={sampleData} isPaginated={true} showTotal={true} maxHeight="455px" onRowClick={handleRowClick}/>
    </div>
  )
}
export default UsersPrompts;
