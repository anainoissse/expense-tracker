import { Link } from 'react-router'
import type { Expense } from './types'
import { moneyFormatter } from './utils'

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

const ExpenseItem = ({ expense, onDelete }: ExpenseItemProps) => {
  return (
    <div className="expenseItem">
      <span className="expenseItem__sum">{ moneyFormatter.format(expense.sum) }</span>
      <span className="expenseItem__category">{expense.category}</span>
      <span className="expenseItem__date">{dateFormatter.format(new Date(expense.date))}</span>
      {expense.note && <span className="expenseItem__note">{expense.note}</span>}
      <div className="expenseItem__actions">
        <Link className="buttonEdit" to={`/expense/${expense.id}`}>
          Редактировать
        </Link>
        <button className="buttonDelete" onClick={() => onDelete(expense.id)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default ExpenseItem;
