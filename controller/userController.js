const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {blankValidationRequest, validationRequest} = require("../utils/validation")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const registerController = async (req, res) => {
    const { firstName, lastName, email, password} = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fieldsToValidate = [
        [firstName, "firstName"],
        [lastName, "lastname"],
        [email, "email"],
        [password, "password"]
    ]
    const [
        firstNameOK, lastNameOK, emailNotNull, passwordNotNull
    ] = fieldsToValidate.map(([value, label]) => blankValidationRequest(value, label));

    if (passwordNotNull < 8 ) return res.status(400).json({message: "Password Minimal 8 Karakter"})
    
    if (!emailRegex.test(emailNotNull)) return res.status(400).json({message: "Format Email Tidak Valid"})

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) return res.status(400).json({message: "Email sudah Terdaftar"})

    const hashedPassword = await bcrypt.hash(passwordNotNull, 10)

    const user = await prisma.user.create({
        data: {
            firstName: firstNameOK,
            lastName: lastNameOK,
            email: emailNotNull,
            password: hashedPassword,
            address: ""
        }
    })

    res.status(201).json({
        message: "Registerasi Berhasil",
        user: {
            id: user.id,
            email: user.email,
            userRole: user.userRole,
            userStatus: user.userStatus,
        }
    })
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await prisma.user.findUnique({ where: {email}})

        if (!user) return res.status(404).json({error: "User Not Found"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({message: "Wrong Password"})

        const accessToken = jwt.sign({id: user.id, userRole: user.userRole, userStatus: user.userStatus,  email: email}, process.env.JWT_SECRET_KEY, {expiresIn: "15m"})
        const refreshToken = jwt.sign({ id: user.id, userRole: user.userRole, userStatus: user.userStatus,  email: email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

        await prisma.user.update({
            where: {id: parseInt(user.id)},
            data: {refreshToken}
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
            message: "Login Berhasil",
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userStatus: user.userStatus,
                userRole: user.userRole
            },
            accessToken
        })

    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}


const refreshToken = async (req, res) => {

}

const forgotPassword = async (req, res) => {

}

const changePassword = async (req, res) => {

}

const getUser = async (req, res) => {
    try {
        const allUser = await prisma.user.findMany({

        })

        const response = {
            userCount: allUser.length,
            data: allUser
        }
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        
        const allUser = await prisma.user.findUnique({
            where: {id: parseInt(id)}
        })

        const response = {
            userCount: allUser.length,
            data: allUser
        }
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params

    const { firstName, lastName, address, email, userRole} = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fieldsToValidate = [
        [firstName, "firstName"],
        [lastName, "lastname"],
        [email, "email"],
        
    ]

    const [
        firstNameOK, lastNameOK, emailNotNull
    ] = fieldsToValidate.map(([value, label]) => blankValidationRequest(value, label));

    if (!emailRegex.test(emailNotNull)) return res.status(400).json({message: "Format Email Tidak Valid"})

    
    // const existingUser = await prisma.user.findUnique({
    //     where: { email }
    // })

    //  if (existingUser) return res.status(400).json({message: "Email sudah Terdaftar atau Anda Menggunakan nya"})

    const user = await prisma.user.update({
        where: {id: parseInt(id)},
        data: {
            firstName: firstNameOK,
            lastName: lastNameOK,
            email: emailNotNull,
            address, 
            userRole
        }   
    })

    res.status(201).json({
        message: "Update Berhasil",
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            email: user.email,
            userRole: user.userRole,
            userStatus: user.userStatus,
        }
    })
}

const deleteUser = async (req, res) => {

}

module.exports = {
    registerController, getUser, getUserById, updateUser, loginController
}