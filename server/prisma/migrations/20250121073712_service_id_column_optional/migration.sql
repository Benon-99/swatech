-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_serviceId_fkey";

-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
