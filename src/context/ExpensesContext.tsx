import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Expense } from "../types";

export interface ExpensesContextValue {
    expenses: Expense[],
    addExpense: (data: Omit<Expense, 'id'>) => void,
    deleteExpense: (id: number) => void
}

const ExpensesContext = createContext<ExpensesContextValue | null>(null)

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) as Expense[] : []
  });
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (data: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { id: Date.now(), ...data }])
  }
  const deleteExpense = (id: number) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpensesContext.Provider>
  )
}

export const useExpenses = () => {
  const value = useContext(ExpensesContext)
  if (value === null) {
    throw new Error('useExpenses must be used inside ExpensesProvider')
  }
  return value
}