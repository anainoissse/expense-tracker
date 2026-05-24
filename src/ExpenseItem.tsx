import type { Expense } from "./types"

const formatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
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
      <span className="expenseItem__date">{formatter.format(new Date(expense.date))}</span>
      {expense.note && <span className="expenseItem__note">{expense.note}</span>}
      <button className="buttonDelete" onClick={() => onDelete(expense.id)}>Удалить</button>
    </div>
  )
}

export default ExpenseItem;
