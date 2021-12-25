export enum Vat {
    no = 'no',
    rate_0 = '0',
    rate_10 = '10',
    rate_20 = '20',
    rate_110 = '110',
    rate_120 = '120',
}

export enum CalculationMethod {
    prePaymentFull = 'pre_payment_full',
    prePaymentPart = 'pre_payment_part',
    fullPayment = 'full_payment',
    advance = 'advance',
    creditPart = 'credit_part',
    creditPay = 'credit_pay',
    credit = 'credit',
}

export enum CalculationSubject {
    product = 'product', // товар, за исключением подакцизного товара
    productPractical = 'product_practical', // подакцизный товар
    work = 'work', // работа
    service = 'service', // услуга
    gamblingBet = 'gambling_bet', // прием ставок при осуществлении деятельности по проведению азартных игр
    gamblingWin = 'gambling_win', // выплата денежных средств в виде выигрыша при осуществлении деятельности по проведению азартных игр
    lotteryBet = 'lottery_bet', // прием денежных средств при реализации лотерейных билетовпри осуществлении деятельности по проведению лотерей
    lotteryWin = 'lottery_win', // о выплате денежных средств в виде выигрыша при осуществлении деятельности по проведению лотерей
    rid = 'rid', // предоставление прав на использование результатов интеллектуальной деятельности или средств индивидуализации
    payment = 'payment', // об авансе, задатке, предоплате, кредите, взносе в счет оплаты, пени, штрафе, вознаграждении бонусе
    commission = 'commission', // вознаграждение пользователя, являющегося платежным агентом, банковским платежным агентом или иным агентом
    pay = 'pay', // Взнос в счет оплаты пени, штрафа, вознаграждения, бонуса или иного аналогичного предмета расчета
    other = 'other', // о предмете расчета, не относящемуся к перечисленным предметам расчета
    propertyRight = 'property_right', // передача имущественного права
    nonOperating = 'non_operating', // внереализационный доход
    insurance = 'insurance', // страховые взносы
    salesTax = 'sales_tax', // торговый сбор
    resortFee = 'resort_fee', // курортный сбор
}

export class OrderPosition {
    private name: string;
    private measure_name = 'шт.';
    private price: number;
    private quantity: number;
    private total: number;
    private nomenclature_code: {
        code?: string,
        hex_code?: string,
    };
    private calculation_method: CalculationMethod;
    private calculation_subject: CalculationSubject;
    private vat: Vat; // НДС
    private excise: number; // Акциз

    constructor (data: {
        name: string,
        measure_name: string,
        price: number,
        quantity: number,
        total: number,
        nomenclature_code: {
            code?: string,
            hex_code?: string,
        },
        calculation_method: CalculationMethod,
        calculation_subject: CalculationSubject,
        vat: Vat,
        excise?: number, // Акциз
    }) {
        this.name = data.name;
        this.measure_name = data.measure_name;
        this.price = data.price;
        this.quantity = data.quantity;
        this.total = data.total;
        this.nomenclature_code = data.nomenclature_code;
        this.calculation_method = data.calculation_method;
        this.calculation_subject = data.calculation_subject;
        this.vat = data.vat;

        if (data.excise) {
            this.excise = data.excise;
        }
    }
}
