-- CreateTable
CREATE TABLE "BlogPost" (
    "id" VARCHAR(191) PRIMARY KEY,
    "slug" VARCHAR(191) NOT NULL UNIQUE,
    "title" VARCHAR(191) NOT NULL,
    "date" VARCHAR(191) NOT NULL,
    "category" VARCHAR(191) NOT NULL,
    "author" VARCHAR(191) NOT NULL,
    "image" VARCHAR(191) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");
