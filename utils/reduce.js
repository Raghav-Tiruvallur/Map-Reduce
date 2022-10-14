const fs = require('fs')
const files=fs.readdirSync('../mapFiles')

const reducer = () => {
    
    let result = []

    for(let i=0; i<files.length; i++){
        keyValue = readFromFile(files[i]).split(" ")
        keyValue.pop()
        
        let wordCount = 0
        let key, value

        for(let i=0; i<keyValue.length; i++){
            key = keyValue[i].split(",")[0]
            value = parseInt(keyValue[i].split(",")[1])
            wordCount+=value
        }
        
        result.push([key, wordCount])
    }

    return result
}

const readFromFile = (file) =>{
    dirName = __dirname.split('\\')
    dirName.pop()
    const fileName = dirName.join("\\") + "\\mapFiles\\"+ file

    let keyValuePair

    try{
        keyValuePair = fs.readFileSync(fileName, { encoding: 'utf8' })
    }
    catch(err){
        console.log("Error while reading file"+{fileName})
    }

    return keyValuePair
} 

module.exports = reducer