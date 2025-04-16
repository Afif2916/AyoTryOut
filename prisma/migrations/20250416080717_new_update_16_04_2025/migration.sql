-- AddForeignKey
ALTER TABLE "BigTryOut" ADD CONSTRAINT "BigTryOut_questionTypeId_2_fkey" FOREIGN KEY ("questionTypeId_2") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BigTryOut" ADD CONSTRAINT "BigTryOut_questionTypeId_3_fkey" FOREIGN KEY ("questionTypeId_3") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
