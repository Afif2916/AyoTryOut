-- AddForeignKey
ALTER TABLE "userAnswers" ADD CONSTRAINT "userAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAnswers" ADD CONSTRAINT "userAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
