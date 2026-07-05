import type { Category } from '../types'
import { CATEGORY_COLORS, moneyFormatter } from '../utils'

interface DonutEntry {
  category: Category
  sum: number
}

interface CategoryDonutProps {
  entries: DonutEntry[]
}

const SIZE = 220
const STROKE = 34
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const CategoryDonut = ({ entries }: CategoryDonutProps) => {
  const total = entries.reduce((sum, e) => sum + e.sum, 0)
  let cumulative = 0

  return (
    <div className="categoryDonut">
      <svg
        className="categoryDonut__svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Круговая диаграмма расходов по категориям"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#f4f5f9"
          strokeWidth={STROKE}
        />
        {entries.map(({ category, sum }) => {
          const length = (sum / total) * CIRCUMFERENCE
          const dashoffset = -cumulative
          cumulative += length

          return (
            <circle
              key={category}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={CATEGORY_COLORS[category]}
              strokeWidth={STROKE}
              strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
              strokeDashoffset={dashoffset}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            />
          )
        })}
      </svg>
      <div className="categoryDonut__center">
        <span className="categoryDonut__label">Всего</span>
        <span className="categoryDonut__value">
          {moneyFormatter.format(total)}
        </span>
      </div>
    </div>
  )
}

export default CategoryDonut
