-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('USERCPNS', 'ADMIN', 'USERUJIANAKBAR', 'USERLAIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'NOT_ACTIVE');

-- CreateEnum
CREATE TYPE "Information" AS ENUM ('LULUS', 'TIDAK_LULUS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userRole" "RoleUser" NOT NULL DEFAULT 'USERCPNS',
    "userStatus" "Status" NOT NULL DEFAULT 'NOT_ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TryOut" (
    "id" SERIAL NOT NULL,
    "tryOutName" TEXT NOT NULL,
    "questionTypeId" INTEGER NOT NULL,
    "questionAmount" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "standardScore" INTEGER NOT NULL,

    CONSTRAINT "TryOut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialType" (
    "id" SERIAL NOT NULL,
    "materialName" TEXT NOT NULL,

    CONSTRAINT "MaterialType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionType" (
    "id" SERIAL NOT NULL,
    "questionTypeName" TEXT NOT NULL,

    CONSTRAINT "QuestionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BigTryOut" (
    "id" SERIAL NOT NULL,
    "bigTryOutName" TEXT NOT NULL,
    "questionType1" INTEGER NOT NULL,
    "questionType2" INTEGER NOT NULL,
    "questionType3" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "standardQuestionType1" INTEGER NOT NULL,
    "standardQuestionType2" INTEGER NOT NULL,
    "standardQuestionType3" INTEGER NOT NULL,
    "questionAmount1" INTEGER NOT NULL,
    "questionAmount2" INTEGER NOT NULL,
    "questionAmount3" INTEGER NOT NULL,
    "allQuestionAmount" INTEGER NOT NULL,
    "tryOutStatus" "Status" NOT NULL DEFAULT 'NOT_ACTIVE',

    CONSTRAINT "BigTryOut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionData" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "questionImage" TEXT,
    "choiceA" TEXT NOT NULL,
    "imageA" TEXT,
    "choiceB" TEXT NOT NULL,
    "imageB" TEXT,
    "choiceC" TEXT NOT NULL,
    "imageC" TEXT,
    "choiceD" TEXT NOT NULL,
    "imageD" TEXT,
    "choiceE" TEXT NOT NULL,
    "imageE" TEXT,
    "explanation" TEXT NOT NULL,
    "explanationImage" TEXT,
    "explanationAnswer" TEXT NOT NULL,
    "questionTypeId" INTEGER NOT NULL,
    "scoreChoiceA" INTEGER NOT NULL,
    "scoreChoiceB" INTEGER NOT NULL,
    "scoreChoiceC" INTEGER NOT NULL,
    "scoreChoiceD" INTEGER NOT NULL,
    "scoreChoiceE" INTEGER NOT NULL,

    CONSTRAINT "QuestionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinalScore" (
    "id" SERIAL NOT NULL,
    "tryOutId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "information" "Information" NOT NULL,

    CONSTRAINT "FinalScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinalScoreBigTryOut" (
    "id" SERIAL NOT NULL,
    "tryOutId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "tkpScore" INTEGER NOT NULL,
    "twkScore" INTEGER NOT NULL,
    "tiuScore" INTEGER NOT NULL,
    "tkpInformation" "Information" NOT NULL,
    "twkInformation" "Information" NOT NULL,
    "tiuInformation" "Information" NOT NULL,
    "information" "Information" NOT NULL,

    CONSTRAINT "FinalScoreBigTryOut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TryOut" ADD CONSTRAINT "TryOut_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionData" ADD CONSTRAINT "QuestionData_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalScore" ADD CONSTRAINT "FinalScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalScore" ADD CONSTRAINT "FinalScore_tryOutId_fkey" FOREIGN KEY ("tryOutId") REFERENCES "TryOut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalScore" ADD CONSTRAINT "FinalScore_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "MaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalScoreBigTryOut" ADD CONSTRAINT "FinalScoreBigTryOut_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalScoreBigTryOut" ADD CONSTRAINT "FinalScoreBigTryOut_tryOutId_fkey" FOREIGN KEY ("tryOutId") REFERENCES "BigTryOut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalScoreBigTryOut" ADD CONSTRAINT "FinalScoreBigTryOut_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "MaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
