const jwt = require('jsonwebtoken')

const authAdmin = async(req, res, next)=>{

try {
    
const {admintoken} = req.headers

if(!admintoken){
    return res.json({success: false, message: "Not authorized"})
}

const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET)

if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
    return res.json({success: false, message: "Not authorized"})
}

next()

} catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
}


}

module.exports = authAdmin