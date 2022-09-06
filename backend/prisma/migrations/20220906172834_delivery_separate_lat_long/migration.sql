/*
  Warnings:

  - You are about to drop the column `originLatLong` on the `deliveries` table. All the data in the column will be lost.
  - Added the required column `originLatitude` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originLongitude` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "originLatLong",
ADD COLUMN     "originLatitude" TEXT NOT NULL,
ADD COLUMN     "originLongitude" TEXT NOT NULL;
