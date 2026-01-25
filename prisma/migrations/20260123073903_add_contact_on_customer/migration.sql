/*
  Warnings:

  - You are about to drop the column `contactId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Customer` DROP FOREIGN KEY `Customer_contactId_fkey`;

-- DropIndex
DROP INDEX `Customer_contactId_fkey` ON `Customer`;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `contactId`;

-- CreateTable
CREATE TABLE `ContactOnCustomer` (
    `customerId` INTEGER NOT NULL,
    `contactId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`contactId`, `customerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContactOnCustomer` ADD CONSTRAINT `ContactOnCustomer_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactOnCustomer` ADD CONSTRAINT `ContactOnCustomer_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
