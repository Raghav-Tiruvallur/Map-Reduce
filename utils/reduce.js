const fs = require('fs')

//gets all the paths of files that are generated by the mapper and calculates the total frequency of each word/key 
//input: all the file paths that are created during the mapping phase
//output: either the key and total frequncy to a file or returns the entire reduced output
const reducer = (filePaths) => {
    
    let result = []
    for(file of filePaths.values()){
        let fileName
        if(process.platform === "win32")
            fileName = file.split("//").pop()
        else 
        fileName = file.split("/").pop()
        keyValue = readFromFile(fileName).split(" ")
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

//read content of the file
//input: path of the file to be read
//output: content of file
const readFromFile = (file) =>{
    if(process.platform === "win32")
    {
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
    else 
    {
        dirName = __dirname.split('/')
        dirName.pop()
        const fileName = dirName.join("/") + "/mapFiles/"+ file

        let keyValuePair

        try{
            keyValuePair = fs.readFileSync(fileName, { encoding: 'utf8' })
        }
        catch(err){
            console.log("Error while reading file"+{fileName})
        }

        return keyValuePair
    }
} 

module.exports = reducer