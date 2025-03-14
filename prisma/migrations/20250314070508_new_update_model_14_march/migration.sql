-- AlterTable
ALTER TABLE "QuestionData" ALTER COLUMN "choiceA" DROP NOT NULL,
ALTER COLUMN "choiceB" DROP NOT NULL,
ALTER COLUMN "choiceC" DROP NOT NULL,
ALTER COLUMN "choiceD" DROP NOT NULL,
ALTER COLUMN "choiceE" DROP NOT NULL,
ALTER COLUMN "explanation" DROP NOT NULL;

-- CreateTable
CREATE TABLE "userAnswers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userAnswers_pkey" PRIMARY KEY ("id")
);
