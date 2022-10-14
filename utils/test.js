const mapper = require('./map')
const reducer = require('./reduce')

let text = ["Hello this is a test for the map function to check if it works fine hello again", "this is a test for the map function"]

const sendToMapper = async(texts)=>{
    const data = await Promise.all(texts.map(async (text)=>{
        const result = await mapper(text)
        if(result)
            return result
        }
    ))
    return data
}

const mapAndReduce = async(text) => {
    let mapperResult = await sendToMapper(text)

    //idk how to make reducer wait for mapper to finish 
    // but if run after complete execution of mapper gives proper result
    let reducerResult = reducer()
    console.log(reducerResult)
}

mapAndReduce(text)
