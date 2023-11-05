/*
  Warnings:

  - You are about to drop the column `idUser` on the `category` table. All the data in the column will be lost.
  - Added the required column `idProfile` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_idUser_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `idUser`,
    ADD COLUMN `idProfile` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_idProfile_fkey` FOREIGN KEY (`idProfile`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
