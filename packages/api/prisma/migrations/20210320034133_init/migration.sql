-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "retweets" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
