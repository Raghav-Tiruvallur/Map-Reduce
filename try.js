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
console.log(x)