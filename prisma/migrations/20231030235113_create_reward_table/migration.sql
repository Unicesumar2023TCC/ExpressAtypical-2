/*
  Warnings:

  - Added the required column `reward` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reward` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `reward` VARCHAR(50) NOT NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'DISABLE', 'BLOCK') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
