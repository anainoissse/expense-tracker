import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import { useExpenses } from '../context/ExpensesContext'
import { moneyFormatter } from '../utils'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'appNav__link appNav__link--active' : 'appNav__link'

const RootLayout = () => {
  const { expenses } = useExpenses()
  const totalSpent = expenses.reduce((acc, e) => acc + e.sum, 0)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const location = useLocation()

  const closeNav = () => setIsNavOpen(false)

  useEffect(() => {
    closeNav()
  }, [location.pathname])

  useEffect(() => {
    if (!isNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNav()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isNavOpen])

  return (
    <>
      <button
        type="button"
        className="hamburger"
        aria-label="Открыть меню"
        aria-expanded={isNavOpen}
        aria-controls="app-nav"
        onClick={() => setIsNavOpen(true)}
      >
        <span aria-hidden="true">☰</span>
      </button>
      <div
        className={
          isNavOpen ? 'navBackdrop navBackdrop--visible' : 'navBackdrop'
        }
        onClick={closeNav}
      />
      <header
        id="app-nav"
        className={isNavOpen ? 'appHeader appHeader--open' : 'appHeader'}
      >
        <nav className="appNav">
          <NavLink to="/" end className={navLinkClass}>
            Главная
          </NavLink>
          <NavLink to="/add" className={navLinkClass}>
            Добавить
          </NavLink>
          <NavLink to="/stats" className={navLinkClass}>
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
