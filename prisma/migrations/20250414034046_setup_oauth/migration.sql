-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('discord', 'github');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "salt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "user_oauth_accounts" (
    "user_id" TEXT NOT NULL,
    "provider" "OAuthProvider" NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_oauth_accounts_pkey" PRIMARY KEY ("provider_account_id","provider")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_oauth_accounts_provider_account_id_key" ON "user_oauth_accounts"("provider_account_id");

-- AddForeignKey
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
