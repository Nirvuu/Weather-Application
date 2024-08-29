/*
  Warnings:

  - You are about to drop the column `date` on the `forecast` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Forecast` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Forecast_name_date_key` ON `forecast`;

-- AlterTable
ALTER TABLE `forecast` DROP COLUMN `date`;

-- CreateIndex
CREATE UNIQUE INDEX `Forecast_name_key` ON `Forecast`(`name`);
