const printReceipt = require('../main')

it ('should input an array of barcodes', () => {
    expect(printReceipt(['0001', '0003', '0005', '0003'])).toBe(`Receipts
------------------------------------------------------------
Coca Cola                       3          1
Pepsi-Cola                       5          2
Dr Pepper                       7          1
------------------------------------------------------------
Price: 20`)
})

it ('should input an array of barcodes, someone barcode is not exist', () => {
    expect(printReceipt(['0001', '0003', '0115', '0003'])).toBe(`[ERROR]: Can not find someone item`)
})