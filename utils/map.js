const fs = require('fs');

const mapper = (fileContent) =>{
    let wordList = {}
    let splitText =  fileContent.split(" ")

    for(let i=0; i<splitText.length; i++){
        let word = splitText[i].toLowerCase()
        if(wordList[word]){
            wordList[word]+=1
        } 
        else{
            wordList[word]=1
        }
    }

    wordList = sortObject(wordList)

    for(word in wordList){
        writeToFile([word, wordList[word]])
    }

    return wordList
}

const sortObject = (object) =>{
    return Object.keys(object).sort().reduce((result, key) =>{
        result[key] = object[key]
        return result
    }, {})
}

const writeToFile = (word) =>{

    dirName = __dirname.split('\\')
    dirName.pop()
    const fileName = dirName.join("\\") + "\\mapFiles\\"+ word[0] +".txt"

    try{
        fs.appendFileSync(fileName, word.toString()+" ")
    }
    catch (err){
        console.log("Error while writing to file"+{fileName})
        throw err
    }
}

module.exports = mapper


