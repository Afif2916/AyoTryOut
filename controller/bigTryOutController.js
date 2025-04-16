const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {blankValidationRequest, validationRequest} = require("../utils/validation")


const getBigTryOut = async (req, res) => {
    try {

        const limit = await prisma.bigTryOut.findFirst({
            select: {
                questionAmount1: true
            }
        })

        const limit2 = await prisma.bigTryOut.findFirst({
            select: {
                questionAmount2: true
            }
        })

        const limit3 = await prisma.bigTryOut.findFirst({
            select: {
                questionAmount3: true
            }
        })
        
        const bigTryOut = await prisma.bigTryOut.findMany({
            include: {
                questionType_1: {
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
                },

                questionType_2: {
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
                },

                questionType_3: {
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
                },
            }
        })

        const modifiedBigTryOut = bigTryOut.map(item => ({
            ...item,
            questionType_1: {
                ...item.questionType_1,
                questions: item.questionType_1.questions.slice(0, item.questionAmount1)
            },
            questionType_2: {
                ...item.questionType_2,
                questions: item.questionType_2.questions.slice(0, item.questionAmount2)
            },
            questionType_3: {
                ...item.questionType_3,
                questions: item.questionType_3.questions.slice(0, item.questionAmount3)
            },
        }));
        
        const response = {
            bigTryOutCount: bigTryOut.length,
            data: modifiedBigTryOut,
           
        }

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }
}

const getBigTryOutById = async (req, res) => {
    try {

        const { id } = req.params

        const limit = await prisma.bigTryOut.findFirst({
            where: {id: parseInt(id)},
            select: {
                questionAmount1: true
            }
        })

        const limit2 = await prisma.bigTryOut.findFirst({
            where: {id: parseInt(id)},
            select: {
                questionAmount2: true
            }
        })

        const limit3 = await prisma.bigTryOut.findFirst({
            where: {id: parseInt(id)},
            select: {
                questionAmount3: true
            }
        })
        
        const bigTryOut = await prisma.bigTryOut.findMany({
            where: {id: parseInt(id)},
            include: {
                questionType_1: {
                    select: {
                        id: true,
                        questionTypeName: true,
                        questions: {
                            take: limit.questionAmount1,
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
                },

                questionType_2: {
                    select: {
                        id: true,
                        questionTypeName: true,
                        questions: {
                            take: limit2.questionAmount2,
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
                },

                questionType_3: {
                    select: {
                        id: true,
                        questionTypeName: true,
                        questions: {
                            take: limit3.questionAmount3,
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
                },
            }
        })
        
        const response = {
            bigTryOutCount: bigTryOut.length,
            data: bigTryOut,
           
        }

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.', message: error.message });
    }

}

const createBigTryOut = async (req, res) => {
    try {
        const { bigTryOutName, questionTypeId_1, questionTypeId_2, questionTypeId_3, time, 
            standardQuestionType1, standardQuestionType2, standardQuestionType3,
            questionAmount1, questionAmount2, questionAmount3, allQuestionAmount
        } = req.body

        blankValidationRequest(bigTryOutName, "Nama TryOut")

        const fieldsToValidate = [
            [questionTypeId_1, "Tipe Pertanyaan 1"],
            [questionTypeId_2, "Tipe Pertanyaan 2"],
            [questionTypeId_3, "Tipe Pertanyaan 3"],
            [time, "Waktu"],
            [standardQuestionType1, "Nilai Minimal 1"],
            [standardQuestionType2, "Nilai Minimal 2"],
            [standardQuestionType3, "Nilai Minimal 3"],
            [questionAmount1, "Jumlah Pertanyaan 1"],
            [questionAmount2, "Jumlah Pertanyaan 2"],
            [questionAmount3, "Jumlah Pertanyaan 3"],
            [allQuestionAmount, "Jumlah Keseluruhan Pertanyaan"],
          ];

          const [
            parsedQuestionType1, parsedQuestionType2, parsedQuestionType3,
            parsedTime,
            parsedStandarQuestionType1, parsedStandarQuestionType2, parsedStandarQuestionType3,
            parsedQuestionAmount1, parsedQuestionAmount2, parsedQuestionAmount3,
            parsedAllQuestionAmount
          ] = fieldsToValidate.map(([value, label]) => validationRequest(value, label));

          const questionTypes = [parsedQuestionType1, parsedQuestionType2, parsedQuestionType3];

          const checkQuestionTypes = await Promise.all(
            questionTypes.map(id =>
              prisma.questionType.findUnique({ where: { id: parseInt(id) } })
            )
          );

          const notFoundIndex = checkQuestionTypes.findIndex(q => !q);
            if (notFoundIndex !== -1) {
            return res.status(404).json({
                error: `Tipe Pertanyaan ${notFoundIndex + 1} tidak ditemukan`
            });
            }
        

        const newBigtryOut = await prisma.bigTryOut.create({
            data : {
                bigTryOutName,
                questionTypeId_1: parsedQuestionType1,
                questionTypeId_2: parsedQuestionType2,
                questionTypeId_3: parsedQuestionType3,
                time: parsedTime,
                standardQuestionType1: parsedStandarQuestionType1,
                standardQuestionType2: parsedStandarQuestionType2,
                standardQuestionType3: parsedStandarQuestionType3,
                questionAmount1: parsedQuestionAmount1,
                questionAmount2: parsedQuestionAmount2,
                questionAmount3: parsedQuestionAmount3,
                allQuestionAmount: parsedAllQuestionAmount
            }
        })

        res.status(201).json(newBigtryOut);


    } catch (error) {
        console.error("Error creating Tryout.", error);
        res.status(500).json({ error: error.message || "Terjadi kesalahan server" });
    } finally {
        await prisma.$disconnect()
    }
}

const updateBigTryOut = async (req, res) => {
    try {

        const { id } = req.params
        const { bigTryOutName, questionTypeId_1, questionTypeId_2, questionTypeId_3, time, 
            standardQuestionType1, standardQuestionType2, standardQuestionType3,
            questionAmount1, questionAmount2, questionAmount3, allQuestionAmount
        } = req.body

        blankValidationRequest(bigTryOutName, "Nama TryOut")

        const fieldsToValidate = [
            [questionTypeId_1, "Tipe Pertanyaan 1"],
            [questionTypeId_2, "Tipe Pertanyaan 2"],
            [questionTypeId_3, "Tipe Pertanyaan 3"],
            [time, "Waktu"],
            [standardQuestionType1, "Nilai Minimal 1"],
            [standardQuestionType2, "Nilai Minimal 2"],
            [standardQuestionType3, "Nilai Minimal 3"],
            [questionAmount1, "Jumlah Pertanyaan 1"],
            [questionAmount2, "Jumlah Pertanyaan 2"],
            [questionAmount3, "Jumlah Pertanyaan 3"],
            [allQuestionAmount, "Jumlah Keseluruhan Pertanyaan"],
          ];

          const [
            parsedQuestionType1, parsedQuestionType2, parsedQuestionType3,
            parsedTime,
            parsedStandarQuestionType1, parsedStandarQuestionType2, parsedStandarQuestionType3,
            parsedQuestionAmount1, parsedQuestionAmount2, parsedQuestionAmount3,
            parsedAllQuestionAmount
          ] = fieldsToValidate.map(([value, label]) => validationRequest(value, label));

          const questionTypes = [parsedQuestionType1, parsedQuestionType2, parsedQuestionType3];

          const checkQuestionTypes = await Promise.all(
            questionTypes.map(id =>
              prisma.questionType.findUnique({ where: { id: parseInt(id) } })
            )
          );

          const notFoundIndex = checkQuestionTypes.findIndex(q => !q);
            if (notFoundIndex !== -1) {
            return res.status(404).json({
                error: `Tipe Pertanyaan ${notFoundIndex + 1} tidak ditemukan`
            });
            }
        

        const newBigtryOut = await prisma.bigTryOut.update({
            where: {id: parseInt(id)},
            data : {
                bigTryOutName,
                questionTypeId_1: parsedQuestionType1,
                questionTypeId_2: parsedQuestionType2,
                questionTypeId_3: parsedQuestionType3,
                time: parsedTime,
                standardQuestionType1: parsedStandarQuestionType1,
                standardQuestionType2: parsedStandarQuestionType2,
                standardQuestionType3: parsedStandarQuestionType3,
                questionAmount1: parsedQuestionAmount1,
                questionAmount2: parsedQuestionAmount2,
                questionAmount3: parsedQuestionAmount3,
                allQuestionAmount: parsedAllQuestionAmount
            }
        })

        res.status(201).json(newBigtryOut);


    } catch (error) {
        console.error("Error creating Tryout.", error);
        res.status(500).json({ error: error.message || "Terjadi kesalahan server" });
    } finally {
        await prisma.$disconnect()
    }
}

const deleteBigTryOut = async (req,res) => {
    try {
        const {id} = req.params

        const deletedBigTryOut = await prisma.bigTryOut.delete({
            where: {id: parseInt(id)}
        })

        res.status(204).json({message: "TryOut Berhasil Di Hapus"})
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus material.', message: error.message });
    }
}


module.exports = {
    createBigTryOut, getBigTryOut, getBigTryOutById, updateBigTryOut, deleteBigTryOut
}