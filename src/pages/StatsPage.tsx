import { useExpenses } from '../context/ExpensesContext'
import { CATEGORIES, moneyFormatter } from '../utils'
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

  return (
    <div>
      <h1>Статистика</h1>

      {expenses.length === 0 ? (
        <p className="expensesList__empty">
          Пока пусто. Добавь расходы — и здесь появится разбивка по категориям.
        </p>
      ) : (
        <ul className="totalList">
          {Object.entries(totalByCategory)
            .filter(([_cat, total]) => total > 0)
            .map(([cat, total]) => (
              <li key={cat}>
                <span>{cat}</span>
                <span className="totalList__amount">
                  {moneyFormatter.format(total)}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default StatsPage
