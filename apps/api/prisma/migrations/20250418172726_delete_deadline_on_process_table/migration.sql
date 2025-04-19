/*
  Warnings:

  - You are about to drop the `DeadlineOnProcess` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `processId` to the `deadlines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeadlineOnProcess" DROP CONSTRAINT "DeadlineOnProcess_deadlineId_fkey";

-- DropForeignKey
ALTER TABLE "DeadlineOnProcess" DROP CONSTRAINT "DeadlineOnProcess_processId_fkey";

-- AlterTable
ALTER TABLE "deadlines" ADD COLUMN     "processId" TEXT NOT NULL;

-- DropTable
DROP TABLE "DeadlineOnProcess";

-- AddForeignKey
ALTER TABLE "deadlines" ADD CONSTRAINT "deadlines_processId_fkey" FOREIGN KEY ("processId") REFERENCES "processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
