const mapper = require('./map')
const reducer = require('./reduce')
const combiner = require('./combiner')

filePath = ["../hello.txt"]

const sendToMapper = async(texts)=>{
    const data = await Promise.all(texts.map(async (text)=>{
        const result = await mapper(text)
        if(result)
            return result
        }
    ))
    return data
}

const mapAndReduce = async(text, callback) => {
    let mapperResult = await sendToMapper(text)
    let combinerResult = callback(mapperResult[0])

    let reducerResult = []
    for(let i=0; i<combinerResult.length; i++){
        reducerResult.push(reducer(combinerResult[i]))
    }

    console.log(reducerResult)
}

mapAndReduce(filePath, combiner)
