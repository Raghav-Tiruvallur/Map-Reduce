const mapper = require('./map')
const reducer = require('./reduce')

filePath = ["../files/testData.txt"]

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

    let reducerResult = callback(mapperResult[0])
    console.log(reducerResult)
}

mapAndReduce(filePath, reducer)
