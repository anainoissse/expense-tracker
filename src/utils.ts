import type { Category } from './types'

export const CATEGORIES = [
  'Супермаркеты',
  'Перекусы',
  'Транспорт',
  'Сети',
  'Развлечения',
  'Быт',
  'Одежда',
  'Разное',
] as const

export const CATEGORY_COLORS: Record<Category, string> = {
  'Супермаркеты': '#f59e0b',
  'Перекусы': '#ef4444',
  'Транспорт': '#3b82f6',
  'Сети': '#06b6d4',
  'Развлечения': '#ec4899',
  'Быт': '#10b981',
  'Одежда': '#8b5cf6',
  'Разное': '#64748b',
}

export const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})
