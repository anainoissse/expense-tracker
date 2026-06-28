import { Link, useNavigate, useParams } from 'react-router'
import ExpenseForm from '../ExpenseForm'
import { useExpenses } from '../context/ExpensesContext'
import type { Expense } from '../types'

const ExpensePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { expenses, updateExpense } = useExpenses()

  const expenseId = Number(id)
  const expense = expenses.find((item) => item.id === expenseId)

  if (!expense || Number.isNaN(expenseId)) {
    return (
      <div>
        <h1>Расход не найден</h1>
        <p className="expensesList__empty">
          Проверь адрес или <Link to="/">вернись к списку расходов</Link>.
        </p>
      </div>
    )
  }

  const handleSubmit = (data: Omit<Expense, 'id'>) => {
    updateExpense(expense.id, data)
    navigate('/')
  }

  return (
    <div>
      <h1>Редактировать расход</h1>

      <ExpenseForm
        key={expense.id}
        initialValues={expense}
        submitButtonLabel="Сохранить"
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default ExpensePage
