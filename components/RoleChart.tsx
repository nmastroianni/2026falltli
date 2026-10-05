'use client'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CountResult } from '@/lib/utils'
import { Pie, PieChart } from 'recharts'
import { colors } from '@/lib/utils'

const chartConfig = {
  total: {
    label: 'Roles',
  },
  lecturer: {
    label: 'CLII',
    color: 'var(--color-chart-1)',
  },
  faocc: {
    label: 'FAOCC',
    color: 'var(--colr-chart-2)',
  },
  adjunct: {
    label: 'Adjunct',
    color: 'var(--color-chart-3)',
  },
  administrator: {
    label: 'Administrator',
    color: 'var(--color-chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--color-chart-5)',
  },
} satisfies ChartConfig

interface CountResultWithColor extends CountResult {
  color?: string
}
interface RoleChartProps {
  data: CountResult[]
}

const RoleChart = ({ data }: RoleChartProps) => {
  const dataWithColor: CountResultWithColor[] = data
    .filter((item) => item.total !== 0)
    .map((item, i) => {
      return {
        ...item,
        fill: colors[i],
      }
    })
  return (
    <div>
      <ChartContainer config={chartConfig}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={dataWithColor} dataKey="total" label nameKey="title" />
          <ChartLegend content={<ChartLegendContent nameKey="title" />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}

export default RoleChart
