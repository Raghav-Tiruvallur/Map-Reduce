const fs = require('fs')

//gets all the paths of files that are generated by the mapper and calculates the total frequency of each word/key 
//input: all the file paths that are created during the mapping phase
//output: either the key and total frequncy to a file or returns the entire reduced output
const reducer = (filePaths) => {

    keyValue = readFromFile(filePaths)
    let keyStore = {}

    for(let i=0; i<keyValue.length-1; i++){
        let key = keyValue[i].split(",")[0]
        let value = parseInt(keyValue[i].split(",")[1])
        if(keyStore[key]){
            keyStore[key]+=value
        }
        else{
            keyStore[key] = value
        }
    }
    const keys=Object.keys(keyStore)
    let data=""
    keys.forEach((key)=>{
        data+=`${key},${keyStore[key]}\n`
    })

    writeToFile(data)
    return data
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

const writeToFile = (keyValuePair) => {


    const data=keyValuePair.split("\n")
    data.forEach((key)=>{
    if(process.platform === "win32"){
        dirName = __dirname.split('\\')
        dirName.pop()

        const filePath = dirName.join("\\") + "\\reduced\\reduced.txt"
        try{
            fs.appendFileSync(filePath, key.toString()+"\n")
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
        
        const filePath = dirName.join("/") + "/reduced/reduced.txt" 
        try{
            fs.appendFileSync(filePath, key.toString()+"\n")
        }
        catch (err){
            console.log("Error while writing to file"+{filePath})
            throw err
        }

        return filePath
    }
})
}


module.exports = reducer