import React, { useState } from "react"
import Select from "../forms/Select.tsx"
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"

type GridItem = any

interface FilterConfig {
    key: string;
    value: string;
}

interface Column {
    key: string
    label: string
    width: number
    centerType: string
    filterable?: boolean
    render?: (row: GridItem) => React.ReactNode
}

interface GridProps {
    columns: Column[]
    data: GridItem[]
    isPaginated?: boolean
    showTotal?: boolean
    maxHeight?: string
    gridWidth?: string
    scrollWidth?: string
    centerType?: "items-center"
    onRowClick?: (row: GridItem) => void
}

const Grid: React.FC<GridProps> = ({
                                       columns,
                                       data,
                                       isPaginated = true,
                                       showTotal = false,
                                       gridWidth,
                                       scrollWidth,
                                       maxHeight = "300px",
                                       onRowClick,
                                   }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [filters, setFilters] = useState<FilterConfig[]>([])

    // 필터링된 데이터 계산
    const getFilteredData = () => {
        return data.filter(item => {
            return filters.every(filter => {
                const value = String(item[filter.key]).toLowerCase()
                return value.includes(filter.value.toLowerCase())
            })
        })
    }

    const filteredData = getFilteredData()
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number(value))
        setCurrentPage(1)
    }

    const handleFilterChange = (key: string, value: string) => {
        setCurrentPage(1)
        setFilters(prev => {
            const newFilters = prev.filter(f => f.key !== key)
            if (value) {
                newFilters.push({ key, value })
            }
            return newFilters
        })
    }

    const getPaginatedData = () => {
        if (!isPaginated) return filteredData
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredData.slice(startIndex, startIndex + itemsPerPage)
    }

    return (
      <div className="w-full" style={{ width: gridWidth }}>
          {showTotal && (
            <p className="mb-2 text-gray-700 dark:text-gray-400 font-semibold">
                총: {filteredData.length}명
            </p>
          )}

          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="overflow-auto" style={{ maxHeight }}>
                  <table className="w-full border-collapse table-fixed" style={{ minWidth: scrollWidth }}>
                      <colgroup>
                          {columns.map((col, idx) => (
                            <col key={idx} style={{ width: `${col.width}%` }} />
                          ))}
                      </colgroup>

                      <thead className="bg-gray-200 sticky top-0 z-10">
                      {/* 헤더 행 */}
                      <tr>
                          {columns.map((col) => (
                            <th
                              key={col.key}
                              className="border-b border-gray-300 dark:border-zinc-700 bg-[#E0ECE9] dark:bg-zinc-700 font-semibold text-center "
                            >
                                <div className="px-2 py-2 whitespace-nowrap overflow-hidden text-overflow-ellipsis dark:text-gray-300">
                                    {col.label}
                                </div>
                            </th>
                          ))}
                      </tr>
                      {/* 필터 행 */}
                      <tr>
                          {columns.map((col) => (
                            <th key={`filter-${col.key}`} className="border-b border-gray-300 dark:border-gray-600">
                                {col.filterable && (
                                  <input
                                    type="text"
                                    placeholder={`${col.label} 검색...`}
                                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-[#33BB9A]"
                                    onChange={(e) => handleFilterChange(col.key, e.target.value)}
                                    value={filters.find(f => f.key === col.key)?.value || ''}
                                  />
                                )}
                            </th>
                          ))}
                      </tr>
                      </thead>

                      <tbody>
                      {getPaginatedData().map((item, idx) => (
                        <tr
                          key={idx}
                          className="bg-white dark:bg-[#252731] hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => onRowClick && onRowClick(item)}
                        >
                            {columns.map((col) => (
                              <td
                                key={col.key}
                                className={`border-b border-gray-300 dark:border-gray-600 ${
                                  col.centerType === "items-center" ? "justify-items-center" : "text-center"
                                }`}
                              >
                                  <div className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                      {col.render ? col.render(item) : item[col.key]}
                                  </div>
                              </td>
                            ))}
                        </tr>
                      ))}
                      </tbody>
                  </table>
              </div>
          </div>

          {isPaginated && (
            <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-20">
                    <Select
                      value={String(itemsPerPage)}
                      onChange={handleItemsPerPageChange}
                      options={["5", "10", "20", "50"]}
                      openDirection="top"
                    />
                </div>

                <div className="flex justify-center items-center space-x-2">
                    <HiChevronDoubleLeft
                      className={`w-8 h-3 ${currentPage === 1 ? "opacity-50 cursor-default" : "cursor-pointer"}`}
                      onClick={() => currentPage > 1 && handlePageChange(1)}
                    />
                    <HiChevronLeft
                      className={`w-8 h-3 ${currentPage === 1 ? "opacity-50 cursor-default" : "cursor-pointer"}`}
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    />

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`px-3 py-1 mx-1 ${
                          currentPage === page ? "bg-[#E0ECE9]" : "bg-[#f9fafb]"
                        } text-gray-600 rounded`}
                        onClick={() => handlePageChange(page)}
                      >
                          {page}
                      </button>
                    ))}

                    <HiChevronRight
                      className={`w-8 h-3 ${
                        currentPage === totalPages ? "opacity-50 cursor-default" : "cursor-pointer"
                      }`}
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    />
                    <HiChevronDoubleRight
                      className={`w-8 h-3 ${
                        currentPage === totalPages ? "opacity-50 cursor-default" : "cursor-pointer"
                      }`}
                      onClick={() => currentPage < totalPages && handlePageChange(totalPages)}
                    />
                </div>
            </div>
          )}
      </div>
    )
}

export default Grid