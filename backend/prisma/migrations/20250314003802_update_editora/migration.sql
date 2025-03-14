-- CreateTable
CREATE TABLE "Editora" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "emailContato" TEXT NOT NULL,
    "telefone" TEXT,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Editora_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Editora_emailContato_key" ON "Editora"("emailContato");

-- CreateIndex
CREATE UNIQUE INDEX "Editora_cnpj_key" ON "Editora"("cnpj");
