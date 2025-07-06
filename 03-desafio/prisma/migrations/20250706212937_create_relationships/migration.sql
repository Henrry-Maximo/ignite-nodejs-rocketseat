/*
  Warnings:

  - You are about to drop the column `requisite` on the `pet_pets` table. All the data in the column will be lost.
  - You are about to drop the `pet_users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `org_id` to the `pet_pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet_pets" DROP COLUMN "requisite",
ADD COLUMN     "org_id" TEXT NOT NULL,
ADD COLUMN     "requisites" TEXT[];

-- DropTable
DROP TABLE "pet_users";

-- CreateIndex
CREATE INDEX "pet_orgs_city_idx" ON "pet_orgs"("city");

-- AddForeignKey
ALTER TABLE "pet_pets" ADD CONSTRAINT "pet_pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "pet_orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
