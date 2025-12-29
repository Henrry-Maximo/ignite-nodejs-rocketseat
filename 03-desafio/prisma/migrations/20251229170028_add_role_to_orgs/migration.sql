-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "pet_orgs" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
