import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useExpenses } from '../context/ExpensesContext'
import { CATEGORIES } from '../utils'
import type { Category } from '../types'

const getTodayISO = (): string => {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const AddExpensePage = () => {
  const { addExpense } = useExpenses()
  const navigate = useNavigate()

  const [sum, setSum] = useState('')
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [note, setNote] = useState('')
  const [date, setDate] = useState(getTodayISO())
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    if (numericSum > 1_000_000) {
      setError('Слишком большая сумма')
      return
    }
    setError('')
    addExpense({ sum: numericSum, category, date, note })
    navigate('/')
  }

  return (
    <div>
      <h1>Добавить расход</h1>

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
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
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

        <button type="submit" className="buttonSubmit">
          Внести
        </button>
      </form>
    </div>
  )
}

export default AddExpensePage
