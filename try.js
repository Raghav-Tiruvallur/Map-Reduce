let time=new Date().getTime()
var x={}
const fs=require('fs')

const y=fs.readFileSync('mapreduce.txt').toString().split("\n")
y.forEach((c)=>{
    const u=c.split(" ")
    u.forEach((g)=>{
    if(x[g])
    {
        x[g]++
    }
    else 
    {
        x[g]=1
    }
})
})
const keys=Object.keys(x)

keys.forEach((key)=>{
    if(key !== '')
    {
        const data=`${key},${x[key]}\n`
        fs.appendFileSync("reduced.txt",data)
    }
})
time=new Date() - time;
time/=1000
console.log(time)
