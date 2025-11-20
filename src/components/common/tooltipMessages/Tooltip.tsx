import React, {useState} from 'react';
import { FaCircleExclamation } from "react-icons/fa6";

interface TooltipProps {
  desc: React.ReactNode;
  placement? :'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ desc, placement='top'}) => {
  const [isVisible, setIsVisible] = useState(false);
  // 툴팁 위치 스타일 설정
  const tooltipPosition = {
    top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 transform -translate-y-1/2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <FaCircleExclamation />
      {/* 툴팁 */}
      {isVisible && (
        <div
          className={`absolute z-10 px-3 py-2 bg-white border border-solid border-black ${tooltipPosition[placement]}`}
          role="tooltip"
        >
          {desc}
          {/* 툴팁 화살표 */}
          <div
            className={`absolute w-2 h-2 bg-white transform rotate-45 ${
              placement === 'top'
                ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2  border-b border-r'
                : placement === 'bottom'
                  ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : placement === 'left'
                    ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
                    : 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
            }`}
          />
        </div>
      )}
    </div>
  )
}

export default Tooltip