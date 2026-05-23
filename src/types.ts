
export type Category = 'Супермаркеты' | 'Перекусы' | 'Транспорт' | 'Сети' | 'Развлечения' | 'Быт' | 'Одежда' | 'Разное';

export interface Expense {
    id: number;
    sum: number;
    category: Category;
    note?: string;
}

