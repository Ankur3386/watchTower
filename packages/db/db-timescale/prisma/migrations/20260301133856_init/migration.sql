-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "responseTime" DOUBLE PRECISION NOT NULL,
    "activeUser" INTEGER NOT NULL,
    "totalUser" INTEGER NOT NULL,
    "route" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "memory" INTEGER NOT NULL,
    "incomingTraffic" DOUBLE PRECISION NOT NULL,
    "outgoingTraffic" DOUBLE PRECISION NOT NULL,
    "cpuUsage" INTEGER NOT NULL,
    "timeStamps" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");
