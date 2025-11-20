import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartDataset } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import useChartData from '../../../hooks/useChartData.ts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartDataLabels)
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
// 차트 옵션
const options = (maxYValue: number) => ({
  responsive: true,
  maintainAspectRatio: false,
  spanGaps: true, // 데이터가 중간에 없을 때 이어 그릴지의 여부
  animation: {
    duration: 0,
  },
  scales: {
    x: {
      grid: {
        display: false, // 배경 세로 선 x
      },
      border: {
        color: isDarkMode ? '#71717a' : '#d1d5db',
      },
      ticks: {
        color: isDarkMode ? '#d1d5db' : '#868c93',
      }
    },
    y: {
      grid: {
        color: isDarkMode ? '#71717a' : '#d1d5db',
      },
      beginAtZero: true, // Y축 최소값 0
      ticks: {
        stepSize: getStepSize(maxYValue),
        max: getMaxYValue(maxYValue),
        color: isDarkMode ? '#d1d5db' : '#868c93',
      },
      border: {
        color: isDarkMode ? '#71717a' : '#d1d5db',
      },
    },
  },
  tooltip: {
    intersect: false,
    callbacks: {
      shared: true,
    },
  },
  plugins: {
    legend: { // 범례
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        boxWidth: 40,
        boxHeight: 2,
        padding: 15,
        color: isDarkMode ? '#d1d5db' : '#333333',
      },
    },
    datalabels: { // 데이터 라벨
      display: true,
      color: isDarkMode ? '#d1d5db' : '#333333',
      font: {
        size: 12,
        weight: 'bold' as const,
      },
      anchor: 'start' as const,
      align: 'top' as const,
      offset:8,
      formatter: (value: number) => value.toLocaleString(),
    },
  },
})

const getStepSize = (maxValue: number) => {
  if (maxValue <= 50) {
    return 10
  } else if (maxValue <= 100) {
    return 20
  } else if (maxValue <= 500) {
    return 100
  } else if (maxValue <= 1000) {
    return 200
  } else {
    return 200
  }
}

const getMaxYValue = (maxValue: number) => {
  if (maxValue <= 50) {
    return 50
  } else if (maxValue <= 100) {
    return 100
  } else if (maxValue <= 500) {
    return 500
  } else if (maxValue <= 1000) {
    return 1000
  } else {
    return maxValue
  }
}

interface LineChartProps {
  type: 'visitor' | 'download' | 'account' | 'characters' | 'stories'
  periodType: 'LAST_7_DAYS' | 'MONTHLY_WEEKLY' | 'YEARLY_MONTHLY' | 'YEARLY'
  date: string
  height?: string
}

export default function LineChart({ type, periodType, date, height = '300px' }: LineChartProps) {
  const { chartData } = useChartData({ type, periodType, date })

  const formatDate = (dateString: string): string => {
    if (periodType === 'YEARLY') return dateString
    if (periodType === 'YEARLY_MONTHLY') return dateString.split('-')[1]
    if (periodType === 'MONTHLY_WEEKLY') return `${dateString}주차`

    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const labels: string[] = periodType === 'MONTHLY_WEEKLY'
      ? Array.from({ length: 5 }, (_, i) => `${i + 1}주차`)
      : type === 'account' || type === 'characters' || type === 'stories'
          ? chartData?.created?.map((item) => formatDate(item.date)) ?? []
          : chartData?.common?.map((item) => formatDate(item.date)) ?? []

  const datasets: ChartDataset<'line'>[] = []

  const labelMap: Record<LineChartProps['type'], { created?: string; deleted?: string }> = {
    visitor: { created: '방문자 수' },
    download: { created: '다운로드 수' },
    account: { created: '신규 회원가입', deleted: '신규 회원탈퇴' },
    characters: { created: '제작 캐릭터', deleted: '삭제 캐릭터' },
    stories: { created: '제작 동화', deleted: '삭제 동화' },
  }

  if (type === 'visitor' || type === 'download') {
    const dataMap = new Map<string, number>()

    chartData?.common?.forEach((item) => {
      dataMap.set(formatDate(item.date), item.value)
    })

    const filledData = labels.map((label) => dataMap.get(label) ?? 0)
    const maxYValue = Math.max(...filledData, 10)

    // 데이터가 없는 경우 (모든 데이터가 undefined, null, empty array일 때만 처리)
    const hasValidData = chartData?.common && chartData.common.length > 0

    if (!hasValidData) {
      return <div className="w-full flex justify-center items-center" style={{ height }}>No Data</div>
    }

    datasets.push({
      label: labelMap[type].created!,
      data: filledData,
      fill: false,
      borderColor: '#FF6384',
      tension: 0.1,
    })

    return (
        <div className="w-full" style={{ height }}>
          <Line data={{ labels, datasets }} options={options(maxYValue)} />
        </div>
    )
  } else if (type === 'account' || type === 'characters' || type === 'stories') {
    const createdMap = new Map<string, number>()
    const deletedMap = new Map<string, number>()

    chartData?.created?.forEach((item) => {
      createdMap.set(formatDate(item.date), item.value)
    })

    chartData?.deleted?.forEach((item) => {
      deletedMap.set(formatDate(item.date), item.value)
    })

    const createdData = labels.map((label) => createdMap.get(label) ?? 0)
    const deletedData = labels.map((label) => deletedMap.get(label) ?? 0)
    const maxYValue = Math.max(...createdData, ...deletedData, 10)

    // 데이터가 아예 없는 경우만 No Data 처리
    const hasValidData = (chartData?.created && chartData.created.length > 0) ||
        (chartData?.deleted && chartData.deleted.length > 0)

    if (!hasValidData) {
      return <div className="w-full flex justify-center items-center" style={{ height }}>No Data</div>
    }

    datasets.push({
      label: labelMap[type].created!,
      data: createdData,
      fill: false,
      borderColor: '#FF6384',
      tension: 0.1,
    })

    datasets.push({
      label: labelMap[type].deleted!,
      data: deletedData,
      fill: false,
      borderColor: '#3E8BFE',
      tension: 0.1,
    })

    return (
        <div className="w-full" style={{ height }}>
          <Line data={{ labels, datasets }} options={options(maxYValue)} />
        </div>
    )
  }
}
