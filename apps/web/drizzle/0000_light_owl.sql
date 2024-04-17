CREATE TABLE IF NOT EXISTS "nft_holders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"walletAddress" text NOT NULL,
	"nftId" text NOT NULL,
	"bHoney" text,
	"mutableUrl" text NOT NULL,
	"jobId" text,
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now()
);
