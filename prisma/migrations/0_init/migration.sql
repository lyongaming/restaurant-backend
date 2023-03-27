-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "public";

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fname" VARCHAR(30) NOT NULL,
    "lname" VARCHAR(30) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "address" TEXT NOT NULL,
    "position" VARCHAR(15) NOT NULL,
    "establishments_id" UUID,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "establishments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "establishments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fname" VARCHAR(30) NOT NULL,
    "lname" VARCHAR(30) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "password" VARCHAR(64) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_fname_key" ON "employees"("fname");

-- CreateIndex
CREATE UNIQUE INDEX "employees_lname_key" ON "employees"("lname");

-- CreateIndex
CREATE UNIQUE INDEX "employees_phone_key" ON "employees"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "establishments_name_key" ON "establishments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "establishments_phone_key" ON "establishments"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "clients_fname_key" ON "clients"("fname");

-- CreateIndex
CREATE UNIQUE INDEX "clients_lname_key" ON "clients"("lname");

-- CreateIndex
CREATE UNIQUE INDEX "clients_phone_key" ON "clients"("phone");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_establishments_id_fkey" FOREIGN KEY ("establishments_id") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

