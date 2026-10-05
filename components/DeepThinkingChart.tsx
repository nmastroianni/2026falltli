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
    label: 'Agreement',
  },
  'strongly agree': {
    label: 'Strng. Agree',
    color: 'var(--color-chart-1)',
  },
  agree: {
    label: 'Agree',
    color: 'var(--colr-chart-2)',
  },
  neutral: {
    label: 'Neutral',
    color: 'var(--color-chart-3)',
  },
  disagree: {
    label: 'Disagree',
    color: 'var(--color-chart-4)',
  },
  'strongly disagree': {
    label: 'Strg. Disagree',
    color: 'var(--color-chart-5)',
  },
} satisfies ChartConfig

interface CountResultWithColor extends CountResult {
  color?: string
}
interface ProgramChartProps {
  data: CountResult[]
}

const DeepThinkingChart = ({ data }: ProgramChartProps) => {
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

export default DeepThinkingChart
