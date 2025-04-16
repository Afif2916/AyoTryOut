const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {validationRequest} = require("../utils/validation")


const getTryOut = async (req, res) => {
    try {
        const tryOut = await prisma.tryOut.findMany({
            include: {
                questionType: {
                    select: {
                        id: true,
                        questionTypeName: true,
                        questions: {
                            select: {
                                id: true,
                                question: true,
                                questionImage: true,
                                choiceA: true,
                                choiceB: true,
                                choiceC: true,
                                choiceD: true,
                                choiceE: true,
                                explanation: true,
                                explanationAnswer: true,
                                scoreChoiceA: true,
                                scoreChoiceB: true,
                                scoreChoiceC: true,
                                scoreChoiceD: true,
                                scoreChoiceE: true,
                            }
                        }
                    },
                    
                }
            }
        })
        
        const response = {
            tryOutCount: tryOut.length,
            data: tryOut
        }

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}

const getTryOutById = async (req, res) => {
    try {
        const {id} = req.params
        const tryOut = await prisma.tryOut.findMany({
            where: {id: parseInt(id)},
            include: {
                questionType: {
                    select: {
                        id: true,
                        questionTypeName: true,
                        questions: {
                            select: {
                                id: true,
                                question: true,
                                questionImage: true,
                                choiceA: true,
                                choiceB: true,
                                choiceC: true,
                                choiceD: true,
                                choiceE: true,
                                explanation: true,
                                explanationAnswer: true,
                                scoreChoiceA: true,
                                scoreChoiceB: true,
                                scoreChoiceC: true,
                                scoreChoiceD: true,
                                scoreChoiceE: true,
                            }
                        }
                    },
                    
                }
            }
        })
        
        const response = {
            tryOutCount: tryOut.length,
            data: tryOut
        }

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}

const createTryOut = async (req, res) => {

    try {
        const {
            tryOutName, questionTypeId, questionAmount, time, standardScore
        } = req.body
    
        if(!tryOutName) return res.status(400).json({
           error: "Nama TryOut Harus Di isi"
        })
    
        const finalquestionTypeId = validationRequest(questionTypeId, "Question Type")
        const finalQuestionAmount = validationRequest(questionAmount, "Question Amount")
        const finalTime = validationRequest(time, "Time")
        const finalStandardScore = validationRequest(standardScore, "Standard Score")
    
        const questionTypeExist = await prisma.questionType.findUnique({
            where: { id: parseInt(finalquestionTypeId) },
          });
    
          if (!questionTypeExist) {
            return res.status(404).json({ error: "Tipe Pertanyaan tidak ditemukan tidak ditemukan" });
          }
    
          const newTryOut = await prisma.tryOut.create({
                data: {
                    tryOutName,
                    questionTypeId: finalquestionTypeId,
                    questionAmount: finalQuestionAmount,
                    time: finalTime,
                    standardScore: finalStandardScore
                }
          })

          res.status(201).json(newTryOut);
    } catch (error) {
        console.error("Error creating Tryout.", error);
        res.status(500).json({ error: error.message || "Terjadi kesalahan server" });
    } finally {
        await prisma.$disconnect()
    }
      
}   

const updateTryOut = async (req, res) => {
    try {
        const { id } = req.params
        const {
            tryOutName, questionTypeId, questionAmount, time, standardScore
        } = req.body
    
        if(!tryOutName) return res.status(400).json({
           error: "Nama TryOut Harus Di isi"
        })
    
        const finalquestionTypeId = validationRequest(questionTypeId, "Question Type")
        const finalQuestionAmount = validationRequest(questionAmount, "Question Amount")
        const finalTime = validationRequest(time, "Time")
        const finalStandardScore = validationRequest(standardScore, "Standard Score")
    
        const questionTypeExist = await prisma.questionType.findUnique({
            where: { id: parseInt(finalquestionTypeId) },
          });
    
          if (!questionTypeExist) {
            return res.status(404).json({ error: "Tipe Pertanyaan tidak ditemukan tidak ditemukan" });
          }
    
          const newTryOut = await prisma.tryOut.update({
            where: {id: parseInt(id)},
                data: {
                    tryOutName,
                    questionTypeId: finalquestionTypeId,
                    questionAmount: finalQuestionAmount,
                    time: finalTime,
                    standardScore: finalStandardScore
                }
          })

          res.status(201).json(newTryOut);
    } catch (error) {
        console.error("Error creating Tryout.", error);
        res.status(500).json({ error: error.message || "Terjadi kesalahan server" });
    } finally {
        await prisma.$disconnect()
    }
}

const deleteTryOut = async (req,res) => {
    try {
        const {id} = req.params

        const deletedTryOut = await prisma.tryOut.delete({
            where: {id: parseInt(id)}
        })

        res.status(204).json({message: "TryOut Berhasil Di Hapus"})
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus material.', message: error.message });
    }
}

module.exports = {
    createTryOut,
    getTryOut,
    getTryOutById,
    updateTryOut,
    deleteTryOut
}