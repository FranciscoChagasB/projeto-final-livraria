-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "dataInserido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDisponivel" BOOLEAN NOT NULL DEFAULT true,
    "genero" TEXT NOT NULL,
    "editoraId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Livro_isbn_key" ON "Livro"("isbn");

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_editoraId_fkey" FOREIGN KEY ("editoraId") REFERENCES "Editora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
