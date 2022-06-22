/*
  Warnings:

  - Added the required column `type` to the `tenant_map_locations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('MATRIZ', 'FILIAL');

-- AlterTable
ALTER TABLE "tenant_map_locations" ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "LocationType" NOT NULL;
