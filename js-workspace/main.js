'use strict';

const printReceipt = (inputs) => {
    if (!checkData(inputs)) {
        return `[ERROR]: Can not find someone item`
    }
    const itemSummary = calculateItemSummary(inputs)
    return buildReceiptByItemSummary(itemSummary)
}

const checkData = (inputs) => {
    const allItems = loadAllItems()
    for (let i = 0; i < inputs.length; i ++) {
        for(let j = 0 ;j < allItems.length; j ++){
            if (inputs[i] === allItems[j]['id']) {
                break
            }
            if (j === allItems.length -1 && inputs[i] !== allItems[j]['id']) {
                return false
            }
        }
    }
    return true
}

const calculateItemCount = (inputs) => {
    const itemCount = {}
    for(let i = 0; i < inputs.length; i++) {
        if (!itemCount[inputs[i]]) {
            itemCount[inputs[i]] = 1
        } else {
            itemCount[inputs[i]] ++
        }
    }
    return itemCount
}

const calculateItemSummary = (inputs) => {
    const allItems = loadAllItems()
    const itemCount = calculateItemCount(inputs)
    const itemSummary = []
    for (let key in itemCount) {
        for(let i = 0 ;i < allItems.length; i ++){
            if (key === allItems[i]['id']) {
                let item = {}
                item['name'] = allItems[i]['name']
                item['price'] = allItems[i]['price']
                item['count'] = itemCount[key]
                item['summary'] = allItems[i]['price']*item['count']
                itemSummary.push(item)
                break
            }
        }
    }
    return itemSummary
}

const buildReceiptByItemSummary = (itemSummary) => {
    let receipt = `Receipts
------------------------------------------------------------` + '\n'
    for(let i = 0; i < itemSummary.length; i ++) {
        receipt += `${itemSummary[i]['name']}                       ${itemSummary[i]['price']}          ${itemSummary[i]['count']}` + '\n'
    }
    receipt += `------------------------------------------------------------
Price: ${calculateTotal(itemSummary)}`
    return receipt
}

const calculateTotal = (receipt) => {
    let totalPrice = 0
    for(let i = 0; i < receipt.length; i ++) {
        totalPrice += parseInt(receipt[i]['summary'])
    }
    return totalPrice
}

const loadAllItems = () => {
    return [
        {"id": "0001", "name" : "Coca Cola", "price": 3},
        {"id": "0002", "name" : "Diet Coke", "price": 4},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
        {"id": "0004", "name" : "Mountain Dew", "price": 6},
        {"id": "0005", "name" : "Dr Pepper", "price": 7},
        {"id": "0006", "name" : "Sprite", "price": 8},
        {"id": "0007", "name" : "Diet Pepsi", "price": 9},
        {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
        {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
        {"id": "0010", "name" : "Fanta", "price": 12}
    ]
}

module.exports = printReceipt;