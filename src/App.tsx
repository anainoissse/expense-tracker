import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { ReactElement } from 'react'
import ExpenseItem from './ExpenseItem';
import './App.css';
import type { Category, Expense, Filter } from './types'


const CATEGORIES = ['Супермаркеты', 'Перекусы', 'Транспорт', 'Сети', 'Развлечения', 'Быт', 'Одежда', 'Разное'] as const;

function getTodayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0'); // месяцы 0–11!
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
}) 

const monthFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  year: 'numeric'
})

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) as Expense[] : []
  });
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(getTodayISO());
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const totalByCategory = expenses.reduce<Record<Category, number>>((acc, expense) => ({
    ...acc,
    [expense.category]: acc[expense.category] + expense.sum
  }), Object.fromEntries(CATEGORIES.map(cat => [cat, 0])) as Record<Category, number>
  )

  const totalSpent = expenses.reduce(
    (acc, expense) => acc + expense.sum,
    0
  )

  const filteredExpenses  = filter === 'all'
    ? expenses 
    : expenses.filter(e => e.category === filter)

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date)
    return byDate !== 0 ? byDate : b.id - a.id
  })

  const groupedByMonth = sortedExpenses.reduce<Record<string, Expense[]>>((acc, expense) => {
    const key = expense.date.slice(0, 7)
    if (!acc[key]) acc[key] = []
    acc[key].push(expense)
    return acc
  }, {}
  )


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericSum = Number(sum)

    if (!sum) {
      setError('Введите сумму')
      return
    }
    if (Number.isNaN(numericSum)) {
      setError('Сумма должна быть числом')
      return
    }
    if (numericSum <= 0) {
      setError('Сумма должна быть больше нуля')
      return
    }
    if (numericSum > 1000000) {
      setError('Слишком большая сумма')
      return
    }
    setError('')
    setExpenses([...expenses, { id: Date.now(), sum: Number(sum), category, date, note }])
    setSum('')
    setDate(getTodayISO())
    setNote('')
    setCategory(CATEGORIES[0])
  }

  const handleDelete = (id:number) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  let listContent: ReactElement
  if (expenses.length === 0) {
    listContent = <p className="expensesList__empty">Пока пусто. Добавь первый расход выше ↑</p>
  } else if (filteredExpenses.length === 0) {
    listContent = <p className="expensesList__empty">По выбранной категории расходов нет</p>
  } else {
    listContent = <div className="expensesList">

        {Object.keys(groupedByMonth)
          .sort((a, b) => b.localeCompare(a))
          .map((monthKey) =>(
            <section key={monthKey}>
                <h3>{monthFormatter.format(new Date(`${monthKey}-01`))}</h3>
                {groupedByMonth[monthKey].map((expense) => (
                  <ExpenseItem key={expense.id} expense={expense} onDelete={handleDelete} />
                ))}
            </section>
          ))
        }
      </div>
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
            onChange={(e) => {
              setSum(e.target.value)
              if (error) setError('')
            }}
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
          <span>Дата</span>
          <input
            name="date"
            className="expensesForm__input expensesForm__input-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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

      
        <section className="totalSpent">
          <h2>Всего потрачено:</h2>
          <p className="totalSpent__amount">{ moneyFormatter.format(totalSpent) }</p>
        </section>

      <div className="listControls">
        <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
          <option value="all">Все категории</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <h2>Расходы</h2>
      {listContent}

      <h2>Суммарно</h2>
      
      {expenses.length === 0 ? (
        <p className="expensesList__empty">Пока пусто...</p>
      ) : (
      <ul className="totalList">
        {Object.entries(totalByCategory)
        .filter(([_cat, total]) => total > 0)
        .map(([cat, total]) => (
          <li key={cat}>
            <span>{cat}</span>
            <span className="totalList__amount">{moneyFormatter.format(total)}</span>
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default App
