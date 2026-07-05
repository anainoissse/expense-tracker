import CategoryDonut from '../components/CategoryDonut'
import CategoryBars from '../components/CategoryBars'
import { useExpenses } from '../context/ExpensesContext'
import { CATEGORIES } from '../utils'
import type { Category } from '../types'

const StatsPage = () => {
  const { expenses } = useExpenses()

  const totalByCategory = expenses.reduce<Record<Category, number>>(
    (acc, expense) => ({
      ...acc,
      [expense.category]: acc[expense.category] + expense.sum,
    }),
    Object.fromEntries(CATEGORIES.map((cat) => [cat, 0])) as Record<
      Category,
      number
    >,
  )

  const entries = (Object.entries(totalByCategory) as [Category, number][])
    .filter(([, sum]) => sum > 0)
    .map(([category, sum]) => ({ category, sum }))
    .sort((a, b) => b.sum - a.sum)

  return (
    <div>
      <h1>Статистика</h1>

      {entries.length === 0 ? (
        <p className="expensesList__empty">
          Пока пусто. Добавь расходы — и здесь появится разбивка по категориям.
        </p>
      ) : (
        <div className="statsGrid">
          <CategoryDonut entries={entries} />
          <CategoryBars entries={entries} />
        </div>
      )}
    </div>
  )
}

export default StatsPage
