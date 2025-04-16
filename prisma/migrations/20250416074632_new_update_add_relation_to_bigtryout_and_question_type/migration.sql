/*
  Warnings:

  - You are about to drop the column `questionType1` on the `BigTryOut` table. All the data in the column will be lost.
  - You are about to drop the column `questionType2` on the `BigTryOut` table. All the data in the column will be lost.
  - You are about to drop the column `questionType3` on the `BigTryOut` table. All the data in the column will be lost.
  - Added the required column `questionTypeId_1` to the `BigTryOut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionTypeId_2` to the `BigTryOut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionTypeId_3` to the `BigTryOut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BigTryOut" DROP COLUMN "questionType1",
DROP COLUMN "questionType2",
DROP COLUMN "questionType3",
ADD COLUMN     "questionTypeId_1" INTEGER NOT NULL,
ADD COLUMN     "questionTypeId_2" INTEGER NOT NULL,
ADD COLUMN     "questionTypeId_3" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BigTryOut" ADD CONSTRAINT "BigTryOut_questionTypeId_1_fkey" FOREIGN KEY ("questionTypeId_1") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
