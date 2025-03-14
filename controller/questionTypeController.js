const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllQuestionType = async (req, res) =>  {
    try {
        
        const questions = await prisma.questionType.findMany({
            include: {
                materialType: true
            }
        })

        const response = {
            questionTypeCount: questions.length,
            data: questions
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message  });
    }
}

const getQuestionTypebyId = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await prisma.questionType.findUnique({
            where: { id: parseInt(id) },
            include: { materialType: true }
        });

        if (!question) {
            return res.status(404).json({ error: "Pertanyaan tidak ditemukan di database" });
        }

        if (!question.materialType) {
            return res.status(404).json({ error: "Material Type tidak ditemukan untuk pertanyaan ini" });
        }

        res.status(200).json(question);

    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
};


const createQuestionType = async (req, res) => {
    try {
      const { questionTypeName, materialTypeId } = req.body;
  
      // Validasi input
      if (!questionTypeName) {
        return res.status(400).json({ error: "Tipe Pertanyaan harus diisi" });
      }
  
      if (!materialTypeId) {
        return res.status(400).json({ error: "Tipe Materi Pertanyaan harus diisi" });
      }
  
      // Cek apakah materialTypeId valid
      const materialExists = await prisma.materialType.findUnique({
        where: { id: parseInt(materialTypeId) },
      });
  
      if (!materialExists) {
        return res.status(404).json({ error: "Material Type tidak ditemukan" });
      }
  
      const finalMaterialTypeId = parseInt(materialTypeId)
      // Buat QuestionType baru
      const questionType = await prisma.questionType.create({
        data: {
          questionTypeName,
          materialTypeId,
        },
      });
  
      res.status(201).json(questionType);
    } catch (error) {
  
      res.status(500).json({ error: error.message || "Terjadi kesalahan server" });
    } finally {
      await prisma.$disconnect();
    }
  };
  

const updateQuestiontype = async (req, res) => {
    try {
        const {id} = req.params
        const {questionTypeName, materialTypeId} = req.body

        const questionType = await prisma.questionType.update({
            where: {id: parseInt(id)},
            data: {questionTypeName, materialTypeId}
        })


        res.status(201).json(questionType)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbaharui data.', 
            message: error.message
         });
    }
}

const deleteQuestionType = async (req, res) => {
    try {
        const {id} = req.params

        const deletedQuestion = await prisma.questionType.delete({
            where: {id: parseInt(id)}
        })

        res.status(204).json({message: "Pertanyaan Berhasil Di Hapus"})
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus material.', message: error.message });
    }
}

const getQuestionByMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        const questions = await prisma.questionType.findMany({
            where: { materialTypeId: parseInt(id) },
            include: {materialType: true}
        });

        if (questions.length === 0) {
            return res.status(404).json({ error: "Pertanyaan tidak ditemukan di database", message: error.message });
        }

        const response = {
            questionTypeCount: questions.length,
            data: questions
        }

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ 
            error: "Terjadi Kesalahan pada Server",
            message: error.message });
    }
};



module.exports = {
    getAllQuestionType, getQuestionByMaterial, getQuestionTypebyId,
    createQuestionType, updateQuestiontype, deleteQuestionType
}