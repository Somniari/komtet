import { OrderPosition } from "./OrderPosition";
import { Payment } from "./Payment";

/**
 * Система налогообложения
 */
export enum TaxSystem {
	common = 0, // Общая
	simplifiedIn = 1, // Упрощённая (доходы)
	simplifiedInOut = 2, // Упрощённая (доходы минут расходы)
	ust = 4, // ЕСХН
	patent = 5, // Патент
}

/**
 * Вид чека
 */
export enum CheckIntent {
    sell = 'sell', //  приход (используется при продаже товара или услуги)
    sellReturn = 'sellReturn', // возврат прихода
    sellCorrection = 'sellCorrection', // коррекция прихода
    buy = 'buy', // расход (используется при выдаче клиенту денег из кассы)
    buyReturn = 'buyReturn', // возврат расхода
    buyCorrection = 'buyCorrection', // коррекция расхода
}

export class Check {
    public intent: CheckIntent; // Направление платежа
	public external_id: number; // Уникальный идентификатор, который назначается самим магазином
	public sno: TaxSystem; // Система налогообложения
	public user: string; // E-mail, на который отправится чек
	public print = true; // нужно ли печатать
	public positions: OrderPosition[] = []; // Товары
	public payments: Payment[] = []; // Платежи
	public cashier: string; // ФИО кассира
	public payment_address: string; // Место платежа - URL сайта

    constructor (
        intent: CheckIntent,
        idExternal: number,
        sno: TaxSystem,
        userContact: string,
        paymentAddress: string,
        cashier: string,
    ) {
        this.intent = intent;
        this.external_id = idExternal;
        this.sno = sno;
        this.user = userContact;
        this.payment_address = paymentAddress;
        this.cashier = cashier;
    }

    public addPosition(orderPosition: OrderPosition) {
        this.positions.push(orderPosition)
    }

    public addPayment(payment: Payment) {
        this.payments.push(payment)
    }
}