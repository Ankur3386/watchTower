/*
  Warnings:

  - You are about to drop the column `memory` on the `Project` table. All the data in the column will be lost.
  - Added the required column `memoryUsage` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project"
RENAME COLUMN "memory" TO "memoryUsage";
