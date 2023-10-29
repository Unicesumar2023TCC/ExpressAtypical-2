-- CreateTable
CREATE TABLE `Reward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProfile` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reward` ADD CONSTRAINT `Reward_idProfile_fkey` FOREIGN KEY (`idProfile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
