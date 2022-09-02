-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_driverId_fkey";

-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_vehicleId_fkey";

-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "vehicleId" DROP NOT NULL,
ALTER COLUMN "driverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers_tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
