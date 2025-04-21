const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {blankValidationRequest, validationRequest} = require("../utils/validation")
const bcrypt = require("bcryptjs");

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

    const { firstName, lastName, address, email} = req.body

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
            address
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
    registerController, getUser, getUserById, updateUser
}