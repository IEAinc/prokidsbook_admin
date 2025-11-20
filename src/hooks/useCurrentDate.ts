import { useState, useEffect } from 'react'
import { getYear, getMonth } from 'date-fns'

const useCurrentDate = () => {
    const currentDate = new Date()
    const currentYear = getYear(currentDate).toString()
    const currentMonth = (getMonth(currentDate) + 1).toString().padStart(2, '0')

    const [selectedMonth, setSelectedMonth] = useState(currentMonth)
    const [selectedYear, setSelectedYear] = useState(currentYear)

    useEffect(() => {
        setSelectedMonth(currentMonth)
        setSelectedYear(currentYear)
    }, [])

    return { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear }
}

export default useCurrentDate