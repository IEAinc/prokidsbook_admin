import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'
import Sidebar from './sideBar'

export default function Layout() {
    return (
        <div className="flex">
          <Header />
          <Sidebar />
          <main className="pt-16 pl-52 w-full box-border">
            <div className="px-4 py-4">
              <Outlet />
            </div>
          </main>
        </div>
    )
}