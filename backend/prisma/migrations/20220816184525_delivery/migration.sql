-- CreateTable
CREATE TABLE "drivers_tenant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driverId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "drivers_tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL,
    "routeName" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "originLatLong" TEXT[],
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_directions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "delivery_directions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direction_geocoded" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "types" TEXT[],
    "deliveryDirectionId" TEXT NOT NULL,

    CONSTRAINT "direction_geocoded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direction_routes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deliveryDirectionId" TEXT NOT NULL,
    "copyrights" TEXT NOT NULL,
    "bounds" JSONB NOT NULL,
    "overviewPolyline" JSONB NOT NULL,
    "sumary" TEXT NOT NULL,
    "warnings" TEXT NOT NULL,
    "waypointOrder" INTEGER[],

    CONSTRAINT "direction_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_legs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "directionRouteId" TEXT NOT NULL,
    "leg" JSONB NOT NULL,

    CONSTRAINT "route_legs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drivers_tenant" ADD CONSTRAINT "drivers_tenant_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers_tenant" ADD CONSTRAINT "drivers_tenant_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles_tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers_tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direction_geocoded" ADD CONSTRAINT "direction_geocoded_deliveryDirectionId_fkey" FOREIGN KEY ("deliveryDirectionId") REFERENCES "delivery_directions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direction_routes" ADD CONSTRAINT "direction_routes_deliveryDirectionId_fkey" FOREIGN KEY ("deliveryDirectionId") REFERENCES "delivery_directions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_legs" ADD CONSTRAINT "route_legs_directionRouteId_fkey" FOREIGN KEY ("directionRouteId") REFERENCES "direction_routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
