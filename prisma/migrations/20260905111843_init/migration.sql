-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TEAM_MEMBER');

-- CreateEnum
CREATE TYPE "AlumniSource" AS ENUM ('ADMIN', 'SELF_SUBMITTED');

-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('ARTICLE', 'NEWSLETTER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'TEAM_MEMBER',
    "teamMemberId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credentials" TEXT,
    "title" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "facebookUrl" TEXT,
    "isPartner" BOOLEAN NOT NULL DEFAULT false,
    "featuredHome" BOOLEAN NOT NULL DEFAULT false,
    "homeOrder" INTEGER NOT NULL DEFAULT 0,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealRecord" (
    "id" TEXT NOT NULL,
    "teamMemberId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "practiceArea" TEXT,
    "year" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumni" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "roleAtFirm" TEXT,
    "yearsAtFirm" TEXT,
    "currentRole" TEXT,
    "currentOrganization" TEXT,
    "country" TEXT,
    "bio" TEXT,
    "linkedinUrl" TEXT,
    "source" "AlumniSource" NOT NULL DEFAULT 'ADMIN',
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL DEFAULT 'ARTICLE',
    "summary" TEXT,
    "body" TEXT,
    "fileUrl" TEXT,
    "coverImageUrl" TEXT,
    "externalUrl" TEXT,
    "author" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_teamMemberId_key" ON "User"("teamMemberId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_slug_key" ON "TeamMember"("slug");

-- CreateIndex
CREATE INDEX "TeamMember_featuredHome_homeOrder_idx" ON "TeamMember"("featuredHome", "homeOrder");

-- CreateIndex
CREATE INDEX "TeamMember_published_displayOrder_idx" ON "TeamMember"("published", "displayOrder");

-- CreateIndex
CREATE INDEX "DealRecord_teamMemberId_idx" ON "DealRecord"("teamMemberId");

-- CreateIndex
CREATE INDEX "Alumni_approved_idx" ON "Alumni"("approved");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_published_publishedAt_idx" ON "Article"("published", "publishedAt");

-- CreateIndex
CREATE INDEX "Article_type_idx" ON "Article"("type");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealRecord" ADD CONSTRAINT "DealRecord_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

