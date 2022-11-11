const splitFile = require('split-file');
const fs=require('fs-extra')
const f=require('fs')
const splitFilesIntoParts=(fileName,chunkSize)=>{
    splitFile.splitFileBySize(__dirname + "/" + fileName, chunkSize)
  .then((names) => {
    console.log(`Files split into ${names.length} parts of ${chunkSize} bytes each`);
    names.map((name)=>{
        const nameArray=name.split("/")
        const file=__dirname + "/files/" + nameArray[nameArray.length -1] + ".txt"
        console.log(file)
        fs.move(name, file, function (err) {
            if (err) return console.error(err)
           })
    })
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
}

const main=(fileName)=>{

    var stats = f.statSync(__dirname + "/" + fileName)
    var fileSizeInBytes = stats.size;
    const chunkSize=fileSizeInBytes / 5;
    splitFilesIntoParts(fileName,chunkSize)

}
module.exports=main