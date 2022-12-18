const isPrima = (angka) => {
    let pembagi = 0
    for (let x = 1; x <= angka; x++) {
        if (angka %x == 0) pembagi += 1
    }
    if (pembagi == 2) return true
    else false
}

module.exports = (maxNumber=100) => {
    let prima = []
    for (let x = 1; x <= maxNumber; x++) {
        if (isPrima(x)) prima.push(x)
    }
    return prima
}