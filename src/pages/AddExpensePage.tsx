import { useNavigate } from 'react-router'
import { useExpenses } from '../context/ExpensesContext'
import ExpenseForm from '../ExpenseForm'
import type { Expense } from '../types'

const AddExpensePage = () => {
  const { addExpense } = useExpenses()
  const navigate = useNavigate()

  const handleSubmit = (data: Omit<Expense, 'id'>) => {
    addExpense(data)
    navigate('/')
  }

  return (
    <div>
      <h1>Добавить расход</h1>

      <ExpenseForm submitButtonLabel="Внести" onSubmit={handleSubmit} />
    </div>
  )
}

export default AddExpensePage
