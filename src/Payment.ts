export enum PaymentTypeT {
    card = 'card', // оплата безналичными
    cash = 'cash', // оплата наличными
    prepayment = 'prepayment', // сумма предоплатой (зачет аванса и/или предыдущих платежей)
    credit = 'credit', // сумма постоплатой (кредит)
    counterProvisioning = 'counter_provisioning', // сумма встречным предоставлением

}

export interface PaymentI {
    sum: number,
    type: PaymentTypeT,
}
