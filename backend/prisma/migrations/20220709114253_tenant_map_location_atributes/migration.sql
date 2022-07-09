-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LocationType" ADD VALUE 'POSTO';
ALTER TYPE "LocationType" ADD VALUE 'OFICINA';
ALTER TYPE "LocationType" ADD VALUE 'PEDAGIO';

-- AlterTable
ALTER TABLE "tenant_map_locations" ADD COLUMN     "isPolygon" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRoute" BOOLEAN NOT NULL DEFAULT false;
