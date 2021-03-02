import _transactions from './data/transactions.json'
import _stock from './data/stock.json' 
import { Transaction, Stock, TransactionType } from './data/types'

export const returnSKUStock = async (sku: string) => {
    const transactions = _transactions as Transaction[]
    const stock = _stock as Stock[]
    if (transactions.findIndex(transaction => transaction.sku === sku) === -1) {
        throw new Error ('Error: SKU not recognised')
    }
    const skuTransactions = transactions.filter(transaction => transaction.sku === sku)
    const skuNetTransaction = skuTransactions.reduce((a, b) => {
        if (b.type === TransactionType.ORDER) {
                return {sku: b.sku, type: b.type, qty: a.qty + b.qty}
            }
        else return {sku: b.sku, type: b.type, qty: a.qty - b.qty}
    }, {sku, type: TransactionType.ORDER, qty: 0})
    const filteredStock: Stock = stock.filter(item => item.sku === sku)[0] ?? {sku, qty: 0}
    const result = {
        sku,
        qty: filteredStock.stock + skuNetTransaction.qty
    }
    return result
}
