export enum PaymentType {
    card = 'card', // оплата безналичными
    cash = 'cash', // оплата наличными
    prepayment = 'prepayment', // сумма предоплатой (зачет аванса и/или предыдущих платежей)
    credit = 'credit', // сумма постоплатой (кредит)
    counterProvisioning = 'counter_provisioning', // сумма встречным предоставлением

}

export class Payment {
    private sum: number;
    private type: PaymentType;

    constructor(sum: number, type: PaymentType) {
        this.sum = sum;
        this.type = type;
    }
}
