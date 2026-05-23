import {Expense} from "./types"

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id:number) => void;
}

const ExpenseItem = ({ expense, onDelete }: ExpenseItemProps) => {
  return (
    <div className="expenseItem">
      <span className="expenseItem__sum">{expense.sum} ₽</span>
      <span className="expenseItem__category">{expense.category}</span>
      {expense.note && <span className="expenseItem__note">{expense.note}</span>}
      <button className="buttonDelete" onClick={() => onDelete(expense.id)}>Удалить</button>
    </div>
  )
}

export default ExpenseItem;
