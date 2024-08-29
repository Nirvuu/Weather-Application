-- CreateTable
CREATE TABLE `Weather` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `temp` DOUBLE NOT NULL,
    `condition` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `feelsLike` DOUBLE NOT NULL,
    `wind` DOUBLE NOT NULL,
    `humidity` DOUBLE NOT NULL,
    `lastUpdated` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Forecast` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `date` DATETIME NOT NULL,
    `maxTemp` DOUBLE NOT NULL,
    `minTemp` DOUBLE NOT NULL,
    `condition` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `sunrise` VARCHAR(191) NOT NULL,
    `sunset` VARCHAR(191) NOT NULL,
    `moonrise` VARCHAR(191) NOT NULL,
    `moonset` VARCHAR(191) NOT NULL,
    `moonPhase` VARCHAR(191) NOT NULL,
    `chanceOfRain` INTEGER NOT NULL,
    `chanceOfSnow` INTEGER NOT NULL,
    `hourly` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
