import { Link } from 'react-router-dom'
import SidebarLink from './SidebarItem.tsx'
import star from '../../../assets/images/star.svg'

interface SidebarSectionProps {
    title: string
    links: { to: string; label: string }[] // 하위 링크 설정
    titleLink?: string // 타이틀 링크
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, links, titleLink }) => {
    const defaultLink = titleLink || (links.length > 0 ? links[0].to : '#')

    return (
        <div className="mt-3 px-5 pb-1">
            {/* 타이틀 링크있으면 Link 없으면 span */}
            {titleLink ? (
                <Link to={defaultLink}
                      className="flex items-center pb-1 space-x-2 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-[#33BB9A]">
                    <img src={star} alt="star" className="h-3" />
                    <span>{title}</span>
                </Link>
            ) : (
                <span className="flex items-center pb-1 space-x-2 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <img src={star} alt="star" className="h-3" />
                    <span>{title}</span>
                </span>
            )}

            {/* 하위 링크들 */}
            <div className="space-y-1">
                {links.map((link) => (
                    <SidebarLink key={link.to} to={link.to}>
                        {link.label}
                    </SidebarLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarSection
