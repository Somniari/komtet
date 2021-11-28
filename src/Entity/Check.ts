/**
 * Система налогообложения
 */
export enum TaxSystem {
	common = 0, // Общая
	simplifiedIn = 1, // Упрощённая (доходы)
	simplifiedInOut = 2, // Упрощённая (доходы минут расходы)
	utoii = 3, // ЕНВД - с 2020 года отменён, не использовать
	ust = 4, // ??
	patent = 5, // Патент
}

/**
 * Тип чека
 */
export enum CheckType {
	sell = 'sell',
	sellReturn = 'sellReturn',
	buy = 'buy',
	buyReturn = 'buyReturn'
}

export type Check = {
	id: number; // Уникальный идентификатор, который назначается самим магазином
	userEmail: string; // E-mail, на который отправится чек
	type: CheckType; // Тип чека
	taxSystem: TaxSystem; // Система налогообложения
	paymentPlace: string; // Место платежа - URL сайта
	shouldPrint: boolean; // ??
	payments: []; // Платежи
	positions: []; // Товары
	cashier: string; // ФИО кассира
}