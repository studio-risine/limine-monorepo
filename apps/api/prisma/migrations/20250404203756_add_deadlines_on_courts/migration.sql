/*
  Warnings:

  - You are about to drop the column `deadline_id` on the `courts` table. All the data in the column will be lost.
  - You are about to drop the column `holiday_id` on the `courts` table. All the data in the column will be lost.
  - You are about to drop the column `deadline_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `CourtHoliday` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `due_date_in_day` to the `deadlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `deadlines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `deadlines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourtHoliday" DROP CONSTRAINT "CourtHoliday_court_id_fkey";

-- DropForeignKey
ALTER TABLE "CourtHoliday" DROP CONSTRAINT "CourtHoliday_holiday_id_fkey";

-- DropForeignKey
ALTER TABLE "courts" DROP CONSTRAINT "courts_deadline_id_fkey";

-- DropForeignKey
ALTER TABLE "courts" DROP CONSTRAINT "courts_holiday_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_deadline_id_fkey";

-- AlterTable
ALTER TABLE "courts" DROP COLUMN "deadline_id",
DROP COLUMN "holiday_id";

-- AlterTable
ALTER TABLE "deadlines" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "due_date_in_day" INTEGER NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deadline_id";

-- DropTable
DROP TABLE "CourtHoliday";

-- CreateTable
CREATE TABLE "DeadlinesOnCourts" (
    "deadline_id" TEXT NOT NULL,
    "courtId" TEXT NOT NULL,

    CONSTRAINT "DeadlinesOnCourts_pkey" PRIMARY KEY ("deadline_id","courtId")
);

-- AddForeignKey
ALTER TABLE "deadlines" ADD CONSTRAINT "deadlines_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeadlinesOnCourts" ADD CONSTRAINT "DeadlinesOnCourts_deadline_id_fkey" FOREIGN KEY ("deadline_id") REFERENCES "deadlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeadlinesOnCourts" ADD CONSTRAINT "DeadlinesOnCourts_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "courts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
