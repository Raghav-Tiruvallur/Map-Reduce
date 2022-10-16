const splitFile = require('split-file');
const fs=require('fs-extra')

const splitFilesIntoParts=(chunkSize)=>{
    splitFile.splitFileBySize(__dirname + '/data.txt', chunkSize)
  .then((names) => {
    console.log(`Files split into ${names.length} parts of ${chunkSize} bytes each`);
    names.map((name)=>{
        const nameArray=name.split("/")
        const fileName=__dirname + "/files/" + nameArray[nameArray.length -1]
        fs.move(name, fileName, function (err) {
            if (err) return console.error(err)
            console.log("success!")
           })
    })
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
}

const main=()=>{

    const chunkSize=1024
   splitFilesIntoParts(chunkSize)

}
main()