/*
  Warnings:

  - You are about to drop the column `bodyType` on the `classifieds` table. All the data in the column will be lost.
  - You are about to drop the column `fuelType` on the `classifieds` table. All the data in the column will be lost.
  - You are about to drop the column `odoUnit` on the `classifieds` table. All the data in the column will be lost.
  - You are about to drop the column `ulezCompliance` on the `classifieds` table. All the data in the column will be lost.
  - You are about to drop the column `yearEnd` on the `model_variants` table. All the data in the column will be lost.
  - You are about to drop the column `yearStart` on the `model_variants` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `requires2FA` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `year_end` to the `model_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_start` to the `model_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classifieds" DROP COLUMN "bodyType",
DROP COLUMN "fuelType",
DROP COLUMN "odoUnit",
DROP COLUMN "ulezCompliance",
ADD COLUMN     "body_type" "BodyType" NOT NULL DEFAULT 'SEDAN',
ADD COLUMN     "fuel_type" "FuelType" NOT NULL DEFAULT 'PETROL',
ADD COLUMN     "odo_unit" "OdoUnit" NOT NULL DEFAULT 'MILES',
ADD COLUMN     "ulez_compliance" "ULEZCompliance" NOT NULL DEFAULT 'EXEMPT';

-- AlterTable
ALTER TABLE "model_variants" DROP COLUMN "yearEnd",
DROP COLUMN "yearStart",
ADD COLUMN     "year_end" INTEGER NOT NULL,
ADD COLUMN     "year_start" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "page_views" DROP COLUMN "ipAddress",
DROP COLUMN "userAgent",
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "user_agent" TEXT;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "requires2FA",
ADD COLUMN     "requires_2fa" BOOLEAN NOT NULL DEFAULT true;
