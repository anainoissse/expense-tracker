import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import AddExpensePage from './pages/AddExpensePage'
import StatsPage from './pages/StatsPage'
import NotFoundPage from './pages/NotFoundPage'
import { ExpensesProvider } from './context/ExpensesContext'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'add', element: <AddExpensePage /> },
      { path: 'stats', element: <StatsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExpensesProvider>
      <RouterProvider router={router} />
    </ExpensesProvider>
  </StrictMode>,
)
