const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getAllQuestion = async (req, res) => {
    try {
        
        const questions = await prisma.questionData.findMany({
            include: {
                questionType: {
                    include: {
                        materialType: true
                    }
                }
            }
        })
        
        const response = {
            questionsCount: questions.length,
            data: questions
        }

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params

        const questions = await prisma.questionData.findMany({
            where: {id: parseInt(id)},
            include: {
                questionType: {
                    include: {
                        materialType: true
                    }
                }
            }
        })

        const response = {
            questionsCount: questions.length,
            data: questions
        }

        if(!response.data[0]) return res.status(404).json({ error: "Materi Tidak ditemukan"})

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}

function validationRequest(value, fieldName) {
    if (!value) throw new Error(`${fieldName} wajib diisi`);
    
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) throw new Error(`${fieldName} harus berupa Integer`);

    return parsedValue;
}

const createQuestionBy = async (req, res) => {
    try {
        const { question, questionImage, choiceA, imageA, 
                choiceB, imageB, choiceC, imageC , choiceD, imageD,
                choiceE, imageE, explanation, explanationImage, explanationAnswer,
                scoreChoiceA, scoreChoiceB, scoreChoiceC, scoreChoiceD, scoreChoiceE, questionTypeId} = req.body;
    
        // Validasi input
        if (!question) return res.status(400).json({ error: "Pertanyaan Harus Diisi" });

        if (!choiceA && !imageA) return res.status(400).json({ error: "Pilihan A wajib diisi jika tidak ada gambar" });
        if (!choiceB && !imageB) return res.status(400).json({ error: "Pilihan B wajib diisi jika tidak ada gambar" });
        if (!choiceC && !imageC) return res.status(400).json({ error: "Pilihan C wajib diisi jika tidak ada gambar" });
        if (!choiceD && !imageD) return res.status(400).json({ error: "Pilihan D wajib diisi jika tidak ada gambar" });
        if (!choiceE && !imageE) return res.status(400).json({ error: "Pilihan E wajib diisi jika tidak ada gambar" });

        if (!explanation) return res.status(400).json({error: "Penjelasn Wajib Di Isi"})
        if (!explanationAnswer) return res.status(400).json({error: "Wajib ada Kunci jawaban"})


        const finalscoreChoiceA = validationRequest(scoreChoiceA, "Nilai Pilihan A")
        const finalscoreChoiceB = validationRequest(scoreChoiceB, "Nilai Pilihan B")
        const finalscoreChoiceC = validationRequest(scoreChoiceC, "Nilai Pilihan C")
        const finalscoreChoiceD = validationRequest(scoreChoiceD, "Nilai Pilihan D")
        const finalscoreChoiceE = validationRequest(scoreChoiceE, "Nilai Pilihan E")
    
       
        // Cek apakah materialTypeId valid
        const questionTypeExist = await prisma.questionType.findUnique({
          where: { id: parseInt(questionTypeId) },
        });
    
        if (!questionTypeExist) {
          return res.status(404).json({ error: "Tipe Pertanyaan tidak ditemukan tidak ditemukan" });
        }
        
       const newQuestion = await prisma.questionData.create({
            data: {
                question, 
                questionImage: questionImage || null,
                choiceA: choiceA || null,
                imageA: imageA || null,
                choiceB: choiceB || null,
                imageB: imageB || null,
                choiceC: choiceC || null,
                imageC: imageC || null,
                choiceD: choiceD || null,
                imageD: imageD || null,
                choiceE: choiceE || null,
                imageE: imageE || null,
                explanation,
                explanationImage: explanationImage || null,
                explanationAnswer,
                scoreChoiceA: finalscoreChoiceA,
                scoreChoiceB: finalscoreChoiceB,
                scoreChoiceC: finalscoreChoiceC,
                scoreChoiceD: finalscoreChoiceD,
                scoreChoiceE: finalscoreChoiceE,
                questionTypeId
            }
       })
        
    
     res.status(201).json(newQuestion);
      } catch (error) {
        console.error("Error creating question type:", error);
        res.status(500).json({ error: error.message || "Terjadi kesalahan server" });
      } finally {
        await prisma.$disconnect();
      }
}

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params
        const { question, questionImage, choiceA, imageA, 
            choiceB, imageB, choiceC, imageC , choiceD, imageD,
            choiceE, imageE, explanation, explanationImage, explanationAnswer,
            scoreChoiceA, scoreChoiceB, scoreChoiceC, scoreChoiceD, scoreChoiceE, questionTypeId} = req.body;

            if (!question) return res.status(400).json({ error: "Pertanyaan Harus Diisi" });

            if (!choiceA && !imageA) return res.status(400).json({ error: "Pilihan A wajib diisi jika tidak ada gambar" });
            if (!choiceB && !imageB) return res.status(400).json({ error: "Pilihan B wajib diisi jika tidak ada gambar" });
            if (!choiceC && !imageC) return res.status(400).json({ error: "Pilihan C wajib diisi jika tidak ada gambar" });
            if (!choiceD && !imageD) return res.status(400).json({ error: "Pilihan D wajib diisi jika tidak ada gambar" });
            if (!choiceE && !imageE) return res.status(400).json({ error: "Pilihan E wajib diisi jika tidak ada gambar" });
    
            if (!explanation) return res.status(400).json({error: "Penjelasn Wajib Di Isi"})
            if (!explanationAnswer) return res.status(400).json({error: "Wajib ada Kunci jawaban"})
    
    
            const finalscoreChoiceA = validationRequest(scoreChoiceA, "Nilai Pilihan A")
            const finalscoreChoiceB = validationRequest(scoreChoiceB, "Nilai Pilihan B")
            const finalscoreChoiceC = validationRequest(scoreChoiceC, "Nilai Pilihan C")
            const finalscoreChoiceD = validationRequest(scoreChoiceD, "Nilai Pilihan D")
            const finalscoreChoiceE = validationRequest(scoreChoiceE, "Nilai Pilihan E")
        
           
            // Cek apakah materialTypeId valid
            const questionTypeExist = await prisma.questionType.findUnique({
              where: { id: parseInt(questionTypeId) },
            });
        
            if (!questionTypeExist) {
              return res.status(404).json({ error: "Tipe Pertanyaan tidak ditemukan tidak ditemukan" });
            }

        const updatedQuestion = await prisma.questionData.update({
            where: {id: parseInt(id)},
            data: {
                question, 
                questionImage: questionImage || null,
                choiceA: choiceA || null,
                imageA: imageA || null,
                choiceB: choiceB || null,
                imageB: imageB || null,
                choiceC: choiceC || null,
                imageC: imageC || null,
                choiceD: choiceD || null,
                imageD: imageD || null,
                choiceE: choiceE || null,
                imageE: imageE || null,
                explanation,
                explanationImage: explanationImage || null,
                explanationAnswer,
                scoreChoiceA: finalscoreChoiceA,
                scoreChoiceB: finalscoreChoiceB,
                scoreChoiceC: finalscoreChoiceC,
                scoreChoiceD: finalscoreChoiceD,
                scoreChoiceE: finalscoreChoiceE,
                questionTypeId
            }
        })

        res.status(201).json(updatedQuestion);
    } catch (error) {
        console.error("Error creating question type:", error);
        res.status(500).json({ error: error.message || "Terjadi kesalahan server" });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const {id} = req.params

        const deletedQuestion = await prisma.questionData.delete({
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

const getQuestionbyQuestionType = async (req, res) => {
    try {
        const { id } = req.params;

        const questions = await prisma.questionData.findMany({
            where: { questionTypeId: parseInt(id) },
            include: {
                questionType: {
                    include: {
                        materialType: true
                    }
                }
            }
        });

        if (questions.length === 0) {
            return res.status(404).json({ error: "Pertanyaan tidak ditemukan di database", message: error.message });
        }

        
        const response = {
            questionsCount: questions.length,
            data: questions
        }
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ 
            error: "Terjadi Kesalahan pada Server",
            message: error.message });
    }
}

const getQuestionByMaterialType = async (req, res) => {
    try {
        const { id } = req.params;

        const questions = await prisma.questionData.findMany({
            where: {
                questionType: {
                    materialTypeId: parseInt(id)
                }
            },
            include: {
                questionType: {
                    include: {
                        materialType: true
                    }
                }
            }
        });

        if (questions.length === 0) {
            return res.status(404).json({ error: "Pertanyaan tidak ditemukan di database", message: error.message });
        }

        
        const response = {
            questionsCount: questions.length,
            data: questions
        }
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ 
            error: "Terjadi Kesalahan pada Server",
            message: error.message });
    }
}


module.exports = {
    getAllQuestion, getQuestionById, createQuestionBy, deleteQuestion, updateQuestion, getQuestionbyQuestionType, getQuestionByMaterialType
}