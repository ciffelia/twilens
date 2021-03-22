-- CreateIndex
CREATE INDEX "Tweet.user_index" ON "Tweet"("user");

-- CreateIndex
CREATE INDEX "Tweet.createdAt_index" ON "Tweet"("createdAt");

-- CreateIndex
CREATE INDEX "Tweet.text_index" ON "Tweet" USING pgroonga ("text");

-- CreateIndex
CREATE INDEX "Tweet.source_index" ON "Tweet"("source");

-- CreateIndex
CREATE INDEX "Tweet.retweets_index" ON "Tweet"("retweets");

-- CreateIndex
CREATE INDEX "Tweet.likes_index" ON "Tweet"("likes");
