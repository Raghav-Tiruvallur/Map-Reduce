const fs = require('fs')

//gets all the paths of files that are generated by the mapper and calculates the total frequency of each word/key 
//input: all the file paths that are created during the mapping phase
//output: either the key and total frequncy to a file or returns the entire reduced output
const reducer = (filePaths) => {

    keyValue = readFromFile(filePaths)
    keyValue.pop()
    let wordCount = 0
    var freq={}
    for(let i=0; i<keyValue.length; i++){
        let key = keyValue[i].split(",")[0]
        let value = parseInt(keyValue[i].split(",")[1])
        if(freq[key])
            freq[key]+=value
        else 
            freq[key]=value
    }
    const words=Object.keys(freq)
    let data=""
    words.forEach((word,idx)=>{
        const frequency=freq[word]
        data+=`${word},${frequency}`
        if(idx!=words.length -1)
            data+='\n'
    })
    writeToFile(data)
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