CREATE TYPE "Status" AS ENUM ('PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA');

CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Tarefa" ADD COLUMN "usuarioId" TEXT NOT NULL;

CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Usuario_nomeUsuario_key" ON "Usuario"("nomeUsuario");

ALTER TABLE "Tarefa"
    ADD CONSTRAINT "Tarefa_usuarioId_fkey"
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "RefreshToken" (
    "token" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("token")
);

ALTER TABLE "RefreshToken"
    ADD CONSTRAINT "RefreshToken_usuarioId_fkey"
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
