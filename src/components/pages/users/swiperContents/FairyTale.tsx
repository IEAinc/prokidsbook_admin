import React, { useState, useEffect } from 'react';
/* 아이콘 */
import { IoChevronBackCircle, IoChevronForwardCircle} from "react-icons/io5";

interface Page {
  image: string;
  content: string;
}

interface FairyTaleProps {
  title: string;
  pages: Page[];
}

const FairyTale: React.FC<FairyTaleProps> = ({
                                               title,
                                               pages
                                             }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  // title이나 pages가 변경될 때마다 currentPage를 리셋
  useEffect(() => {
    setCurrentPage(0);
  }, [title, pages]);

  // pages 배열이 비어있는지 확인
  if (!pages || pages.length === 0) {
    return <div>동화 내용이 없습니다.</div>;
  }

  // 현재 페이지가 유효한 범위를 벗어났는지 확인
  if (currentPage >= pages.length) {
    setCurrentPage(0);
    return <div>페이지를 로딩중입니다...</div>;
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">{title}</h1>
        {/* 페이지 표시기 */}
        <div className="text-xl text-center font-bold">
          {currentPage + 1} / {pages.length}
        </div>
      </div>

      <div className="flex justify-between items-center relative">
        {/* 현재 페이지 컨텐츠 */}
        <div className="flex flex-1 w-[840px] h-[400px]">
          <div className="flex-1 bg-white w-[50%]">
            <img
              src={pages[currentPage].image}
              alt={`${title} - 페이지 ${currentPage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex items-center bg-white px-6 py-10 w-[50%]">
            <p className="text-lg font-normal text-left">
              {pages[currentPage].content}
            </p>
          </div>
        </div>
        {/* 이전 페이지 버튼 */}
        <button
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 absolute left-[15px] bottom-[15px]"
        >
          <IoChevronBackCircle className={`text-5xl ${currentPage === 0 ? 'text-gray-500' : 'text-[#33BB9A]'}`}/>
        </button>

        {/* 다음 페이지 버튼 */}
        <button
          onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
          disabled={currentPage === pages.length - 1}
          className="px-4 py-2 absolute right-[15px] bottom-[15px]"
        >
          <IoChevronForwardCircle className={`text-5xl ${currentPage === pages.length - 1 ? 'text-gray-500' : 'text-[#33BB9A]'}`}/>
        </button>
      </div>
    </div>
  );
};
export default FairyTale;