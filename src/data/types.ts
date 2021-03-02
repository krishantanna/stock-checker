export interface Stock {
    sku: string
    stock: number
}

export interface Transaction {
    sku: string
    type: TransactionType
    qty: number
}

export enum TransactionType {
    ORDER = "order",
    REFUND = "refund"
}