import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <div>
      <h1>Страница не найдена</h1>
      <p className="expensesList__empty">
        Похоже, такого адреса нет. <Link to="/">← Вернуться на главную</Link>
      </p>
    </div>
  )
}

export default NotFoundPage
