import { Routes, Route } from 'react-router-dom'
import Layout from './components/layouts/Layout'
//로그인
import Login from './pages/auth/Login.tsx'
//대시보드
import Dashboard from './pages/dashboard/Dashboard.tsx' //대시보드
import VisitorCount from './pages/dashboard/VisitorCount.tsx' //방문자 수
import DownloadCount from './pages/dashboard/DownloadCount.tsx' //다운로드 수
import UserStatus from './pages/dashboard/UserStatus.tsx' //가입자 현황
import StoryStatus from './pages/dashboard/StoryStatus.tsx' //동화 생성 현황
import CharacterStatus from './pages/dashboard/CharacterStatus.tsx'
//사용자 관리
import UserManagement from './pages/users/UserManagement.tsx' //회원 관리
import UserDetail from './pages/users/UserDetail.tsx' //회원 관리 상세
import ImageDetail from './pages/users/ImageDetail.tsx' //캐릭터-동화 제작 : 해당 유저의 생성이미지
import UserWithdrawn from './pages/users/UserWithdrawn.tsx' //탈퇴 회원
//1:1 문의 내역
import Inquiries from './pages/inquiries/Inquiries.tsx'
import InquiriesDetail from './pages/inquiries/Detail.tsx' //문의 내역 상세
//생성 이미지 관리
import Characters from './pages/images/Characters.tsx' // 캐릭터 이미지
import Illustrations from './pages/images/Illustrations.tsx' //동화 이미지
//내용 프롬프트 관리
import UserPrompts from './pages/prompts/User/UserPrompts.tsx' //사용자 입력
import GPTPrompts from './pages/prompts/GPT/GPTPrompts.tsx' //GPT 입력
import UserPromptsDetail from './pages/prompts/User/Detail.tsx' //사용자 입력
import GPTPromptsDetail from './pages/prompts/GPT/Detail.tsx' //GPT 입력
import WordTransformation from './pages/prompts/WordTransformation.tsx' //단어 변환 관리
import BannedWordManage from './pages/prompts/BannedWordManage.tsx' //벤 단어 관리
//공지사항
import Notices from './pages/notices/Notices.tsx'
import NoticeDetail from './pages/notices/NoticeDetail.tsx'
//404 페이지
import NotFound from './pages/404'

function App() {
  return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/visitor" element={<VisitorCount />} />
              <Route path="/dashboard/download" element={<DownloadCount />} />
              <Route path="/dashboard/user" element={<UserStatus />} />
              <Route path="/dashboard/story" element={<StoryStatus />} />
              <Route path="/dashboard/character" element={<CharacterStatus />} />
              <Route path="/users/management" element={<UserManagement />} />
              <Route path="/users/detail/:id" element={<UserDetail />} />
              <Route path="/users/images/:id" element={<ImageDetail />} />
              <Route path="/users/withdrawn" element={<UserWithdrawn />} />
              <Route path="/inquiries" element={<Inquiries />} />
              <Route path="/inquiries/:id" element={<InquiriesDetail />} />
              <Route path="/images/characters" element={<Characters />} />
              <Route path="/images/illustrations" element={<Illustrations />} />
              <Route path="/prompts/user" element={<UserPrompts />} />
              <Route path="/prompts/gpt" element={<GPTPrompts />} />
              <Route path="/prompts/user/detail/:id" element={<UserPromptsDetail />} />
              <Route path="/prompts/gpt/detail/:id" element={<GPTPromptsDetail />} />
              <Route path="/prompts/trans" element={<WordTransformation />} />
              <Route path="/prompts/banned" element={<BannedWordManage />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/notices/detail/:id" element={<NoticeDetail />} />
          </Route>
        </Routes>
  )
}

export default App