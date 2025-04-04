/*
  Warnings:

  - You are about to drop the column `user_id` on the `courts` table. All the data in the column will be lost.
  - Added the required column `holiday_id` to the `courts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `data` on the `holidays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "courts" DROP CONSTRAINT "courts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_deadline_id_fkey";

-- AlterTable
ALTER TABLE "courts" DROP COLUMN "user_id",
ADD COLUMN     "holiday_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "holidays" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "deadline_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CourtHoliday" (
    "id" TEXT NOT NULL,
    "holiday_id" TEXT NOT NULL,
    "court_id" TEXT NOT NULL,

    CONSTRAINT "CourtHoliday_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourtHoliday_court_id_holiday_id_key" ON "CourtHoliday"("court_id", "holiday_id");

-- CreateIndex
CREATE INDEX "holidays_date_idx" ON "holidays"("date");

-- CreateIndex
CREATE INDEX "holidays_type_idx" ON "holidays"("type");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_deadline_id_fkey" FOREIGN KEY ("deadline_id") REFERENCES "deadlines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courts" ADD CONSTRAINT "courts_holiday_id_fkey" FOREIGN KEY ("holiday_id") REFERENCES "holidays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourtHoliday" ADD CONSTRAINT "CourtHoliday_holiday_id_fkey" FOREIGN KEY ("holiday_id") REFERENCES "holidays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourtHoliday" ADD CONSTRAINT "CourtHoliday_court_id_fkey" FOREIGN KEY ("court_id") REFERENCES "courts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
