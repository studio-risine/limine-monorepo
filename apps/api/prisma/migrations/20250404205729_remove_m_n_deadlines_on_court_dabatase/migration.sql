/*
  Warnings:

  - You are about to drop the `DeadlinesOnCourts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeadlinesOnCourts" DROP CONSTRAINT "DeadlinesOnCourts_courtId_fkey";

-- DropForeignKey
ALTER TABLE "DeadlinesOnCourts" DROP CONSTRAINT "DeadlinesOnCourts_deadline_id_fkey";

-- AlterTable
ALTER TABLE "deadlines" ADD COLUMN     "court_id" TEXT;

-- DropTable
DROP TABLE "DeadlinesOnCourts";

-- AddForeignKey
ALTER TABLE "deadlines" ADD CONSTRAINT "deadlines_court_id_fkey" FOREIGN KEY ("court_id") REFERENCES "courts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
