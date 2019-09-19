CREATE TABLE "advertiser"
(
    "advertiser_id"    serial  NOT NULL PRIMARY KEY,
    "passport_id"      bigint,
    "mail"             varchar,
    "phone"            bigint,
    "checking_account" varchar NOT NULL,
    "inn"              varchar NOT NULL
);

CREATE TABLE "seller"
(
    "seller_id"   serial NOT NULL PRIMARY KEY,
    "passport_id" bigint,
    "phone"       bigint,
    "mail"        varchar
);

CREATE TABLE "passport"
(
    "passport_id" serial  NOT NULL PRIMARY KEY,
    "full_name"   varchar NOT NULL,
    "series"      varchar NOT NULL,
    "number"      varchar NOT NULL
);

CREATE TABLE "ad"
(
    "ad_id"    serial  NOT NULL PRIMARY KEY,
    "ad_name"  varchar NOT NULL,
    "price"    double precision,
    "duration" int
);

CREATE TABLE "check"
(
    "check_id" serial NOT NULL PRIMARY KEY,
    "price"    double precision,
    "nds"      int,
    "tax"      int
);

CREATE TABLE "contract"
(
    "contract_id"   serial NOT NULL PRIMARY KEY,
    "advertiser_id" bigint,
    "ad_id"         bigint,
    "seller_id"     bigint,
    "check_id"      bigint
);

ALTER TABLE "contract"
    ADD FOREIGN KEY ("ad_id") REFERENCES "ad" ("ad_id");

ALTER TABLE "contract"
    ADD FOREIGN KEY ("check_id") REFERENCES "check" ("check_id");

ALTER TABLE "contract"
    ADD FOREIGN KEY ("seller_id") REFERENCES "seller" ("seller_id");

ALTER TABLE "advertiser"
    ADD FOREIGN KEY ("passport_id") REFERENCES "passport" ("passport_id");

ALTER TABLE "contract"
    ADD FOREIGN KEY ("advertiser_id") REFERENCES "advertiser" ("advertiser_id");

ALTER TABLE "seller"
    ADD FOREIGN KEY ("seller_id") REFERENCES "passport" ("passport_id");

ALTER TABLE "contract"
    ADD CONSTRAINT "contract_unique" UNIQUE ("advertiser_id", "ad_id", "seller_id", "check_id");

ALTER TABLE "passport"
    ADD CONSTRAINT "passport_unique" UNIQUE ("series", "number");

