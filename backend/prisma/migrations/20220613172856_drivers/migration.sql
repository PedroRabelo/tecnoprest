-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "rgUf" TEXT NOT NULL,
    "driverLicense" TEXT NOT NULL,
    "driverLicenseCategory" TEXT NOT NULL,
    "driverLicenseDate" TIMESTAMP(3) NOT NULL,
    "driverLicenseExpires" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postalCode" TEXT,
    "streetAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "mopp" TEXT,
    "moppExpires" TIMESTAMP(3),
    "languages" TEXT[],
    "emergencyPhone" TEXT,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_cpf_key" ON "drivers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_driverLicense_key" ON "drivers"("driverLicense");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_email_key" ON "drivers"("email");
