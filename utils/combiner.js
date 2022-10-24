const fs = require('fs')

const combiner = (filePaths) =>{

    let newFiles = []

    fileContent = readFromFile(filePaths)

    for (let key in fileContent) {
        file = writeToFile([key, fileContent[key]])
        newFiles.push(file)
    }

    return newFiles
}

const writeToFile = (keyValuePair) => {
    
    let key = keyValuePair[0]
    let value = keyValuePair[1]

    if(process.platform === "win32"){
        dirName = __dirname.split('\\')
        dirName.pop()

        const filePath = dirName.join("\\") + "\\sortedFiles\\"+ key +".txt"
        try{
            fs.appendFileSync(filePath, keyValuePair.toString()+"\n")
        }
        catch (err){
            console.log("Error while writing to file"+{filePath})
            throw err
        }

        return filePath
    }
    else 
    {
        dirName = __dirname.split('/')
        dirName.pop()
        //fileName = file.split('/').pop()
        
        const filePath = dirName.join("/") + "/sortedFiles/"+ key +".txt" 
        try{
            fs.appendFileSync(filePath, keyValuePair.toString()+"\n")
        }
        catch (err){
            console.log("Error while writing to file"+{filePath})
            throw err
        }

        return filePath
    }
}

const readFromFile = (filePath) =>{
    let fileContent

    try{
        fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    }
    catch(err){
        console.log("Error while reading file"+{filePath})
        throw err
    }

    fileContent = JSON.parse(fileContent)
    return fileContent
}

module.exports =  combiner