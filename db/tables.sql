CREATE TABLE "cryptocurrencies_list" (
  "id" serial,
  "name" varchar(20),
  "symbol" varchar(10),
  PRIMARY KEY ("id")
);

CREATE TABLE "user_account" (
  "id" bigserial,
  "display_name" varchar(50) NOT NULL,
  "email" varchar(40) UNIQUE NOT NULL,
  "password" varchar(100) NOT NULL,
  "profile_picture" varchar,
  "nama_lengkap" varchar(100),
  "tempat_lahir" varchar(50),
  "tanggal_lahir" date,
  "negara" varchar(50),
  "provinsi" varchar(50),
  "kota" varchar(50),
  "kode_pos" smallint,
  "email_verification_code" varchar(100),
  "active" boolean,
  "forget_password_code" varchar(100),
  PRIMARY KEY ("id")
);

CREATE TABLE "wallet" (
  "id" bigserial,
  "user_id" bigint,
  "amount" numeric(20,2),
  "currency" varchar(5),
  PRIMARY KEY ("id"),
CONSTRAINT "amount_nonnegative" check(amount >= 0),
CONSTRAINT "FK_wallet.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user_account"("id")
);


CREATE TABLE "exchanges_history" (
  "id" bigserial,
  "user_id" bigint,
  "wallet_id" bigint,
  "coin_id" integer,
  "amount" numeric(30,8),
  "code" smallint,
  "price" numeric(20,2),
  "date" timestamp with time zone,
  PRIMARY KEY ("id"),
 CONSTRAINT "FK_exchanges_history.coin_id"
    FOREIGN KEY ("coin_id")
      REFERENCES "cryptocurrencies_list"("id"),
  CONSTRAINT "FK_exchanges_history.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user_account"("id"),
  CONSTRAINT "FK_exchanges_history.wallet_id"
    FOREIGN KEY ("wallet_id")
      REFERENCES "wallet"("id")
);


CREATE TABLE "bank_codes" (
  "id" serial,
  "name" varchar(30),
  "code" varchar(4),
  PRIMARY KEY ("id")
);


CREATE TABLE "portfolio" (
  "id" bigserial,
  "user_id" bigint,
  "coin_id" integer,
  "amount" numeric(30,8),
   PRIMARY KEY ("id"),
 CONSTRAINT "amount_nonnegative" CHECK ("amount" >= 0.00000000),
 CONSTRAINT "FK_portfolio.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user_account"("id"),
  CONSTRAINT "FK_portfolio.coin_id"
    FOREIGN KEY ("coin_id")
      REFERENCES "cryptocurrencies_list"("id"));


CREATE TABLE "bank_account" (
  "id" bigserial,
  "user_id" bigint,
  "account_number" varchar(20),
  "account_name" varchar(50),
  "bank_id" integer,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_bank_account.bank_id"
    FOREIGN KEY ("bank_id")
      REFERENCES "bank_codes"("id"),
  CONSTRAINT "FK_bank_account.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user_account"("id")
);


CREATE TABLE "wallet_transaction" (
  "id" bigserial,
  "user_id" bigint,
  "wallet_id" bigint,
  "code" smallint,
  "amount" numeric(20,2),
  "bank_account_id" bigint,
  "bank_code_id" integer,
  "bank_account_number" varchar(20),
  "date" timestamp with time zone,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_wallet_transaction.wallet_id"
    FOREIGN KEY ("wallet_id")
      REFERENCES "wallet"("id"),
CONSTRAINT "FK_wallet_transaction.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user_account"("id"),
CONSTRAINT "FK_wallet_transaction.bank_code_id"
    FOREIGN KEY ("bank_code_id")
      REFERENCES "bank_codes"("id")
	ON DELETE CASCADE,
  CONSTRAINT "FK_wallet_transaction.bank_account_id"
    FOREIGN KEY ("bank_account_id")
      REFERENCES "bank_account"("id")
	ON DELETE CASCADE
);