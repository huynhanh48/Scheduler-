/*
  Warnings:

  - You are about to drop the column `completed` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `completed`,
    ADD COLUMN `status` ENUM('COMPLETED', 'UNCOMPLETED', 'CANCEL') NOT NULL DEFAULT 'UNCOMPLETED';
