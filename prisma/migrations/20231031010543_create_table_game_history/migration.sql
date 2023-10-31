-- CreateTable
CREATE TABLE `GameHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProfile` INTEGER NOT NULL,
    `level` VARCHAR(50) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `score` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GameHistory` ADD CONSTRAINT `GameHistory_idProfile_fkey` FOREIGN KEY (`idProfile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
