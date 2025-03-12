/*
  Warnings:

  - You are about to drop the column `services` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `categoryID` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `subContent` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Services` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Services` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servicelink]` on the table `Services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overviewcontent` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overviewtitle` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicelink` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Services_name_key";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "services";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "categoryID",
DROP COLUMN "name",
DROP COLUMN "services",
DROP COLUMN "subContent",
DROP COLUMN "subtitle",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "overviewcontent" TEXT NOT NULL,
ADD COLUMN     "overviewtitle" TEXT NOT NULL,
ADD COLUMN     "servicelink" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Features" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "Features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Services_title_key" ON "Services"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Services_servicelink_key" ON "Services"("servicelink");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Features" ADD CONSTRAINT "Features_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
