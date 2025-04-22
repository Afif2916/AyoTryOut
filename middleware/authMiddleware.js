const jwt = require("jsonwebtoken")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require("dotenv").config();

const tokenMiddleware = async (req, res, next) => {

    let accessToken

    if(req?.headers?.authorization?.startsWith("Bearer")) {

        try {
        accessToken = req.headers.authorization.split(" ")[1]

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
     
        const user = await prisma.user.findUnique({
            where: {id: parseInt(decoded.id)}
        })
        req.user = user
        next()
            
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message})
        }
        
    } else {
        res.status(404).json({ error: 'Access Token Not found' });
    }
    
}

const isAdmin = async (req,res,next) => {
    const {email} = req.user

    const adminUser = await prisma.user.findUnique({
        where: {email: email}
    })

    if(adminUser.userRole !== "ADMIN") {
        res.status(401).json({error : "User Token is Unauthorized"})
    } else {
        next()
    }
}


const isCPNSUser = async () => {

}
module.exports = {tokenMiddleware, isAdmin}