/*
  Warnings:

  - You are about to drop the column `carCode` on the `Car` table. All the data in the column will be lost.
  - Added the required column `colors` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` DROP COLUMN `carCode`,
    ADD COLUMN `colors` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW';
