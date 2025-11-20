import React, { useState } from "react"
import Grid from './Grid.tsx' // Grid 컴포넌트 import 추가
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"

type GridItem = { id: string; [key: string]: string | number }

interface Column {
  key: string
  label: string
  width: number
  centerType: string
  render?: (row: GridItem) => React.ReactNode
}

interface DoubleGridProps {
  data: GridItem[]
  columns: Column[]
  isPaginated?: boolean
  showTotal?: boolean
  maxHeight?: string
  gridWidth?: string
  scrollWidth?: string
  onRowClick?: (row: GridItem) => void
}

const DoubleGrid: React.FC<DoubleGridProps> = ({
                                                 data,
                                                 columns,
                                                 isPaginated = true,
                                                 showTotal = false,
                                                 maxHeight = "300px",
                                                 gridWidth,
                                                 scrollWidth,
                                                 onRowClick,
                                               }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_GRID = 20
  const TOTAL_ITEMS_PER_PAGE = ITEMS_PER_GRID * 2

  const totalPages = Math.ceil(data.length / TOTAL_ITEMS_PER_PAGE)

  const getPageData = () => {
    const startIndex = (currentPage - 1) * TOTAL_ITEMS_PER_PAGE
    const pageData = data.slice(startIndex, startIndex + TOTAL_ITEMS_PER_PAGE)

    return {
      leftGridData: pageData.slice(0, ITEMS_PER_GRID),
      rightGridData: pageData.slice(ITEMS_PER_GRID, TOTAL_ITEMS_PER_PAGE)
    }
  }

  const { leftGridData, rightGridData } = getPageData()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full" style={{ width: gridWidth }}>
      {showTotal && (
        <p className="mb-2 text-gray-700 font-semibold">
          총: {data.length}개
        </p>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <Grid
            columns={columns}
            data={leftGridData}
            isPaginated={false}
            showTotal={false}
            maxHeight={maxHeight}
            gridWidth={gridWidth}
            scrollWidth={scrollWidth}
            onRowClick={onRowClick}
          />
        </div>
        <div className="flex-1">
          <Grid
            columns={columns}
            data={rightGridData}
            isPaginated={false}
            showTotal={false}
            maxHeight={maxHeight}
            gridWidth={gridWidth}
            scrollWidth={scrollWidth}
            onRowClick={onRowClick}
          />
        </div>
      </div>

      {isPaginated && totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-1"
            >
              <HiChevronDoubleLeft className={currentPage === 1 ? "text-gray-300" : "text-gray-700"} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1"
            >
              <HiChevronLeft className={currentPage === 1 ? "text-gray-300" : "text-gray-700"} />
            </button>

            <span className="mx-4">
                            {currentPage} / {totalPages}
                        </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1"
            >
              <HiChevronRight
                className={currentPage === totalPages ? "text-gray-300" : "text-gray-700"}
              />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1"
            >
              <HiChevronDoubleRight
                className={currentPage === totalPages ? "text-gray-300" : "text-gray-700"}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoubleGrid