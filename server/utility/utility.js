const bcrypt=require("bcrypt")

const hashPassword=(pass)=>{
    let salt=10
    return new Promise((resolve,reject)=>{
bcrypt.genSalt(salt).then(hashVal=>{
    bcrypt.hash(pass,hashVal).then(hash=>{
        resolve(hash)
    })
})
    })
}

module.exports=hashPassword