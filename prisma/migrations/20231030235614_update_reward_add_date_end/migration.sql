/*
  Warnings:

  - Added the required column `dateEnd` to the `Reward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reward` ADD COLUMN `dateEnd` DATETIME(3) NOT NULL;
