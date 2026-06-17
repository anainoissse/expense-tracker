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

export const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})
