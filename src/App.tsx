import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import ExpenseItem from './ExpenseItem';
import './App.css';
import type { Category, Expense } from './types'


const CATEGORIES = ['Супермаркеты', 'Перекусы', 'Транспорт', 'Сети', 'Развлечения', 'Быт', 'Одежда', 'Разное'] as const;

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) as Expense[] : []
  });
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const totalByCategory = expenses.reduce<Record<Category, number>>((acc, expense) => ({
    ...acc,
    [expense.category]: acc[expense.category] + expense.sum
  }), Object.fromEntries(CATEGORIES.map(cat => [cat, 0])) as Record<Category, number>
)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sum || Number(sum)<=0) {
      setError('Введите корректную сумму')
      return
    }
    setError('')
    setExpenses([...expenses, { id: Date.now(), sum: Number(sum), category, note }])
    setSum('')
    setNote('')
    setCategory(CATEGORIES[0])
  }

  const handleDelete = (id:number) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  return (
    <div>
      <h1>Трекер расходов</h1>
      <p>Добавляй расходы и смотри, куда уходят деньги</p>

      <form className="expensesForm" onSubmit={handleSubmit}>
        <label className="expensesForm__label">
          <span>Сумма</span>
          <input
            name="sum"
            className="expensesForm__input expensesForm__input-sum"
            type="number"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
          />
          {error && <p className="formError">{error}</p>}
        </label>

        <label className="expensesForm__label">
          <span>Категория</span>
          <select
            name="category"
            className="expensesForm__select"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </label>

        <label className="expensesForm__label">
          <span>Описание</span>
          <input
            name="note"
            className="expensesForm__input expensesForm__input-note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button type="submit" className="buttonSubmit">Внести</button>
      </form>

      <h2>Расходы</h2>
      <div className="expensesList">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={handleDelete} />
        ))}
      </div>

      <h2>Суммарно</h2>
      <ul className="totalList">
        {Object.entries(totalByCategory).map(([cat, total]) => (
          <li key={cat}>
            <span>{cat}</span>
            <span className="totalList__amount">{total} ₽</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
