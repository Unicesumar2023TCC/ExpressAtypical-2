/*
  Warnings:

  - You are about to alter the column `name` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `voiceUrl` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the column `fk_user_id` on the `log` table. All the data in the column will be lost.
  - You are about to alter the column `origem` on the `log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `action` on the `log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `message` on the `log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `name` on the `word` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `voiceUrl` on the `word` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - Added the required column `idUser` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_fk_user_id_fkey`;

-- AlterTable
ALTER TABLE `Category` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `voiceUrl` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `Log` DROP COLUMN `fk_user_id`,
    ADD COLUMN `idUser` INTEGER NOT NULL,
    MODIFY `origem` VARCHAR(50) NOT NULL,
    MODIFY `action` VARCHAR(50) NOT NULL,
    MODIFY `message` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(50) NOT NULL,
    MODIFY `password` VARCHAR(50) NOT NULL,
    MODIFY `phone` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Word` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `voiceUrl` VARCHAR(50) NULL;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
