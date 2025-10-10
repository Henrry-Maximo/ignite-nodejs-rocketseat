/*
  Warnings:

  - The values [FILHOTE,ADULTO,IDOSO] on the enum `Age` will be removed. If these variants are still used in the database, this will fail.
  - The values [PEQUENO,AMPLO] on the enum `Ambience` will be removed. If these variants are still used in the database, this will fail.
  - The values [BAIXA,MEDIA,ALTA] on the enum `Independence` will be removed. If these variants are still used in the database, this will fail.
  - The values [BAIXA,MEDIA,ALTA] on the enum `Power` will be removed. If these variants are still used in the database, this will fail.
  - The values [PEQUENINO,MEDIANO,GRANDINHO] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.
  - The values [DISPONÍVEL,INDISPONÍVEL] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `city` on the `pet_orgs` table. All the data in the column will be lost.
  - Added the required column `path` to the `pet_pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Age_new" AS ENUM ('PUPPY', 'YOUNG', 'ADULT', 'SENIOR');
ALTER TABLE "pet_pets" ALTER COLUMN "age" TYPE "Age_new" USING ("age"::text::"Age_new");
ALTER TYPE "Age" RENAME TO "Age_old";
ALTER TYPE "Age_new" RENAME TO "Age";
DROP TYPE "Age_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Ambience_new" AS ENUM ('SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE');
ALTER TABLE "pet_pets" ALTER COLUMN "ambience" TYPE "Ambience_new" USING ("ambience"::text::"Ambience_new");
ALTER TYPE "Ambience" RENAME TO "Ambience_old";
ALTER TYPE "Ambience_new" RENAME TO "Ambience";
DROP TYPE "Ambience_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Independence_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "pet_pets" ALTER COLUMN "independence" TYPE "Independence_new" USING ("independence"::text::"Independence_new");
ALTER TYPE "Independence" RENAME TO "Independence_old";
ALTER TYPE "Independence_new" RENAME TO "Independence";
DROP TYPE "Independence_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Power_new" AS ENUM ('LOW', 'MODERATE', 'HIGH');
ALTER TABLE "pet_pets" ALTER COLUMN "power" TYPE "Power_new" USING ("power"::text::"Power_new");
ALTER TYPE "Power" RENAME TO "Power_old";
ALTER TYPE "Power_new" RENAME TO "Power";
DROP TYPE "Power_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');
ALTER TABLE "pet_pets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('AVAILABLE', 'ADOPTED', 'RESERVED', 'UNAVAILABLE');
ALTER TABLE "pet_pets" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropIndex
DROP INDEX "pet_orgs_city_idx";

-- AlterTable
ALTER TABLE "pet_orgs" DROP COLUMN "city";

-- AlterTable
ALTER TABLE "pet_pets" ADD COLUMN     "path" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'AVAILABLE',
ALTER COLUMN "age" SET DEFAULT 'YOUNG',
ALTER COLUMN "size" SET DEFAULT 'MEDIUM',
ALTER COLUMN "power" SET DEFAULT 'MODERATE',
ALTER COLUMN "independence" SET DEFAULT 'MEDIUM',
ALTER COLUMN "ambience" SET DEFAULT 'MEDIUM_SPACE';
