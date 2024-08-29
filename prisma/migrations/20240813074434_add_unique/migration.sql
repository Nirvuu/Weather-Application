/*
  Warnings:

  - You are about to drop the column `country` on the `forecast` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `forecast` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `forecast` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `forecast` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `weather` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `weather` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,date]` on the table `Forecast` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Weather` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `forecast` DROP COLUMN `country`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `region`,
    DROP COLUMN `updatedAt`,
    ALTER COLUMN `lastUpdated` DROP DEFAULT;

-- AlterTable
ALTER TABLE `weather` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `humidity` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Forecast_name_date_key` ON `Forecast`(`name`, `date`);

-- CreateIndex
CREATE UNIQUE INDEX `Weather_name_key` ON `Weather`(`name`);
