const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllMaterials = async (req, res) => {
    try {
        const materials = await prisma.materialType.findMany()
        const response = {
            materialsCount: materials.length,
            data: materials
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message   });
    }
}

const getMaterialById = async (req, res) => {
    try {
        const { id } = req.params;
        const material = await prisma.materialType.findUnique({
            where: {id: parseInt(id)}
        })
        if(!material) return res.status(404).json({ error: "Materi Tidak ditemukan"})

      
        const response = {
                materialsCount: material.length,
                data: material
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message   });
    }
}

const createMaterial = async (req, res) => {
    try {
        const {materialName} = req.body

        if(!materialName) return res.status(400).json({error: "Materi Harus Di isi"})

        const newMaterial = await prisma.materialType.create({
            data: {materialName}
        })
        
        res.status(201).json(newMaterial)
    } catch (error) {
        res.status(500).json({ 
            error: "Terjadi Kesalahan saat membuat Data",
            message: error.message  
        });
    }
}

const updateMaterial = async (req, res) => {
    try {
        const {id} = req.params
        const {materialName} = req.body

        const updatedMaterial = await prisma.materialType.update({
            where: {id: parseInt(id) },
            data: {materialName}
        })

        res.status(201).json(updatedMaterial)
    } catch (error) {
        res.status(500).json({ 
            error: 'Terjadi kesalahan saat membuat data.',
            message: error.message    
        });
    }
}

const deleteMaterial = async (req, res) => {
    try {
        const {id} = req.params

        const deletedMaterial = await prisma.materialType.delete({
            where: {id: parseInt(id)}
        })

        res.status(204).json({message: "Materi Berhasil Di Hapus"})
    } catch (error) {
        res.status(500).json({ 
            error: 'Terjadi kesalahan saat menghapus material.',
            message: error.message
         });
    }
}

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial
}