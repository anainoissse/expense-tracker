import { NavLink, Outlet } from 'react-router'
import { useExpenses } from '../context/ExpensesContext'
import { moneyFormatter } from '../utils'

const RootLayout = () => {
  const { expenses } = useExpenses()
  const totalSpent = expenses.reduce((acc, e) => acc + e.sum, 0)

  return (
    <>
      <header className="appHeader">
        <nav className="appNav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'appNav__link appNav__link--active' : 'appNav__link'
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? 'appNav__link appNav__link--active' : 'appNav__link'
            }
          >
            Добавить
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive ? 'appNav__link appNav__link--active' : 'appNav__link'
            }
          >
            Статистика
          </NavLink>
        </nav>
      </header>
      <main>
        <section className="totalSpent">
          <h2>Всего потрачено</h2>
          <p className="totalSpent__amount">
            {moneyFormatter.format(totalSpent)}
          </p>
        </section>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
