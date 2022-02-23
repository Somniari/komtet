import { OrderPositionI } from "./OrderPosition";
import { PaymentI } from "./Payment";

/**
 * Система налогообложения
 */
export enum TaxSystemT {
	common = 0, // Общая
	simplifiedIn = 1, // Упрощённая (доходы)
	simplifiedInOut = 2, // Упрощённая (доходы минут расходы)
	ust = 4, // ЕСХН
	patent = 5, // Патент
}

/**
 * Вид чека
 */
export enum CheckIntentT {
    sell = 'sell', //  приход (используется при продаже товара или услуги)
    sellReturn = 'sellReturn', // возврат прихода
    sellCorrection = 'sellCorrection', // коррекция прихода
    buy = 'buy', // расход (используется при выдаче клиенту денег из кассы)
    buyReturn = 'buyReturn', // возврат расхода
    buyCorrection = 'buyCorrection', // коррекция расхода
}

/**
 * Чек
 */
export interface CheckI {
    intent?: CheckIntentT,
    external_id: number,
    sno: TaxSystemT,
    user: string,
    print: boolean,
    positions?: OrderPositionI[],
    payments?: PaymentI[],
    cashier: string,
    payment_address: string,
}

export class Check {
    public intent: CheckIntentT = CheckIntentT.sell; // Направление платежа
	public idExternal: number; // Уникальный идентификатор, который назначается самим магазином
	public sno: TaxSystemT; // Система налогообложения
	public userContact: string; // E-mail, на который отправится чек
	public print = true; // нужно ли печатать
	public positions: OrderPositionI[] = []; // Товары
	public payments: PaymentI[] = []; // Платежи
	public cashier: string; // ФИО кассира
	public paymentAddress: string; // Место платежа - URL сайта

    constructor (data: CheckI) {
        if (data.intent) {
            this.intent = data.intent;
        }

        this.idExternal = data.external_id;
        this.sno = data.sno;
        this.userContact = data.user;

        if (typeof data.print === 'boolean') {
            this.print = data.print;
        }

        this.cashier = data.cashier;
        this.paymentAddress = data.payment_address;
    }

    public addPosition(orderPosition: OrderPositionI) {
        this.positions.push(orderPosition)
    }

    public addPayment(payment: PaymentI) {
        this.payments.push(payment)
    }
}