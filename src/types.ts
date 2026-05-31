
export type Category = 'Супермаркеты' | 'Перекусы' | 'Транспорт' | 'Сети' | 'Развлечения' | 'Быт' | 'Одежда' | 'Разное';

export interface Expense {
    id: number;
    sum: number;
    category: Category;
    date: string; // ISO date "YYYY-MM-DD"
    note?: string;
}

export type Filter = Category | 'all'

