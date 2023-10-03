-- AlterTable
ALTER TABLE `category` ADD COLUMN `voiceUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `type` ENUM('Kid', 'Responsible') NOT NULL DEFAULT 'Responsible';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `type` ENUM('Admin', 'Responsible') NOT NULL DEFAULT 'Responsible';

-- AlterTable
ALTER TABLE `word` ADD COLUMN `voiceUrl` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `origem` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `fk_user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_fk_user_id_fkey` FOREIGN KEY (`fk_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
