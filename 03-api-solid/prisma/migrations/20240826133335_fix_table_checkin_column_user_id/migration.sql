/*
  Warnings:

  - You are about to drop the column `usar_id` on the `check_ins` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_usar_id_fkey";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "usar_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
