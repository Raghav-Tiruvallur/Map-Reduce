const fs = require('fs')

//gets all the paths of files that are generated by the mapper and calculates the total frequency of each word/key 
//input: all the file paths that are created during the mapping phase
//output: either the key and total frequncy to a file or returns the entire reduced output
const reducer = (filePaths) => {

    keyValue = readFromFile(filePaths)
    
    let wordCount = 0
    let key = keyValue[0].split(",")[0]

    for(let i=0; i<keyValue.length-1; i++){
        value = parseInt(keyValue[i].split(",")[1])
        wordCount+=value
    }
    
    let result = [key, wordCount]

    return result
}

//read content of the file
//input: path of the file to be read
//output: content of file
const readFromFile = (filePath) =>{
    if(process.platform === "win32")
    {
        fileName = filePath.split('\\').pop()

        try{
            fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
        }
        catch(err){
            console.log("Error while reading file"+{filePath})
        }

        return fileContent.split("\n")
    }
    else 
    {
        fileName = filePath.split('/').pop()

        try{
            fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
        }
        catch(err){
            console.log("Error while reading file"+{filePath})
        }

        return fileContent.split("\n")
    }
} 

module.exports = reducer