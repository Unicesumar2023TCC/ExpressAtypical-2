/*
  Warnings:

  - You are about to drop the column `message` on the `log` table. All the data in the column will be lost.
  - Added the required column `idReference` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log` DROP COLUMN `message`,
    ADD COLUMN `idReference` INTEGER NOT NULL;
