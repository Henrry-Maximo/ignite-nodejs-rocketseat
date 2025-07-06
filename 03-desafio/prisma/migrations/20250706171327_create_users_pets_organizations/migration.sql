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
CREATE TABLE "pet_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postal_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "pet_users_pkey" PRIMARY KEY ("id")
);

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
    "requisite" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_users_email_key" ON "pet_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pet_orgs_email_key" ON "pet_orgs"("email");
