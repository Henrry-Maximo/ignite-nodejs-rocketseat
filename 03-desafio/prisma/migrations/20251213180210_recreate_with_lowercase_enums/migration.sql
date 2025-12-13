/*
  Warnings:

  - The values [PUPPY,YOUNG,ADULT,SENIOR] on the enum `Age` will be removed. If these variants are still used in the database, this will fail.
  - The values [SMALL_SPACE,MEDIUM_SPACE,LARGE_SPACE] on the enum `Ambience` will be removed. If these variants are still used in the database, this will fail.
  - The values [LOW,MEDIUM,HIGH] on the enum `Independence` will be removed. If these variants are still used in the database, this will fail.
  - The values [LOW,MODERATE,HIGH] on the enum `Power` will be removed. If these variants are still used in the database, this will fail.
  - The values [SMALL,MEDIUM,LARGE] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.
  - The values [AVAILABLE,ADOPTED,RESERVED,UNAVAILABLE] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Age_new" AS ENUM ('puppy', 'young', 'adult');
ALTER TABLE "pet_pets" ALTER COLUMN "age" DROP DEFAULT;
ALTER TABLE "pet_pets" ALTER COLUMN "age" TYPE "Age_new" USING ("age"::text::"Age_new");
ALTER TYPE "Age" RENAME TO "Age_old";
ALTER TYPE "Age_new" RENAME TO "Age";
DROP TYPE "Age_old";
ALTER TABLE "pet_pets" ALTER COLUMN "age" SET DEFAULT 'young';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Ambience_new" AS ENUM ('small', 'medium', 'large');
ALTER TABLE "pet_pets" ALTER COLUMN "ambience" DROP DEFAULT;
ALTER TABLE "pet_pets" ALTER COLUMN "ambience" TYPE "Ambience_new" USING ("ambience"::text::"Ambience_new");
ALTER TYPE "Ambience" RENAME TO "Ambience_old";
ALTER TYPE "Ambience_new" RENAME TO "Ambience";
DROP TYPE "Ambience_old";
ALTER TABLE "pet_pets" ALTER COLUMN "ambience" SET DEFAULT 'medium';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Independence_new" AS ENUM ('low', 'medium', 'high');
ALTER TABLE "pet_pets" ALTER COLUMN "independence" DROP DEFAULT;
ALTER TABLE "pet_pets" ALTER COLUMN "independence" TYPE "Independence_new" USING ("independence"::text::"Independence_new");
ALTER TYPE "Independence" RENAME TO "Independence_old";
ALTER TYPE "Independence_new" RENAME TO "Independence";
DROP TYPE "Independence_old";
ALTER TABLE "pet_pets" ALTER COLUMN "independence" SET DEFAULT 'medium';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Power_new" AS ENUM ('low', 'moderate', 'high');
ALTER TABLE "pet_pets" ALTER COLUMN "power" DROP DEFAULT;
ALTER TABLE "pet_pets" ALTER COLUMN "power" TYPE "Power_new" USING ("power"::text::"Power_new");
ALTER TYPE "Power" RENAME TO "Power_old";
ALTER TYPE "Power_new" RENAME TO "Power";
DROP TYPE "Power_old";
ALTER TABLE "pet_pets" ALTER COLUMN "power" SET DEFAULT 'moderate';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('small', 'medium', 'large');
ALTER TABLE "pet_pets" ALTER COLUMN "size" DROP DEFAULT;
ALTER TABLE "pet_pets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
ALTER TABLE "pet_pets" ALTER COLUMN "size" SET DEFAULT 'medium';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('available', 'adopted', 'reserved', 'unavailable');
ALTER TABLE "pet_pets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "pet_pets" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "pet_pets" ALTER COLUMN "status" SET DEFAULT 'available';
COMMIT;

-- AlterTable
ALTER TABLE "pet_pets" ALTER COLUMN "status" SET DEFAULT 'available',
ALTER COLUMN "age" SET DEFAULT 'young',
ALTER COLUMN "size" SET DEFAULT 'medium',
ALTER COLUMN "power" SET DEFAULT 'moderate',
ALTER COLUMN "independence" SET DEFAULT 'medium',
ALTER COLUMN "ambience" SET DEFAULT 'medium';
