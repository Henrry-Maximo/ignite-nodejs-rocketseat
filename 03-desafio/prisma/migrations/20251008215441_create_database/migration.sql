-- CreateEnum
CREATE TYPE "Age" AS ENUM ('FILHOTE', 'ADULTO', 'IDOSO');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('PEQUENINO', 'MEDIANO', 'GRANDINHO');

-- CreateEnum
CREATE TYPE "Power" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "Ambience" AS ENUM ('PEQUENO', 'AMPLO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DISPONÍVEL', 'INDISPONÍVEL');

-- CreateTable
CREATE TABLE "pet_pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "power" "Power" NOT NULL,
    "independence" "Independence" NOT NULL,
    "ambience" "Ambience" NOT NULL,
    "requisites" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pet_pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_orgs_email_key" ON "pet_orgs"("email");

-- CreateIndex
CREATE INDEX "pet_orgs_city_idx" ON "pet_orgs"("city");

-- AddForeignKey
ALTER TABLE "pet_pets" ADD CONSTRAINT "pet_pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "pet_orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
