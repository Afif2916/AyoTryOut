/*
  Warnings:

  - Added the required column `materialTypeId` to the `QuestionType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MaterialType" DROP CONSTRAINT "MaterialType_questionTypeId_fkey";

-- AlterTable
ALTER TABLE "QuestionType" ADD COLUMN     "materialTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionType" ADD CONSTRAINT "QuestionType_materialTypeId_fkey" FOREIGN KEY ("materialTypeId") REFERENCES "MaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
