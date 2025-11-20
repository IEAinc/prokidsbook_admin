import React from "react"
import star_yellow from "../../../assets/images/star_yellow.svg"

interface TitleProps {
  title: string;
  className?: string;
  children?: React.ReactNode,
}

const Title: React.FC<TitleProps> = ({ title, className, children}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <h2 className={`text-2xl font-bold  flex items-center ${className}`}>
        <img src={star_yellow} alt="icon" className="h-5 mr-2" />
        {title}
      </h2>
      {children}
    </div>
  )
}

export default Title