# Lista de tarefas

Aplicação fullstack de lista de tarefas construído como desafio técnico para um
processo seletivo do qual participei.

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Informações importantes

- A rota da api com a documentação do swagger é
[`/api-docs`](http://localhost:3000/api-docs).

- Um script SQL foi incluido na pasta docs para a criação das tabelas, conforme
solicitado, porém não é necessário executá-lo pois a execução do prisma durante
a instalação já realizará essa tarefa.

## Documentação útil

- [Fluxos da aplicação (Diagramas de sequência)](./docs/diag-sequencia.md)
- [Diagrama básico de arquitetura](./docs/diag-arquitetura.md)

## Decisões técnicas

### Typescript e ORM

Decidi utilizar typescript para o backend também, já que era um diferencial no
frontend. Aliado a isso, optei por utilizar o ORM Prisma para facilitar a
manutenção do schema do banco de dados.

### Autenticação

A autenticação com JWT foi implementada usando a biblioteca Passport.js, o qual
eu já havia utilizado anteriormente. A razão para sua escolha foi agilidade. Os
tempos de expiração foram definidos como 1 dia para o accessToken e 4 dias para
o refreshToken, essa escolha foi arbitrária.

Apesar de durante o processo de desenvolvimento eu me deparar com alguns artigos
apontando que o salvamento dos tokens jwt no frontend é mais seguro utilizando
cookies http-only, minha tentiva de fazer essa implementação não estava
progredindo muito bem, então optei por salvas essas informações no localStorage,
apesar de ser menos seguro.

Escolhi esse armazenadmento ao invés do sessionStorage para oferecer a
comodidade do usuário não ter que fazer login novamente sempre que fechar o
navegador.

Os refreshTokens estão sendo salvos no postgres, e quando um novo é gerado os
antigos são apagados. Inicialmente eles seriam mantidos para que o usuário
pudesse manter o login em vários dispositivos ao mesmo tempo, porém isso
acabaria deixando vários tokens não utilizados salvos no banco quando eles
expirassem, já que eles só estão sendo excluidos ao serem renovados na rota de
refresh.

Idealmente eles estariam sendo salvos em um banco de dados redis com
tempo de expiração definido para eles se auto excluirem, mas como a
especificação mencionava apenas o postgres, essa foi a implementação que eu
considerei a melhor abordagem.

### Atualização de tarefas

A implementação da rota de atualização de tarefas foi feita com o verbo HTTP
PATCH ao invés de PUT, uma vez que ela não requer obrigatóriamente que todos os
dados do documento sejam passados para ocorrer a atualização. Apesar disso, no
frontend acabou sendo mais prático passar o objeto todo nas atualizações.

## Instruções de execução

Para executar esse projeto você precisa ter instalado em sua máquina o
[NodeJS](https://nodejs.org/en) e o [Postgres](https://www.postgresql.org/).

1. Faça download do repositório

2. Renomeie o arquivo `.env.example` da pasta `backend` como `.env`

3. Crie um banco de dados postgres e edite o valor de `DATABASE_URL` no arquivo
`.env` para refletir os dados de conexão com ele.

4. Abra a pasta `backend` no terminal e instale as dependências com o comando a
seguir:

    ```bash
    npm i
    ```

5. Ainda no terminal, rode as migrações do prisma:

    ```bash
    npx prisma migrate dev
    ```

6. Inicie o servidor backend de desenvolvimento:

    ```bash
    npm run dev
    ```

7. Renomeie o arquivo `.env.local.example` da pasta `frontend` como `.env.local`

    - Caso o backend não esteja executando na porta padrão (3000), edite o
    arquivo `.env.local` da pasta `frontend` para que a porta listada lá seja a
    mesma em que o seu backend está executando

8. Em um novo terminal, abra a pasta `frontend` e instale as dependências com o
comando a seguir:

    ```bash
    npm i
    ```

9. Ainda no terminal, inicie o servidor frontend de desenvolvimento:

    ```bash
    npm run dev
    ```

    - Caso não esteja executando na porta padrão (5173), edite a configuração
    de CORS em `backend/app.ts` para que a porta listada lá seja a mesma em que
    o seu frontend está executando
