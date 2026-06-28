import { type ReactElement } from 'react'
import { useSearchParams } from 'react-router'
import ExpenseItem from '../ExpenseItem'
import { useExpenses } from '../context/ExpensesContext'
import { CATEGORIES } from '../utils'
import type { Category, Expense, Filter } from '../types'

const monthFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  year: 'numeric',
})

const HomePage = () => {
  const { expenses, deleteExpense } = useExpenses()
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryParam = searchParams.get('category')
  const filter: Filter =
    categoryParam && CATEGORIES.includes(categoryParam as Category)
      ? (categoryParam as Category)
      : 'all'

  const handleFilterChange = (value: Filter) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (value === 'all') {
      nextSearchParams.delete('category')
    } else {
      nextSearchParams.set('category', value)
    }

    setSearchParams(nextSearchParams)
  }

  const filteredExpenses =
    filter === 'all' ? expenses : expenses.filter((e) => e.category === filter)

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date)
    return byDate !== 0 ? byDate : b.id - a.id
  })

  const groupedByMonth = sortedExpenses.reduce<Record<string, Expense[]>>(
    (acc, expense) => {
      const key = expense.date.slice(0, 7)
      if (!acc[key]) acc[key] = []
      acc[key].push(expense)
      return acc
    },
    {},
  )

  let listContent: ReactElement
  if (expenses.length === 0) {
    listContent = (
      <p className="expensesList__empty">
        Пока пусто. Добавь первый расход через «Добавить» →
      </p>
    )
  } else if (filteredExpenses.length === 0) {
    listContent = (
      <p className="expensesList__empty">По выбранной категории расходов нет</p>
    )
  } else {
    listContent = (
      <div className="expensesList">
        {Object.keys(groupedByMonth)
          .sort((a, b) => b.localeCompare(a))
          .map((monthKey) => (
            <section key={monthKey}>
              <h3>{monthFormatter.format(new Date(`${monthKey}-01`))}</h3>
              {groupedByMonth[monthKey].map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={deleteExpense}
                />
              ))}
            </section>
          ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Расходы</h1>

      <div className="listControls">
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value as Filter)}
        >
          <option value="all">Все категории</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {listContent}
    </div>
  )
}

export default HomePage
