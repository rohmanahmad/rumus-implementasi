/* 
FPB digunakan untuk menyederhanakan bilangan pecahan
*/

const bilPrim = require('./helper/bil-prima')
const { toSuperScript } = require('./helper/utils')

const obj1 = 125
const obj2 = 250
const obj3 = 333

const max = Math.max(obj1, obj2, obj3)

const bilanganPrima = bilPrim(max)

const getFaktor = (x) => {
    let result = {}
    for (const prim of bilanganPrima) {
        const hasil = x / prim
        if (hasil %1 == 0) { // berarti ini adalah bilangan bulat (bukan bilangan desimal)
            result['faktor'] = prim
            result['x'] = hasil
            break
        }
    }
    return result
}

const getTreeFaktor = (x) => {
    let faktors = []
    let hasil = []
    let proses = null
    let lanjut = true
    while(lanjut) {
        proses = getFaktor(x)
        faktors.push(proses.faktor)
        hasil.push(proses.x)
        if (proses.x == 1) lanjut = false
        x = proses.x
    }
    hasil = hasil.filter( x => x != 1)
    return {faktors, hasil}
}

const getKPK = (data) => {
    const dataLengthMap = data.map(x => x.length)
    let obj = {}
    for (let i = 0; i < dataLengthMap.length; i++) {
        const d = data[i].reduce((r, x) => {
            if (!r[x]) r[x] = []
            r[x].push(x)
            return r
        }, {})
        for (const dIndex in d) {
            const dd = d[dIndex]
            const objdd = obj[dIndex] || []
            if (dd.length > objdd.length) {
                obj[dIndex] = dd
            }
        }
    }
    let nTotal = 1
    let steps = []
    for (const x in obj) {
        const xInt = parseInt(x)
        const pangkat = obj[x].length
        nTotal *= (xInt ** pangkat)
        steps.push(`${xInt}${pangkat > 1 ? toSuperScript(pangkat.toString()) : ''}`)
    }
    console.log('KPK:', steps.join('x'), '=', nTotal)
    return nTotal
}

const getFPB = (data) => {
    const dataLength = data.length
    const dataLengthMap = data.map(x => x.length)
    let obj = {}
    for (let i = 0; i < dataLengthMap.length; i++) {
        const uniqData = data[i].reduce((r, x) => {r[x] = x; return r}, {})
        for (const n in uniqData) {
            const k = uniqData[n]
            if (!obj[k]) obj[k] = 0
            obj[k] += 1
        }
    }
    let nTotal = 1
    let steps = []
    for (const x in obj) {
        const xInt = parseInt(x)
        const count = obj[x]
        if (count === dataLength) {
            nTotal *= xInt
            steps.push(xInt)
        }
    }
    console.log('FPB:', steps.join('x'), '=', nTotal)
    return nTotal
}

const getResult = (arguments) => {
    const objects = arguments.split(',').map(x => parseInt(x)).filter(x => x > 0)
    let dataKPK = []
    let dataFPB = []
    for (const index in objects) {
        const obj = objects[index]
        const { faktors } = getTreeFaktor(obj)
        dataKPK.push(faktors)
        dataFPB.push(faktors)
        console.log(`Faktor Prima Dari ${obj} Adalah:`, faktors.join(', '))
    }
    const kpk = getKPK(dataKPK)
    const fpb = getFPB(dataFPB)
    return {kpk, fpb}
}

const { argv } = process
getResult(argv[2])
