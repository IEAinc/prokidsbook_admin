import { useNavigate } from 'react-router-dom'
import star from "../../../assets/images/star.svg"

interface SidebarLinkProps {
  to: string
  children: React.ReactNode
}

const SidebarItem: React.FC<SidebarLinkProps> = ({ to, children }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }

  return (
      <button
          onClick={handleClick}
          className="flex items-center w-full px-5 py-1 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#33BB9A] text-left cursor-pointer active:bg-gray-200 dark:active:bg-gray-600"
      >
        <img src={star} alt="star" className="h-2 mr-2" />
        {children}
      </button>
  )
}

export default SidebarItem