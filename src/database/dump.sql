CREATE TABLE "songs" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"score" int NOT NULL DEFAULT '0',
	"artist" TEXT NOT NULL,
	"ytlink" TEXT NOT NULL,
	CONSTRAINT "songs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
