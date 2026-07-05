import type { Category } from '../types'
import { CATEGORY_COLORS, moneyFormatter } from '../utils'

interface BarEntry {
  category: Category
  sum: number
}

interface CategoryBarsProps {
  entries: BarEntry[]
}

const percentFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'percent',
  maximumFractionDigits: 1,
})

const CategoryBars = ({ entries }: CategoryBarsProps) => {
  const total = entries.reduce((sum, e) => sum + e.sum, 0)

  return (
    <ul className="categoryBars">
      {entries.map(({ category, sum }) => {
        const fraction = total > 0 ? sum / total : 0
        const color = CATEGORY_COLORS[category]

        return (
          <li key={category} className="categoryBars__item">
            <div className="categoryBars__row">
              <span
                className="categoryBars__dot"
                style={{ background: color }}
                aria-hidden="true"
              />
              <span className="categoryBars__name">{category}</span>
              <span className="categoryBars__amount">
                {moneyFormatter.format(sum)}
              </span>
              <span className="categoryBars__percent">
                {percentFormatter.format(fraction)}
              </span>
            </div>
            <div className="categoryBars__track">
              <div
                className="categoryBars__fill"
                style={{
                  width: `${fraction * 100}%`,
                  background: color,
                }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryBars
